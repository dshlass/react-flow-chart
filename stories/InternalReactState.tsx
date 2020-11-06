import * as React from 'react'
import { FlowChartWithState } from '../src'
import { Page } from './components'
import { chartSimple } from './misc/exampleChartState'
import { DefaultComponents } from './misc/defaultComponents'

export const InternalReactState = () => {
  return (
    <Page>
      <FlowChartWithState
        Components={DefaultComponents} 
        initialValue={chartSimple}
      />
    </Page>
  )
}
