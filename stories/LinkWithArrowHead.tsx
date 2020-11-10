import { cloneDeep, mapValues } from 'lodash'
import * as React from 'react'
import { FlowChart } from '../src'
import * as actions from '../src/container/actions'
import { Page } from './components'
import { chartSimple } from './misc/exampleChartState'
import { DefaultComponents } from './misc/defaultComponents'

export class LinkWithArrowHead extends React.Component {
  public state = cloneDeep(chartSimple)
  public render () {
    const chart = this.state
    const stateActions = mapValues(actions, (func: any) =>
      (...args: any) => this.setState(func(...args))) as typeof actions

    return (
      <Page>
        <FlowChart
          Components={DefaultComponents}
          chart={chart}
          callbacks={stateActions}
          config={{
            showArrowHead: true,
          }}
        />
      </Page>
    )
  }
}
