import * as React from 'react'
import styled from 'styled-components'
import { FlowChartWithState, ICanvasOuterProps } from '../src'
import { Page } from './components'
import { chartSimple } from './misc/exampleChartState'
import { DefaultComponents } from './misc/defaultComponents'

const CanvasOuterCustom = styled.div<ICanvasOuterProps>`
  position: relative;
  background-size: 10px 10px;
  background-color: #4f6791;
  background-image:
    linear-gradient(90deg,hsla(0,0%,100%,.1) 1px,transparent 0),
    linear-gradient(180deg,hsla(0,0%,100%,.1) 1px,transparent 0);
  width: 100%;
  height: 100%;
  overflow: hidden;
  cursor: not-allowed;
` as any

export const CustomCanvasOuterDemo = () => {
  return (
    <Page>
      <FlowChartWithState
        initialValue={chartSimple}
        Components={ {
          ...DefaultComponents,
          CanvasOuter: CanvasOuterCustom,
        }}
      />
    </Page>
  )
}
