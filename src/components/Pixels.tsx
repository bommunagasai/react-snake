import React from 'react'
import { useTheme } from 'styled-components/native'
import Pixel from './Styled/Pixel'

interface PixelProps {
  pixelCount: number
  snake: number[]
  food: number
  pixelSize: number
  pixelMargin: number
}

const Pixels = (p: PixelProps) => {
  let pixels = []
  const theme = useTheme()
  for (let i: number = 0; i < p.pixelCount; i++) {
    pixels.push(
      <Pixel
        size={p.pixelSize}
        margin={p.pixelMargin}
        key={`pixel-id-${i}`}
        color={
          p.snake.includes(i) ? theme?.colors?.snake : p.food == i ? theme?.colors?.food : theme?.colors?.board
        }
      />
    )
  }
  return <>{pixels}</>
}

export default Pixels
