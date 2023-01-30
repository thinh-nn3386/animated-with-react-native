import React, { useEffect, useState } from "react"
import { Dimensions, View, ViewStyle } from "react-native"
import { useSharedValue, withRepeat, withTiming } from "react-native-reanimated"
import { withPause } from "react-native-redash"
import { Button, Header, Screen } from "../../../components"
import { goBack } from "../../../navigators"
import { AnimatedDot } from "./AnimationDot"

const { width, height } = Dimensions.get("screen")
const CHAT_BUBBLE_SIZE = width * 0.7

export const HigherOrderAnimationScreen = () => {
  const [play, setPlay] = useState(false)

  const paused = useSharedValue(!play)

  const progress = useSharedValue(0)

  useEffect(() => {
    progress.value = withPause(withRepeat(withTiming(1, {duration: 600}), -1, true), paused)
  }, [paused])

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
          text={play ? "Paused" : "Play"}
          onPress={() => {
            setPlay(!play)
            paused.value = !paused.value
          }}
        />
      }
      contentContainerStyle={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View style={$chatBubbleStyle}>
        {Array.from(Array(3).keys()).map((_, index) => {
          const start = index / 3
          const end = (index + 1) / 3
          return <AnimatedDot key={index} {...{ start, end, progress }} />
        })}
      </View>
    </Screen>
  )
}

const $chatBubbleStyle: ViewStyle = {
  width: CHAT_BUBBLE_SIZE,
  height: CHAT_BUBBLE_SIZE,
  borderTopRightRadius: CHAT_BUBBLE_SIZE / 2,
  borderTopLeftRadius: CHAT_BUBBLE_SIZE / 2,
  borderBottomLeftRadius: CHAT_BUBBLE_SIZE / 2,
  backgroundColor: "white",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "row",
}
