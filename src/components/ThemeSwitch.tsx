import React from 'react'
import styled, { useTheme } from 'styled-components/native'
import { themes } from '../styles/themes'

const ThemeSwitchContainer = styled.View`
  justify-content: flex-start;
  flex-direction: row;
  border-radius: 24px;
  border-width: 1px;
  border-color: ${(p) => p.borderColor};
  padding: 4px;
`

const ThemeItem = styled.Pressable`
  width: ${p => p.isActive ? '24px' : '20px'};
  height: ${p => p.isActive ? '24px' : '20px'};
  border-width: ${p => p.isActive ? '6px' : '4px'};
  margin: 6px;
  border-radius: 14px;
  margin: 4px 10px;
  align-self: center;
  border-color: ${(p) => p.borderColor};
  background-color: ${(p) => p.backgroundColor};
`

export const ThemeSwitch = ({ selectTheme }) => {
  const theme = useTheme()
  return (
    <ThemeSwitchContainer borderColor={theme.colors.snake}>
      <ThemeItem
        borderColor={themes.light.colors.snake}
        backgroundColor={themes.light.colors.board}
        onPress={() => selectTheme(themes.light)}
        isActive={theme.colors.snake == themes.light.colors.snake}
      />
      <ThemeItem
        borderColor={themes.dark.colors.snake}
        backgroundColor={themes.dark.colors.board}
        onPress={() => selectTheme(themes.dark)}
        isActive={theme.colors.snake == themes.dark.colors.snake}
      />
      <ThemeItem
        borderColor={themes.red.colors.snake}
        backgroundColor={themes.red.colors.board}
        onPress={() => selectTheme(themes.red)}
        isActive={theme.colors.snake == themes.red.colors.snake}
      />
    </ThemeSwitchContainer>
  )
}
