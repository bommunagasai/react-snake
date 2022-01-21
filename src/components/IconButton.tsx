import React from 'react'
import { Pressable } from 'react-native'
import { Icon } from 'react-native-elements'
import styled, { useTheme } from 'styled-components/native'

const IconButtonContainer = styled.View`
  padding: ${(p) => (p.size == 'md' ? '15px' : '8px')};
  margin: ${(p) => (p.noMargin ? 0 : p.size == 'md' ? '8px' : '2px')};
  background: ${(p) =>
    !p.pressed ? p.theme?.colors?.background : p.theme?.colors?.snake};
  border: ${(p) =>
    p.noBorder
      ? 0
      : `1px solid ${
          p.pressed ? p.theme?.colors?.background : p.theme?.colors?.snake
        }`};
  border-radius: ${(p) => (p.noBorder ? 0 : '4px')};
`

export const IconButton = ({
  size = 'md',
  name = '',
  type = 'ionicon',
  onPress = (p: any) => {},
  isActive = false,
  noBorder = false,
  noMargin = false,
  ...rest
}) => {
  const theme = useTheme()

  return (
    <Pressable onPress={onPress}>
      {({ pressed = false }) => (
        <IconButtonContainer
          {...rest}
          pressed={pressed || isActive}
          size={size}
          noMargin={noMargin}
          noBorder={noBorder}
        >
          <Icon
            tvParallaxProperties={false}
            type={type}
            name={name}
            color={
              pressed || isActive
                ? theme?.colors?.background
                : theme?.colors?.snake
            }
            size={size == 'md' ? 20 : 16}
          />
        </IconButtonContainer>
      )}
    </Pressable>
  )
}
