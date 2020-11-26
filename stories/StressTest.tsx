import { compact, flatMap, flatten, keyBy, range } from 'lodash'
import * as React from 'react'
import styled from 'styled-components'
import { FlowChartWithState } from '../src'
import { Page } from './components'
import { DefaultComponents } from './misc/defaultComponents'

const getChart = (rows: number, cols: number) => {
  const xyGrid = flatten(range(0, cols * 300, 300).map((x) => range(0, rows * 150, 150).map((y) => ({ x, y }))))

  return {
    offset: {
      x: 0,
      y: 0,
    },
    scale: 1,
    nodes: keyBy(xyGrid.map(({ x, y }) => ({
      id: `node-${x}-${y}`,
      type: 'default',
      position: { x: x + 100, y: y + 100 },
      ports: {
        port1: {
          id: 'port1',
          type: 'input',
          location: 'top',
        },
        port2: {
          id: 'port2',
          type: 'output',
          location: 'bottom',
        },
        port3: {
          id: 'port3',
          type: 'output',
          location: 'right',
        },
        port4: {
          id: 'port4',
          type: 'output',
          location: 'left',
        },
      },
    })), 'id') as any,
    links: keyBy(compact(flatMap(xyGrid, ({ x, y }, idx) => {
      const next = xyGrid[idx + 1]
      if (next) {
        return [{
          id: `link-${x}-${y}-a`,
          from: {
            nodeId: `node-${x}-${y}`,
            portId: 'port2',
          },
          to: {
            nodeId: `node-${next.x}-${next.y}`,
            portId: 'port3',
          },
        }, {
          id: `link-${x}-${y}-b`,
          from: {
            nodeId: `node-${x}-${y}`,
            portId: 'port2',
          },
          to: {
            nodeId: `node-${next.x}-${next.y}`,
            portId: 'port4',
          },
        }]
      }
      return undefined
    })), 'id') as any,
    selected: {},
    hovered: {},
  }
}

const StressTestWithState = () => {
  const [rows, setRows] = React.useState(100)
  const [cols, setCols] = React.useState(100)

  const chart = React.useMemo(() => getChart(rows, cols), [rows, cols])

  return (
    <>
      <Controls>
        <Label>Columns:</Label>
        <Input type="number" value={cols} onChange={(e) => setCols(parseInt(e.target.value, 10))} />
        <Label>Rows:</Label>
        <Input type="number" value={rows} onChange={(e) => setRows(parseInt(e.target.value, 10))} />
      </Controls>
      <Page>
        <FlowChartWithState 
          Components={DefaultComponents}
          key={`${cols}:${rows}`} 
          initialValue={chart} 
        />
      </Page>
    </>
  )
}

export const StressTestDemo = () => {
  return <StressTestWithState />
}

const Input = styled.input`
  padding: 5px 5px 5px 10px;
  width: 50px;
`

const Label = styled.label`
  padding: 0 10px;
  font-size: 14px;
`

const Controls = styled.div`
  padding: 10px;
`
