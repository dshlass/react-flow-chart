import styled from 'styled-components'
import { ICanvasInnerProps } from '../../src'

export const CanvasInnerDefault = styled.div<ICanvasInnerProps>`
  position: relative;
  outline: 1px dashed rgba(0,0,0,0.1);
  width: 10000px;
  height: 10000px;
  cursor: move;
` as any
