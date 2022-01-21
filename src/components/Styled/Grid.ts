import styled, { css } from 'styled-components/native'

interface GridSizeProps {
  size: number
}

const gridSize  = (p: GridSizeProps) => css`
  width: ${p.size}px;
  height: ${p.size}px;
`

const Grid = styled.View`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  background-color: ${p => p.theme.colors.background};
  ${gridSize}
`

export default Grid
