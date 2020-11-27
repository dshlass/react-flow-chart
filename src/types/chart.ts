import { IPosition, ISize } from './generics'

export type IChart<
  ChartProps = undefined,
  NodeProps = undefined,
  LinkProps = undefined,
  PortProps = undefined
  > = {
    offset: IPosition
    nodes: {
      [id: string]: INode<NodeProps, PortProps>;
    }
    links: {
      [id: string]: ILink<LinkProps>;
    }
    scale: number
    /** System Temp */
    selected: ISelectedOrHovered
    hovered: ISelectedOrHovered,
  } & (ChartProps extends undefined ? {
    properties?: any,
  } : {
    properties: ChartProps,
  })

export interface ISelectedOrHovered {
  type?: 'link' | 'node' | 'port'
  id?: string
}

export type INode<NodeProps = undefined, PortProps = undefined> = {
  id: string
  type: string
  position: IPosition
  value?: any
  functionId?: string
  graphId?: string
  orientation?: number
  readonly?: boolean
  ports: {
    [id: string]: IPort<PortProps>;
  }
  /** System Temp */
  size?: ISize,
} & (NodeProps extends undefined ? {
  properties?: any,
} : {
  properties: NodeProps,
})

export type IPort<PortProps = undefined> = {
  id: string
  type: 'input' | 'output'
  location: 'top' | 'bottom' | 'left' | 'right'
  value?: any,
  /** System Temp */
  position?: IPosition,
} & (PortProps extends undefined ? {
  properties?: any,
} : {
  properties: PortProps,
})

export type ILink<LinkProps = undefined> = {
  id: string
  from: {
    nodeId: string
    portId: string,
  }
  to: {
    nodeId?: string;
    portId?: string;
    /** System Temp */
    position?: IPosition;
  },
} & (LinkProps extends undefined ? {
  properties?: any,
} : {
  properties: LinkProps,
})
