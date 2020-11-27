import * as React from 'react'
import ResizeObserver from 'react-resize-observer'
import { IConfig, INode, IPortsGroupProps, ISize } from '../../'

export interface IPortsDefaultProps {
  className?: string
  config: IConfig
  node: INode
  children: Array<React.ReactElement<any>>
  onResize: (size: ISize) => void,
  PortsGroup: React.FunctionComponent<IPortsGroupProps>
}

export const PortsDefault = ({ children, config, onResize, PortsGroup, className }: IPortsDefaultProps) => {
  const [ top, setTop ] = React.useState(0)
  const [ bottom, setBottom ] = React.useState(0)
  const [ right, setRight ] = React.useState(0)
  const [ left, setLeft ] = React.useState(0)
  const [ width, setWidth ] = React.useState(0)
  const [ height, setHeight ] = React.useState(0)

  React.useEffect(() => {
    setWidth(Math.max(top, bottom))
  }, [ top, bottom ])

  React.useEffect(() => {
    setHeight(Math.max(left, right))
  }, [ left, right ])

  React.useEffect(() => {
    onResize({ width, height })
  }, [ width, height, onResize ])

  return (
    <div className={className}>
      <PortsGroup config={config} side="top">
        <ResizeObserver onResize={(rect) => { setTop(rect.width) }} />
        {children.filter((child) => ['top'].includes(child.props.port.location))}
      </PortsGroup>
      <PortsGroup config={config} side="bottom">
        <ResizeObserver onResize={(rect) => { setBottom(rect.width) }} />
        {children.filter((child) => ['bottom'].includes(child.props.port.location))}
      </PortsGroup>
      <PortsGroup config={config} side="right">
        <ResizeObserver onResize={(rect) => { setRight(rect.height) }} />
        {children.filter((child) => ['right'].includes(child.props.port.location))}
      </PortsGroup>
      <PortsGroup config={config} side="left">
        <ResizeObserver onResize={(rect) => { setLeft(rect.height) }} />
        {children.filter((child) => ['left'].includes(child.props.port.location))}
      </PortsGroup>
    </div>
  )
}
