import * as React from 'react'
import styled from 'styled-components'
import { FlowChartWithState } from '../src'
import { Content, Page, Sidebar, SidebarItem } from './components'
import { chartSimple } from './misc/exampleChartState'
import { DefaultComponents } from './misc/defaultComponents'

const Message = styled.div`
margin: 10px;
padding: 10px;
background: rgba(0,0,0,0.05);
`

export const DragAndDropSidebar = () => (
  <Page>
    <Content>
      <FlowChartWithState 
        Components={DefaultComponents}
        initialValue={chartSimple} 
      />
    </Content>
    <Sidebar>
      <Message>
        Drag and drop these items onto the canvas.
      </Message>
      <SidebarItem
        type="top/bottom"
        ports={ {
          port1: {
            id: 'port1',
            type: 'input',
            location: 'top',
            properties: {
              custom: 'property',
            },
          },
          port2: {
            id: 'port2',
            type: 'output',
            location: 'bottom',
            properties: {
              custom: 'property',
            },
          },
        } }
        properties={ {
          custom: 'property',
        }}
      />
      <SidebarItem
        type="bottom-only"
        ports={ {
          port1: {
            id: 'port1',
            type: 'output',
            location: 'bottom',
            properties: {
              custom: 'property',
            },
          },
        }}
      />
      <SidebarItem
        type="left-right"
        ports={ {
          port1: {
            id: 'port1',
            type: 'output',
            location: 'left',
            properties: {
              custom: 'property',
            },
          },
          port2: {
            id: 'port2',
            type: 'output',
            location: 'right',
            properties: {
              custom: 'property',
            },
          },
        }}
      />
      <SidebarItem
        type="all-sides"
        ports={ {
          port1: {
            id: 'port1',
            type: 'output',
            location: 'left',
          },
          port2: {
            id: 'port2',
            type: 'output',
            location: 'right',
          },
          port3: {
            id: 'port3',
            type: 'input',
            location: 'top',
          },
          port4: {
            id: 'port4',
            type: 'output',
            location: 'bottom',
          },
        }}
      />
      <SidebarItem
        type="lots-of-ports"
        ports={ {
          port1: {
            id: 'port1',
            type: 'output',
            location: 'left',
          },
          port2: {
            id: 'port2',
            type: 'output',
            location: 'right',
          },
          port3: {
            id: 'port3',
            type: 'input',
            location: 'top',
          },
          port4: {
            id: 'port4',
            type: 'output',
            location: 'bottom',
          },
          port5: {
            id: 'port5',
            type: 'output',
            location: 'left',
          },
          port6: {
            id: 'port6',
            type: 'output',
            location: 'right',
          },
          port7: {
            id: 'port7',
            type: 'input',
            location: 'top',
          },
          port8: {
            id: 'port8',
            type: 'output',
            location: 'bottom',
          },
          port9: {
            id: 'port9',
            type: 'output',
            location: 'bottom',
          },
          port10: {
            id: 'port10',
            type: 'output',
            location: 'right',
          },
          port11: {
            id: 'port11',
            type: 'input',
            location: 'top',
          },
          port12: {
            id: 'port12',
            type: 'output',
            location: 'bottom',
          },
        }}
      />
    </Sidebar>
  </Page>
)
