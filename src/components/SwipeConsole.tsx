import React from 'react'
import styled from 'styled-components/native'
import { PanResponderGestureState, Text } from 'react-native'

import GestureRecognizer from 'react-native-swipe-gestures'

const ConsoleLayout = styled.View`
  flex: 1;
  background: ${p => p.theme.colors.board};
  border: 1px solid ${p => p.theme.colors.snake};
  opacity: .5;
  border-radius: 8px;
  margin: 24px 0;
`

export interface SwipeConsoleProps {
  onSwipeUp: (p: PanResponderGestureState) => void
  onSwipeDown: (p: PanResponderGestureState) => void
  onSwipeRight: (p: PanResponderGestureState) => void
  onSwipeLeft: (p: PanResponderGestureState) => void
}

const SwipeConsole = (p: SwipeConsoleProps) => {
  const config = {
    velocityThreshold: 0.1,
    directionalOffsetThreshold: 90,
  }
  return (
    <GestureRecognizer
      onSwipeUp={p.onSwipeUp}
      onSwipeDown={p.onSwipeDown}
      onSwipeLeft={p.onSwipeLeft}
      onSwipeRight={p.onSwipeRight}
      config={config}
      style={{
        width: 300,
        height: 300,
      }}
    >
      <ConsoleLayout />
    </GestureRecognizer>
  )
}

export default SwipeConsole
