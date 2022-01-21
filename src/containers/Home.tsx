import React, { useState } from 'react'
import { Pressable } from 'react-native'
import SwipeSelect from '../components/SwpieSelect'
import AppContainer from '../components/Styled/AppContainer'
import {
  SecondaryBtnContainer,
  SecondaryBtnLabel,
} from '../components/Styled/Buttons'
import GameBoard from '../components/GameBoard'
import { GAME_STATUSES } from '../constants/game'

const Home = ({ navigation: { navigate } }) => {
  const [gameMode, setGameMode] = useState(0)
  return (
    <AppContainer>
      <GameBoard
        squareSize={10}
        pixelMargin={4}
        pixelSize={15}
        snake={[
          11, 12, 13, 21, 22, 23, 31, 32, 33, 34, 43, 44, 55, 66, 77, 
        ]}
        food={88}
        status={GAME_STATUSES.NOT_STARTED}
      />
      <SwipeSelect
        options={[
          { value: 'Easy', key: 0 },
          { value: 'Medium', key: 1 },
          { value: 'Hard', key: 2 },
        ]}
        onChange={(mode: number) => setGameMode(mode)}
      />
      <Pressable onPress={() => navigate('Game', { gameMode })}>
        {({ pressed }) => (
          <SecondaryBtnContainer pressed={pressed}>
            <SecondaryBtnLabel pressed={pressed}>New Game</SecondaryBtnLabel>
          </SecondaryBtnContainer>
        )}
      </Pressable>
    </AppContainer>
  )
}

export default Home
