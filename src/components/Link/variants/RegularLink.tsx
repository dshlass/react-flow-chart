import * as React from 'react'
import { IConfig, ILink, IOnLinkClick, IOnLinkMouseEnter, IOnLinkMouseLeave, IPosition } from '../../../'

export interface IRegularLinkProps {
  className?: string
  points: string
  linkColor: string
  config: IConfig
  link: ILink
  startPos: IPosition
  endPos: IPosition
  onLinkMouseEnter: IOnLinkMouseEnter
  onLinkMouseLeave: IOnLinkMouseLeave
  onLinkClick: IOnLinkClick
  isHovered: boolean
  isSelected: boolean
}

export const RegularLink = ({
  className,
  points,
  linkColor,
  config,
  link,
  startPos,
  endPos,
  onLinkMouseEnter,
  onLinkMouseLeave,
  onLinkClick,
  isHovered,
  isSelected,
}: IRegularLinkProps) => {
  return (
    <svg
      style={{
        overflow: 'visible',
        position: 'absolute',
        cursor: 'pointer',
        left: 0,
        right: 0,
      }}
      className={className}
    >
      <defs>
        //This marker is the center arrow.
        <marker
          id={`arrowHead-${linkColor}`}
          orient="auto"
          markerWidth="8"
          markerHeight="12"
          refX="4"
          refY="6"
        >
          <path d="M0,0 V12 L8,6 Z" fill={linkColor} />
        </marker>
      </defs>
      <circle r="4" cx={startPos.x} cy={startPos.y} fill={linkColor} />
      {/* Main line */}
      <path d={points} stroke={linkColor} strokeWidth="3" fill="none" markerMid={`url(#arrowHead-${linkColor})`}/>
      {/* Thick line to make selection easier */}
      <path
        d={points}
        stroke={linkColor}
        strokeWidth="20"
        fill="none"
        strokeLinecap="round"
        strokeOpacity={isHovered || isSelected ? 0.1 : 0}
        onMouseEnter={() => onLinkMouseEnter({ config, linkId: link.id })}
        onMouseLeave={() => onLinkMouseLeave({ config, linkId: link.id })}
        onClick={(e) => {
          onLinkClick({ config, linkId: link.id })
          e.stopPropagation()
        }}
      />
      <circle r="4" cx={endPos.x} cy={endPos.y} fill={linkColor} />
    </svg>
  )
}
