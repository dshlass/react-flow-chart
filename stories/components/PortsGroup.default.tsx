import styled, { css } from 'styled-components'
import { IPortsGroupProps } from '../../'

export const PortsGroupDefault = styled.div<IPortsGroupProps>`
  position: absolute;
  display: flex;
  justify-content: center;

  ${(props) => {
    if (props.side === 'top') {
      return css`
        min-width: 100%;
        left: 0;
        top: -12px;
        flex-direction: row;
        > div {
          margin: 0 3px;
        }
      `
    } else if (props.side === 'bottom') {
      return css`
        min-width: 100%;
        left: 0;
        bottom: -12px;
        flex-direction: row;
        > div {
          margin: 0 3px;
        }
      `
    } else if (props.side === 'left') {
      return css`
        min-height: 100%;
        top: 0;
        left: -12px;
        flex-direction: column;
        > div {
          margin: 3px 0;
        }
      `
    } else {
      return css`
        min-height: 100%;
        top: 0;
        right: -12px;
        flex-direction: column;
        > div {
          margin: 3px 0;
        }
      `
    }
  }}
`
