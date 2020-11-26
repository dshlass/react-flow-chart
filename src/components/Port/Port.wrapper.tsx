import { isEqual } from 'lodash'
import * as React from 'react'
import { v4 } from 'uuid'
import { IConfig, ILink, INode, IOnLinkCancel, IOnLinkComplete, IOnLinkMove, IOnLinkStart, IOnPortPositionChange, IPort, IPosition, ISelectedOrHovered, ISize, IPortProps } from '../../'
import CanvasContext from '../Canvas/CanvasContext'

/** Construct the composed path by traversing parentElements */
const composedPath = (el: HTMLElement | null) => {
  const path: HTMLElement[] = []
  while (el) {
    path.push(el)
    el = el.parentElement
  }
  return path
}

export interface IPortWrapperProps {
  config: IConfig
  style?: object
  offset: IPosition
  selected: ISelectedOrHovered | undefined
  hovered: ISelectedOrHovered | undefined
  selectedLink: ILink | undefined
  hoveredLink: ILink | undefined
  nodeSelected: boolean
  port: IPort
  node: INode
  portsSize: ISize
  onPortPositionChange: IOnPortPositionChange
  Component: React.FunctionComponent<IPortProps>

  // Link handlers
  onLinkStart: IOnLinkStart
  onLinkMove: IOnLinkMove
  onLinkCancel: IOnLinkCancel
  onLinkComplete: IOnLinkComplete
}

interface IStyling {
  top?:string
  right?:string
  left?:string
  bottom?:string
  transform?:string
}

export class PortWrapper extends React.Component<IPortWrapperProps> {
  public static contextType = CanvasContext
  public context!: React.ContextType<typeof CanvasContext>

  private nodeRef = React.createRef<HTMLDivElement>()

  public componentDidMount () {
    this.updatePortPosition()
  }
  
  public getStyle(): IStyling | {}  {
    const {port: {location}} = this.props
      if (location === 'top') {
        return { top: '-50px',  bottom: 0, left: '50%', transform: 'translateX(-50%)'}
      }
      if (location === 'bottom') {
        return { bottom: '-50px', left: '50%', transform: 'translateX(-50%)'}
      }
      if (location === 'left') {
        return {top: '-13px', left: '-50px'}
      }
      if (location === 'right') {
        return { top: '-13px', right: '-50px'}
      }
    else return {}
  }

  public componentDidUpdate (prevProps: IPortWrapperProps) {
    // Update port position after a re-render if there are more ports on the same side
    // or if node.size has changed
    if (this.portsOfLocation(this.props) !== this.portsOfLocation(prevProps)
        || !isEqual(this.props.node.size, prevProps.node.size)
        || !isEqual(this.props.portsSize, prevProps.portsSize)) {
      this.updatePortPosition()
    }
  }

  public onMouseDown = (startEvent: React.MouseEvent) => {
    const { offset, node, port, onLinkStart, onLinkCancel, onLinkComplete, onLinkMove, config } = this.props
    const linkId = v4()
    const fromNodeId = node.id
    const fromPortId = port.id

    // Create the move handler
    // This will update the position as the mouse moves
    const mouseMoveHandler = (e: MouseEvent) => {
      const { offsetX, offsetY, zoomScale } = this.context

      onLinkMove({
        config,
        linkId,
        startEvent,
        fromNodeId,
        fromPortId,
        toPosition: {
          x: (e.clientX - offsetX - offset.x) / zoomScale,
          y: (e.clientY - offsetY - offset.y) / zoomScale,
        },
      })
    }

    // Create and bind the mouse up handler
    // This is used to check if the link is complete or cancelled
    const mouseUpHandler = (e: MouseEvent) => {
      // We traverse up the event path until we find an element with 'data-port-id' and data-node-id'
      // e.toElement cannot be used because it may be a child element of the port
      const path = composedPath(e.target as HTMLElement)
      const portEl = path.find((el) => {
        const toPortId = el.getAttribute && el.getAttribute('data-port-id')
        const toNodeId = el.getAttribute && el.getAttribute('data-node-id')
        return !!(toPortId && toNodeId)
      })

      // If both node-id and port-id are defined as data attributes, we are mouse-upping
      // on another port. Run the success handler
      if (portEl) {
        const toPortId = portEl.getAttribute('data-port-id') as string
        const toNodeId = portEl.getAttribute('data-node-id') as string
        onLinkComplete({ config, linkId, startEvent, fromNodeId, fromPortId, toNodeId, toPortId })
      } else {
        onLinkCancel({ config, linkId, startEvent, fromNodeId, fromPortId })
      }

      // Remove the listeners if the link is complete or canceled
      window.removeEventListener('mouseup', mouseUpHandler, false)
      window.removeEventListener('mousemove', mouseMoveHandler, false)
    }

    // Add listeners
    window.addEventListener('mouseup', mouseUpHandler, false)
    window.addEventListener('mousemove', mouseMoveHandler, false)

    // Notify state of link start
    onLinkStart({ config, linkId, startEvent, fromNodeId, fromPortId })

    // Prevent default and stop propagation to prevent text selection
    startEvent.preventDefault()
    startEvent.stopPropagation()
  }
  public render () {
    const {
      selected,
      selectedLink,
      hovered,
      hoveredLink,
      style,
      port,
      node,
      Component,
      config,
      nodeSelected
    } = this.props
    
    return (
      <div
        data-port-id={port.id}
        data-node-id={node.id}
        onMouseDown={this.onMouseDown}
        ref={this.nodeRef}
        style={{...style, position: 'relative' }}
      >
        <Component
          config={config}
          port={port}
          isSelected={!!selected && selected.type === 'port' && selected.id === port.id}
          isHovered={!!hovered && hovered.type === 'port' && hovered.id === port.id}
          isLinkSelected={ selectedLink
            ? ((selectedLink.from.portId === port.id && selectedLink.from.nodeId === node.id) ||
               (selectedLink.to.portId === port.id && selectedLink.to.nodeId === node.id))
            : false
          }
          isLinkHovered={
            hoveredLink
              ? (hoveredLink.from.portId === port.id &&
                hoveredLink.from.nodeId === node.id) ||
              (hoveredLink.to.portId === port.id &&
                hoveredLink.to.nodeId === node.id)
              : false
          }
        />
        {nodeSelected && <p style={{position: 'absolute', ...this.getStyle()}}>{port.type}</p>}
      </div>
    )
  }

  private updatePortPosition () {
    const el = this.nodeRef.current as HTMLInputElement
    if (el) {
      // Ports component should be positions absolute
      // Factor this in so we get position relative to the node
      const nodesEl = el.parentElement
        ? el.parentElement
        : { offsetLeft: 0, offsetTop: 0 }
      // update port position after node size has been determined
      this.props.onPortPositionChange({ config: this.props.config, node: this.props.node, port: this.props.port, el, nodesEl })
    }
  }

  private portsOfLocation (props: IPortWrapperProps) {
    const { port: { location }, node: { ports } } = props
    return Object.values(ports).reduce((count, port) => port.location === location ? count + 1 : count, 0)
  }
}
