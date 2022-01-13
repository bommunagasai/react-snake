import React from 'react'
import Grid from '../components/Styled/Grid'
import Pixels from '../components/Pixels'

import { GAME_STATUSES } from '../constants/game'


export interface GameBoardProps {
  squareSize: number
  snake: number[]
  food: number
  pixelSize: number
  pixelMargin: number
  status: keyof typeof GAME_STATUSES
}

const GameBoard = (p: GameBoardProps) => {
  const gridSize: number = p.squareSize * (p.pixelSize + p.pixelMargin * 2)
  return (
    <Grid size={gridSize}>
      <Pixels
        pixelCount={p.squareSize * p.squareSize}
        snake={p.snake}
        food={p.food}
        pixelSize={p.pixelSize}
        pixelMargin={p.pixelMargin}
      />
    </Grid>
  )
}

export default GameBoard