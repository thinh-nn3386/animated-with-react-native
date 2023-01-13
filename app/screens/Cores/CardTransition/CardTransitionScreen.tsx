import { boolean } from "mobx-state-tree/dist/internal"
import React, { useEffect, useState } from "react"
import { View, StyleSheet } from "react-native"
import { useDerivedValue, useSharedValue, withSpring } from "react-native-reanimated"
import { bin, useSpring } from "react-native-redash"
import { Button, cards, Header, Screen } from "../../../components"
import { goBack } from "../../../navigators"
import { AnimatedCard } from "./AnimatedCard"

export const CardTransitionScreen = () => {
  const [toggled, setToggled] = useState<boolean>(false)

  const transition = useDerivedValue(()   => {
    return withSpring(toggled ? 1 : 0)
  }, [toggled])
  // const transition = useSpring(toggled)

  return (
    <Screen
      preset="fixed"
      safeAreaEdges={["bottom"]}
      header={
        <Header
          leftText="Back"
          onLeftPress={() => goBack()}
          title="Transition"
          style={{
            borderBottomWidth: 1,
            borderBottomColor: "gray",
          }}
        />
      }
      footer={
        <Button
          text={toggled ? "Stop" : "Start"}
          onPress={() => {
            setToggled(!toggled)
          }}
        />
      }
      contentContainerStyle={{
        flex: 1,
      }}
    >
      <View style={styles.container}>
        {cards.slice(0, 3).map((card, index) => (
          <AnimatedCard key={card} {...{ index, card, transition }} />
        ))}
      </View>
    </Screen>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
