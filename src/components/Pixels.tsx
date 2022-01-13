import React from 'react'
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
  for (let i: number = 0; i < p.pixelCount; i++) {
    pixels.push(
      <Pixel
        size={p.pixelSize}
        margin={p.pixelMargin}
        key={`pixel-id-${i}`}
        color={
          p.snake.includes(i) ? '#ff647c' : p.food == i ? '#ffb800' : '#eee'
        }
      />
    )
  }
  return <>{pixels}</>
}

export default Pixels
