import React from "react"
import { StyleSheet, Dimensions, ViewStyle } from "react-native"
import Animated, { interpolate, useAnimatedStyle } from "react-native-reanimated"

import { Card, Cards } from "../../../components"

const $overlay: ViewStyle = {
  ...StyleSheet.absoluteFillObject,
  justifyContent: "center",
  alignItems: "center",
}

const { width } = Dimensions.get("window")
const origin = -(width / 2 - 8 * 2)

interface AnimatedCardProps {
  transition: Animated.SharedValue<number>
  index: number
  card: Cards
}

export const AnimatedCard = ({ card, transition, index }: AnimatedCardProps) => {
  const $transitionStyle = useAnimatedStyle(() => {
    
    const alpha = interpolate(transition.value, [0, 1], [0, ((index - 1) * Math.PI) / 6])
    // const alpha = mix(transition.value, 0, ((index - 1) * Math.PI) / 6)

    return {
      transform: [
        {
          translateX: origin,
        },
        { rotate: `${alpha}rad` },
        {
          translateX: -origin,
        },
      ],
    }
  })

  return (
    <Animated.View  style={[$overlay, $transitionStyle]}>
      <Card {...{ card }} />
    </Animated.View>
  )
}
