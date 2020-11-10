import * as React from 'react'
import styled from 'styled-components'
import { INodeInnerProps } from '../../src'

const Outer = styled.div`
  padding: 40px 30px;
`

export const NodeInnerDefault = ({ node,className }: INodeInnerProps) => {
  return (
    <Outer className={className}>
      <div>Type: {node.type}</div>
    </Outer>
  )
}
