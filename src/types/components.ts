import { IConfig, INode, IOnCanvasClick, IPort } from './'

export interface ICanvasInnerProps {
  className?: string
  config: IConfig
  children: any
  onClick: IOnCanvasClick
  tabIndex: number
  onKeyDown: (e: React.KeyboardEvent) => void
  onDrop: (e: React.DragEvent<HTMLDivElement>) => void
  onDragOver: (e: React.DragEvent<HTMLDivElement>) => void
}

export interface ICanvasOuterProps {
  className?: string
  config: IConfig
  children: any
  ref?: React.Ref<any>
}

export interface INodeProps {
  className?: string
  config: IConfig
  node: INode
  children: any
  isSelected: boolean
  onClick: (e: React.MouseEvent) => void
  onDoubleClick: (e: React.MouseEvent) => void
  onMouseEnter: (e: React.MouseEvent) => void
  onMouseLeave: (e: React.MouseEvent) => void
  style?: object
  ref?: React.Ref<any>
}

export interface INodeInnerProps {
  className?: string
  config: IConfig
  node: INode
}

export interface IPortsGroupProps {
  className?: string
  config: IConfig
  side: 'top' | 'bottom' | 'left' | 'right'
}

export interface IPortProps {
  className?: string
  config: IConfig
  port: IPort
  isSelected: boolean
  isHovered: boolean
  isLinkSelected: boolean
  isLinkHovered: boolean
}
