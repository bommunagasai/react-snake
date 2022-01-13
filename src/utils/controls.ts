import { KEY_TO_DIRECTION } from '../constants/game'

export interface nextSnakeProps {
  snake: number[]
  direction: keyof typeof KEY_TO_DIRECTION
  food: number
  squareSize: number
}

export const nextSnake = (p: nextSnakeProps) => {
  const currHead = p.snake[p.snake.length - 1]
  let moveSnakeHeadTo
  if (
    [KEY_TO_DIRECTION.ArrowRight, KEY_TO_DIRECTION.ArrowLeft].includes(
      p.direction
    )
  ) {
    const possibleNextHead =
      p.snake[p.snake.length - 1] +
      (p.direction == KEY_TO_DIRECTION.ArrowRight ? 1 : -1)
    moveSnakeHeadTo = possibleNextHead -
      (~~(currHead / p.squareSize) != ~~(possibleNextHead / p.squareSize) || possibleNextHead == -1
        ? p.direction == KEY_TO_DIRECTION.ArrowRight
          ? p.squareSize
          : -p.squareSize
        : 0)
  }

  if (
    [KEY_TO_DIRECTION.ArrowUp, KEY_TO_DIRECTION.ArrowDown].includes(p.direction)
  ) {
    const possibleNextHead =
      p.snake[p.snake.length - 1] +
      (p.direction == KEY_TO_DIRECTION.ArrowDown ? p.squareSize : -p.squareSize)
    moveSnakeHeadTo =
      possibleNextHead +
      (possibleNextHead >= p.squareSize * p.squareSize
        ? -p.squareSize * p.squareSize
        : possibleNextHead < 0
        ? p.squareSize * p.squareSize
        : 0)
  }

  const snakeTail = moveSnakeHeadTo == p.food ? p.snake : p.snake.slice(1)
  return moveSnakeHeadTo >= 0 ? [...snakeTail, moveSnakeHeadTo] : p.snake
}

export interface isGameOverProps {
  snake: number[]
}

export const isGameOver = (p: isGameOverProps) => {
  const snakeHead = p.snake[p.snake.length - 1]
  const snakeTail = p.snake.slice(0, p.snake.length - 1)
  return snakeTail.includes(snakeHead)
}
