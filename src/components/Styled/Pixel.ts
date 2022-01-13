import styled, { css } from 'styled-components/native'

interface PixelStyleProps {
  size: number
  margin: number
  color?: string
}

const pixelStyle = (p: PixelStyleProps) => css`
  width: ${p.size}px;
  height: ${p.size}px;
  margin: ${p.margin}px;
  background: ${p.color || '#EEE'};
`

const Pixel = styled.View`
  ${pixelStyle}
  border-radius: 3px;
`

export default Pixel
