import React from "react"
import { ViewStyle } from "react-native"
import Animated, { Extrapolate, interpolate, SharedValue, useAnimatedStyle } from "react-native-reanimated"

interface AnimatedDotProps {
  start: number
  end: number
  progress: SharedValue<number>
}

const ACTIVE_DOT_SIZE = 30
const INACTIVE_DOT_SIZE = 20

export const AnimatedDot = ({start, end, progress}: AnimatedDotProps) => {
  const $style: ViewStyle = {
    width: ACTIVE_DOT_SIZE,
    height: ACTIVE_DOT_SIZE,
    borderRadius: ACTIVE_DOT_SIZE / 2,
    backgroundColor: "blue",
    margin: 10
  }

  const $dotAnimStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: interpolate(progress.value, [start, end], [0.5,1.2], Extrapolate.CLAMP)
        },
      ]
    }
  })
  return <Animated.View style={[$style, $dotAnimStyle]}/>
}
