import * as React from 'react'
import styled from 'styled-components'
import { FlowChartWithState } from '../src'
import { Page } from './components'
import { chartSimple } from './misc/exampleChartState'
import { DefaultComponents } from './misc/defaultComponents'

const Note = styled.div`
  position: absolute;
  left: 30px;
  top: 30px;
  padding: 20px;
  background: white;
  border-radius: 10px;
  border: 2px solid red;
`

const defaultTopLabelStyle = styled.p`
  color: orange;  

  // default styles below
  position: absolute;
  margin: 0;
  top: -50px;
  bottom: 0;
  transform: translateX(50%) rotate(-45deg);
`

const defaultBottomLabelStyle = styled.p`
  color: blue;
  
  // default styles below
  position: absolute;
  margin: 0;
  bottom: -50px;
  transform: translateX(-50%) rotate(-45deg);
`

const defaultLeftLabelStyle = styled.p`
  color: green;

  // default styles below  
  position: absolute;
  margin: 0;
  left: -50px;
  transform: translateY(-50%) rotate(-45deg);
`

const defaultRightLabelStyle = styled.p`
  color: red;
  
  // default styles below
  position: absolute;
  margin: 0;
  top: 0;
  right: -50px;
  transform: translateY(-50%) rotate(-45deg);
`

export const CustomPortLabels = () => {
  return (
    <Page>
      <FlowChartWithState
        Components={DefaultComponents}
        initialValue={chartSimple}
        config={{
          portLabel: {
            Top: defaultTopLabelStyle,
            Bottom: defaultBottomLabelStyle,
            Left: defaultLeftLabelStyle,
            Right: defaultRightLabelStyle
          }
        }}
      />
      <Note>Customise Port Labels. Accepts any React Components. Recommended using position: absolute or else the port may have weird positioning</Note>
    </Page>
  )
}
