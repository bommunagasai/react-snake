import styled from 'styled-components/native'

const AppContainer = styled.View`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  background-color: ${(p) => p.theme?.colors?.background};
`

export default AppContainer
