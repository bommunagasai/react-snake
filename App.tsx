import React, { useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Icon } from 'react-native-elements'
import Home from './src/containers/Home'
import Game from './src/containers/Game'
import { ThemeProvider } from 'styled-components/native'
import { themes } from './src/styles/themes'
import { SafeAreaView, StyleSheet, StatusBar } from 'react-native'
import { ThemeSwitch } from './src/components/ThemeSwitch'

const Stack = createNativeStackNavigator()

export default function App() {
  const [theme, setTheme] = useState(themes.dark)
  return (
    <SafeAreaView style={styles.container}>
      <ThemeProvider theme={theme}>
        <StatusBar
          barStyle={theme.barStyle}
          backgroundColor={theme.colors.background}
        />
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen
              name="Home"
              options={{
                // statusBarHidden: true,
                headerStyle: { backgroundColor: theme.colors.background },
                headerShadowVisible: false,
                headerRight: () => <ThemeSwitch selectTheme={setTheme} />,
                title: '',
              }}
              component={Home}
            />
            <Stack.Screen
              name="Game"
              options={({ navigation }) => ({
                // statusBarHidden: true,
                headerStyle: { backgroundColor: theme.colors.background },
                headerShadowVisible: false,
                headerLeft: () => (
                  <Icon
                    color={theme.colors.snake}
                    tvParallaxProperties={false}
                    type="ionicon"
                    name="chevron-back-outline"
                    onPress={navigation.goBack}
                  />
                ),
                headerRight: () => <ThemeSwitch selectTheme={setTheme} />,
                title: '',
              })}
              component={Game}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </ThemeProvider>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
