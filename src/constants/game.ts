export const KEY_TO_DIRECTION = {
  ArrowRight: 'ArrowRight',
  ArrowLeft: 'ArrowLeft',
  ArrowUp: 'ArrowUp',
  ArrowDown: 'ArrowDown',
}

export const GAME_STATUSES = {
  NOT_STARTED: 'NOT_STARTED',
  PLAYING: 'PLAYING',
  GAME_OVER: 'GAME_OVER',
}

export const pixelSize: number = 15
export const pixelMargin: number = 2
export const LEVEL = [
  { squareSize: 8, snake: [21, 29, 37], food: 10, speed: 200 },
  { squareSize: 10, snake: [43, 53, 63], food: 46, speed: 180 },
  { squareSize: 12, snake: [32, 44, 56], food: 89, speed: 160 },
]