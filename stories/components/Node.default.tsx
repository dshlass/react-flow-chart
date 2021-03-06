import styled, { css } from 'styled-components'
import { INodeProps } from '../../src'

export const NodeDefault = styled.div<INodeProps>`
  position: absolute;
  transition: 0.3s ease box-shadow, 0.3s ease margin-top;
  background: white;
  border-radius: 4px;
  min-width: 200px;
  ${(props) => props.isSelected && css`
    box-shadow: 0 10px 20px rgba(0,0,0,.1);
    margin-top: -2px
    `
  }
` as any
