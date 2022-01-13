import React from 'react'
import { PanResponderGestureState, Text } from 'react-native'

import GestureRecognizer from 'react-native-swipe-gestures'

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
        width: 200,
        height: 200,
      }}
    >
      <Text
        style={{
          flex: 1,
          backgroundColor: '#FFA',
          borderRadius: 20,
        }}
      />
    </GestureRecognizer>
  )
}

export default SwipeConsole
