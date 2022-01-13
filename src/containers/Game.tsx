import React, { useEffect, useReducer } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet, View, Platform, Button, Text } from 'react-native'
import useInterval from '../hooks/useInterval'
import GameBoard, { GameBoardProps } from '../components/GameBoard'
import { GAME_STATUSES, KEY_TO_DIRECTION } from '../constants/game'
import { isGameOver, nextSnake } from '../utils/controls'
import SwipeConsole from '../components/SwipeConsole'
const pixelSize: number = 15
const pixelMargin: number = 2
const squareSize: number = 15

const initialState = {
  snake: [1, 2, 3],
  food: 20,
  direction: null,
  platform: '',
  status: GAME_STATUSES.NOT_STARTED,
  speed: 150,
  score: 0,
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'START_NEW_GAME':
      return {
        ...state,
        snake: initialState.snake,
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
    case 'GAME_OVER':
      return { ...state, status: GAME_STATUSES.GAME_OVER }
    default:
      return state
  }
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    if (Platform.OS == 'web') {
      window.addEventListener('keydown', updateDirection)
      return () => {
        window.removeEventListener('keydown', updateDirection)
      }
    }
  }, [])

  const updateDirection = (event) => {
    console.log(event)
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
        squareSize,
      })
      const snakeHead = newSnake?.[newSnake?.length - 1]
      if (isGameOver({ snake: newSnake })) {
        dispatch({ type: 'GAME_OVER' })
      } else if (snakeHead >= 0) {
        if (snakeHead == state.food) {
          dispatch({
            type: 'UPDATE_FOOD',
            payload: Math.floor(Math.random() * squareSize * squareSize),
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
    squareSize,
    status: state.status,
  }
  return (
    <View style={styles.container}>
      <GameBoard {...gameProps} />
      {state.status == GAME_STATUSES.NOT_STARTED && (
        <Button
          title="New Game"
          onPress={() => dispatch({ type: 'START_NEW_GAME' })}
        />
      )}
      {state.status != GAME_STATUSES.NOT_STARTED && (
        <Text>Score: {state.score}</Text>
      )}
      {state.status == GAME_STATUSES.GAME_OVER && <Text>Game Over</Text>}
      {Platform.OS != 'web' && (
        <SwipeConsole
          onSwipeUp={() => updateDirection({ key: KEY_TO_DIRECTION.ArrowUp })}
          onSwipeDown={() =>
            updateDirection({ key: KEY_TO_DIRECTION.ArrowDown })
          }
          onSwipeRight={() =>
            updateDirection({ key: KEY_TO_DIRECTION.ArrowRight })
          }
          onSwipeLeft={() =>
            updateDirection({ key: KEY_TO_DIRECTION.ArrowLeft })
          }
        />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
