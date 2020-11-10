import * as React from 'react'
import { FlowChartWithState } from '../src'
import { Page } from './components'
import { chartSimple } from './misc/exampleChartState'
import { DefaultComponents } from './misc/defaultComponents'

export const ConfigSnapToGridDemo = () => {
  return (
    <Page>
      <FlowChartWithState
        Components={DefaultComponents}
        initialValue={chartSimple}
        config={{
          snapToGrid: true,
        }}
      />
    </Page>
  )
}
