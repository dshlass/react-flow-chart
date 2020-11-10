import { IConfig, IPort } from '../../'

export interface IPortDefaultProps {
  className?: string
  config: IConfig
  port: IPort
  isSelected: boolean
  isHovered: boolean
  isLinkSelected: boolean
  isLinkHovered: boolean
}