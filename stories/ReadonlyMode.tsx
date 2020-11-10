import * as React from 'react'
import { FlowChartWithState } from '../src'
import { Page } from './components'
import { chartSimple } from './misc/exampleChartState'
import { DefaultComponents } from './misc/defaultComponents'

export const ReadonlyMode = () => {
  return (
    <Page>
      <FlowChartWithState 
        Components={DefaultComponents}
        config={{ readonly: true }} 
        initialValue={chartSimple}
      />
    </Page>
  )
}
