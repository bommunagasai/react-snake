import React, { useRef, useState } from 'react'
import { View, Text, FlatList, StyleSheet } from 'react-native'
import { Icon } from 'react-native-elements'
import { useTheme } from 'styled-components'

export interface OptionItemProps {
  value: string
  key: number
}
export interface SwipeSelectProps {
  options: OptionItemProps[]
  onChange: (index: number) => void
}
const SwipeSelect = (p: SwipeSelectProps) => {
  const theme = useTheme()
  const [selectedOption, setSelectedOption] = useState(0)
  const flatlistRef = useRef(null)
  const nextOption = () => {
    if (selectedOption + 1 < p.options.length) {
      setSelectedOption(selectedOption + 1)
      p.onChange(selectedOption + 1)
      flatlistRef?.current?.scrollToIndex?.({
        animated: true,
        index: selectedOption + 1,
      })
    }
  }

  const prevOption = () => {
    if (selectedOption > 0) {
      setSelectedOption(selectedOption - 1)
      p.onChange(selectedOption - 1)
      flatlistRef?.current?.scrollToIndex?.({
        animated: true,
        index: selectedOption - 1,
      })
    }
  }

  const onViewRef = React.useRef(({ viewableItems }) => {
    // Use viewable items in state or as intended
    const selectedIndex: number = viewableItems?.[0]?.index || 0
    if (selectedIndex >= 0) {
      setSelectedOption(selectedIndex)
      p.onChange(selectedIndex)
    }
  })
  const viewConfigRef = React.useRef({ viewAreaCoveragePercentThreshold: 50 })
  return (
    <View style={styles.container}>
      <Icon
        color={theme.colors.snake}
        style={styles.navIcon}
        tvParallaxProperties={false}
        type="ionicon"
        name="chevron-back-outline"
        onPress={prevOption}
      />
      <FlatList
        ref={flatlistRef}
        showsHorizontalScrollIndicator={false}
        snapToAlignment="center"
        onViewableItemsChanged={onViewRef.current}
        viewabilityConfig={viewConfigRef.current}
        pagingEnabled={true}
        decelerationRate={'fast'}
        snapToInterval={90}
        horizontal={true}
        data={p.options || []}
        renderItem={({ item }) => (
          <Text
            key={item.key}
            style={[{ color: theme.colors.snake }, styles.selectLabel]}
          >
            {item.value}
          </Text>
        )}
        disableIntervalMomentum
      />
      <Icon
        color={theme.colors.snake}
        style={styles.navIcon}
        tvParallaxProperties={false}
        type="ionicon"
        name="chevron-forward-outline"
        onPress={nextOption}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    width: 140,
    paddingVertical: 20,
  },
  navIcon: {
    fontSize: 20,
    width: 30,
    height: 30,
  },
  selectLabel: {
    textAlign: 'center',
    width: 90,
    padding: 10,
  },
})

export default SwipeSelect
