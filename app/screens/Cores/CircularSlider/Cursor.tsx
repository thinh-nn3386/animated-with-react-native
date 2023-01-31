import * as React from "react"
import { StyleSheet, View } from "react-native"
import { PanGestureHandler, PanGestureHandlerGestureEvent } from "react-native-gesture-handler"
import Animated, { useAnimatedGestureHandler, useAnimatedStyle } from "react-native-reanimated"
import { canvas2Polar, clamp, polar2Canvas } from "react-native-redash"

interface CursorProps {
  r: number
  strokeWidth: number
  theta: Animated.SharedValue<number>
  backgroundColor: Animated.SharedValue<string | number>
}
const THRESHOLD = 0.001

export const Cursor = ({ r, strokeWidth, theta, backgroundColor }: CursorProps) => {
  const center = { x: r, y: r }
  const onPanGesture = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    {
      offset: { x: number; y: number }
    }
  >({
    onStart(event, context) {
      context.offset = polar2Canvas(
        {
          theta: theta.value,
          radius: r,
        },
        center,
      )
    },
    onActive(event, context) {
      const x = context.offset.x + event.translationX
      const y1 = context.offset.y + event.translationY
      let y: number
      if (x < r) {
        y = y1
      } else if (theta.value < Math.PI) {
        y = clamp(y1, 0, r - THRESHOLD)
      } else {
        y = clamp(y1, r, 2 * r)
      }
      const value = canvas2Polar({ x, y }, center).theta
      theta.value = value > 0 ? value : 2 * Math.PI + value
    },
  })
  const style = useAnimatedStyle(() => {
    const translation = polar2Canvas(
      {
        theta: theta.value,
        radius: r,
      },
      center,
    )
    return {
      backgroundColor: backgroundColor.value,
      transform: [
        {
          translateX: translation.x,
        },
        {
          translateY: translation.y,
        },
      ],
    }
  })
  return (
    <PanGestureHandler onGestureEvent={onPanGesture}>
      <Animated.View
        style={[
          {
            ...StyleSheet.absoluteFillObject,
            width: strokeWidth,
            height: strokeWidth,
            borderRadius: strokeWidth / 2,
            backgroundColor: "blue",
          },
          style,
        ]}
      />
    </PanGestureHandler>
  )
}
