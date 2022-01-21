import React from 'react'
import styled from 'styled-components/native'
import { ButtonConsole } from './ButtonConsole'
import { IconButton } from './IconButton'
import SwipeConsole from './SwipeConsole'
export const GAME_PAD_MODE = {
  GESTURE: 'GESTURE',
  BUTTON: 'BUTTON',
}
export interface GamePadProps {
  gamePadMode: keyof typeof GAME_PAD_MODE
  onUp: () => void
  onDown: () => void
  onRight: () => void
  onLeft: () => void
}
export const GamePad = (p: GamePadProps) => {
  return p.gamePadMode != GAME_PAD_MODE.GESTURE ? (
    <ButtonConsole
      onUp={p.onUp}
      onDown={p.onDown}
      onRight={p.onRight}
      onLeft={p.onLeft}
    />
  ) : (
    <SwipeConsole
      onSwipeUp={p.onUp}
      onSwipeDown={p.onDown}
      onSwipeRight={p.onRight}
      onSwipeLeft={p.onLeft}
    />
  )
}

const GamePadSwitchContainer = styled.View`
  flex-direction: row;
  align-items: flex-end;
  border: 1px solid ${(p) => p.theme?.colors?.snake};
`

export const GamePadSwitch = ({
  onPress = () => {},
  gamePadMode = GAME_PAD_MODE.BUTTON,
}) => {
  return (
    <GamePadSwitchContainer>
      <IconButton
        type="material"
        name="gamepad"
        size="sm"
        isActive
        noMargin
        noBorder
        onPress={() => onPress(GAME_PAD_MODE.BUTTON)}
        isActive={gamePadMode == GAME_PAD_MODE.BUTTON}
      />
      <IconButton
        type="material"
        name="swipe"
        size="sm"
        noMargin
        noBorder
        onPress={() => onPress(GAME_PAD_MODE.GESTURE)}
        isActive={gamePadMode == GAME_PAD_MODE.GESTURE}
      />
    </GamePadSwitchContainer>
  )
}
