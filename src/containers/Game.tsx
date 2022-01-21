import React, { useEffect, useReducer } from 'react'
import { Platform, Pressable, Vibration } from 'react-native'
import useInterval from '../hooks/useInterval'
import GameBoard, { GameBoardProps } from '../components/GameBoard'
import {
  GAME_STATUSES,
  KEY_TO_DIRECTION,
  pixelSize,
  pixelMargin,
  LEVEL,
} from '../constants/game'
import { isGameOver, nextSnake } from '../utils/controls'
import AppContainer from '../components/Styled/AppContainer'
import { GamePad, GamePadSwitch, GAME_PAD_MODE } from '../components/GamePad'
import {
  FlexRow,
  SecondaryBtnContainer,
  SecondaryBtnLabel,
} from '../components/Styled/Buttons'

const initialState = {
  ...LEVEL[0],
  direction: null,
  platform: '',
  status: GAME_STATUSES.NOT_STARTED,
  score: 0,
  gamePadMode: GAME_PAD_MODE.BUTTON,
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'SETUP_GAME':
      const { gameMode } = action.payload
      return {
        ...state,
        ...LEVEL[gameMode],
      }
    case 'START_NEW_GAME':
      return {
        ...state,
        direction: KEY_TO_DIRECTION.ArrowDown,
        status: GAME_STATUSES.PLAYING,
      }
    case 'UPDATE_SNAKE':
      return { ...state, snake: action.payload }
    case 'UPDATE_FOOD':
      return { ...state, food: action.payload, score: state.score + 1 }
    case 'UPDATE_SNAKE_DIRECTION':
      if (
        !(
          [KEY_TO_DIRECTION.ArrowRight, KEY_TO_DIRECTION.ArrowLeft].includes(
            state.direction
          ) &&
          [KEY_TO_DIRECTION.ArrowRight, KEY_TO_DIRECTION.ArrowLeft].includes(
            action.payload
          )
        ) &&
        !(
          [KEY_TO_DIRECTION.ArrowUp, KEY_TO_DIRECTION.ArrowDown].includes(
            state.direction
          ) &&
          [KEY_TO_DIRECTION.ArrowUp, KEY_TO_DIRECTION.ArrowDown].includes(
            action.payload
          )
        )
      ) {
        return { ...state, direction: action.payload }
      } else {
        return state
      }
    case 'CHANGE_GAME_PAD_MODE':
      return { ...state, gamePadMode: action.payload }
    case 'GAME_OVER':
      return { ...state, status: GAME_STATUSES.GAME_OVER }
    default:
      return state
  }
}

const Game = ({ route }) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const { gameMode } = route?.params || {}
  useEffect(() => {
    if ([0, 1, 2].includes(gameMode)) {
      dispatch({ type: 'SETUP_GAME', payload: { gameMode } })
    }
    if (Platform.OS == 'web') {
      window.addEventListener('keydown', updateDirection)
      return () => {
        window.removeEventListener('keydown', updateDirection)
      }
    }
  }, [])

  const updateDirection = (event) => {
    const key = event.key
    if (
      Object.entries(KEY_TO_DIRECTION)
        .map(([k]) => k)
        .includes(key)
    ) {
      dispatch({
        type: 'UPDATE_SNAKE_DIRECTION',
        payload: key,
      })
    }
  }

  useInterval(() => {
    moveSnake()
  }, state.speed)

  useEffect(() => {
    moveSnake()
  }, [state.snake.direction])

  const moveSnake = () => {
    if (state.status == GAME_STATUSES.PLAYING) {
      const newSnake: number[] = nextSnake({
        snake: state.snake,
        direction: state.direction,
        food: state.food,
        squareSize: state.squareSize,
      })
      const snakeHead = newSnake?.[newSnake?.length - 1]
      if (isGameOver({ snake: newSnake })) {
        dispatch({ type: 'GAME_OVER' })
        Vibration.vibrate()
      } else if (snakeHead >= 0) {
        if (snakeHead == state.food) {
          dispatch({
            type: 'UPDATE_FOOD',
            payload: Math.floor(
              Math.random() * state.squareSize * state.squareSize
            ),
          })
        }
        dispatch({ type: 'UPDATE_SNAKE', payload: newSnake })
      }
    }
  }

  const gameProps: GameBoardProps = {
    snake: state.snake,
    food: state.food,
    pixelMargin,
    pixelSize,
    squareSize: state.squareSize,
    status: state.status,
  }
  return (
    <AppContainer style={{ justifyContent: 'flex-start', paddingTop: 20 }}>
      <GameBoard {...gameProps} />
      {state.status == GAME_STATUSES.GAME_OVER && <SecondaryBtnLabel>Game Over</SecondaryBtnLabel>}
      <FlexRow style={{ width: 300, marginTop: 20 }}>
        {state.status == GAME_STATUSES.NOT_STARTED ? (
          <Pressable onPress={() => dispatch({ type: 'START_NEW_GAME' })}>
            {({ pressed }) => (
              <SecondaryBtnContainer pressed={pressed}>
                <SecondaryBtnLabel pressed={pressed}>Start</SecondaryBtnLabel>
              </SecondaryBtnContainer>
            )}
          </Pressable>
        ) : (
          <SecondaryBtnLabel>Score: {state.score}</SecondaryBtnLabel>
        )}
        <GamePadSwitch
          gamePadMode={state.gamePadMode}
          onPress={(gamePadMode) =>
            dispatch({ type: 'CHANGE_GAME_PAD_MODE', payload: gamePadMode })
          }
        />
      </FlexRow>
      {Platform.OS != 'web' && (
        <GamePad
          gamePadMode={state.gamePadMode}
          onUp={() => updateDirection({ key: KEY_TO_DIRECTION.ArrowUp })}
          onDown={() => updateDirection({ key: KEY_TO_DIRECTION.ArrowDown })}
          onRight={() => updateDirection({ key: KEY_TO_DIRECTION.ArrowRight })}
          onLeft={() => updateDirection({ key: KEY_TO_DIRECTION.ArrowLeft })}
        />
      )}
    </AppContainer>
  )
}

export default Game
