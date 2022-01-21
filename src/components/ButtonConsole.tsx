import React from 'react'
import styled from 'styled-components/native'
import { IconButton } from './IconButton'
import { FlexRow } from './Styled/Buttons'

const ConsoleContainer = styled.View`
  justify-content: center;
  align-items: center;
  margin: 24px 0;
`



export interface ButtonConsoleProps {
  onUp: () => void
  onDown: () => void
  onRight: () => void
  onLeft: () => void
}
export const ButtonConsole = (p: ButtonConsoleProps) => {
  return (
    <ConsoleContainer>
      <IconButton name="arrow-up-outline" type='ionicon' onPress={p.onUp} />
      <FlexRow>
        <IconButton name="arrow-back-outline" type='ionicon' onPress={p.onLeft} />
        <IconButton name="ellipse-outline" type='ionicon' style={{ borderWidth: 0 }} />
        <IconButton name="arrow-forward-outline" type='ionicon' onPress={p.onRight} />
      </FlexRow>
      <IconButton name="arrow-down-outline" type='ionicon' onPress={p.onDown} />
    </ConsoleContainer>
  )
}
