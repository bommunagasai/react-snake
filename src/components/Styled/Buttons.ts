import styled from 'styled-components/native'

export const SecondaryBtnLabel = styled.Text`
  font-size: 12px;
  align-self: center;
  color: ${(p) =>
    !p.pressed ? p.theme?.colors?.snake : p.theme?.colors?.background};
`

export const SecondaryBtnContainer = styled.View`
  padding: 8px 16px;
  border-radius: 4px;
  background: ${(p) =>
    !p.pressed ? p.theme?.colors?.background : p.theme?.colors?.snake};
  border: 1px solid
    ${(p) => (!p.pressed ? p.theme?.colors?.snake : p.theme?.colors?.background)};
`

export const FlexRow = styled.View`
  flex-direction: row;
  align-items: baseline;
  justify-content: space-between;
`