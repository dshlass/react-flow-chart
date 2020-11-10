import * as React from 'react'
import styled from 'styled-components'
import { FlowChartWithState, INodeProps } from '../src'
import { Page } from './components'
import { chartSimple } from './misc/exampleChartState'
import { DefaultComponents } from './misc/defaultComponents'

const DarkBox = styled.div`
  position: absolute;
  width: 300px;
  height: 150px;
  padding: 30px;
  background: #3e3e3e;
  color: white;
  border-radius: 10px;
`

const Circle = styled.div`
  position: absolute;
  width: 150px;
  height: 150px;
  padding: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #d30000;
  color: white;
  border-radius: 50%;
`

/**
 * Create the custom component,
 * Make sure it has the same prop signature
 * You'll need to add {...otherProps} so the event listeners are added to your component
 */
const NodeCustom = React.forwardRef(({ node, children, ...otherProps }: INodeProps, ref: React.Ref<HTMLDivElement>) => {
  if (node.type === 'output-only') {
    return (
      <DarkBox ref={ref} {...otherProps}>
        {children}
      </DarkBox>
    )
  } else {
    return (
      <Circle ref={ref} {...otherProps}>
        {children}
      </Circle>
    )
  }
})

export const CustomNodeDemo = () => {
  return (
    <Page>
      <FlowChartWithState
        initialValue={chartSimple}
        Components={ {
          ...DefaultComponents,
          Node: NodeCustom,
        }}
      />
    </Page>
  )
}
