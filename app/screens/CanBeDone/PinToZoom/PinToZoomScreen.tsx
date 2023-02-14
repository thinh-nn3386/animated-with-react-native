import React, { useState } from "react"
import { Screen } from "../../../components/Screen"
import { Alert, Dimensions, Image, View, ViewStyle } from "react-native"
import Animated, {
  interpolate,
  interpolateColor,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated"
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from "react-native-gesture-handler"
import { clamp } from "react-native-redash"
import { ZoomableItem } from "./ZoomableItem"
import {
  goBack,
  goNext,
  IMAGE,
  MAX_ZOOM,
  MIN_ZOOM,
  SPACING,
} from "./utils"

const { width, height } = Dimensions.get("screen")
export const PinToZoomScreen = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const moveX = useSharedValue(0)
  const translateX = useSharedValue(0)
  const translateY = useSharedValue(0)

  const onVertical = useSharedValue(false)
  const onHorizontal = useSharedValue(false)

  const panGestureHandler = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    {
      x: number
      y: number
      moveX: number
    }
  >({
    onStart(event, context) {
      context.x = translateX.value
      context.y = translateY.value
      context.moveX = moveX.value

      onVertical.value = false
      onHorizontal.value = false
    },
    onActive(event, context) {
      if (!onHorizontal.value && !onVertical.value) {
        if (Math.abs(event.translationX) > Math.abs(event.translationY)) {
          onHorizontal.value = true
        } else {
          onVertical.value = true
        }
      }

      if (onHorizontal.value) {
        moveX.value = event.translationX + context.moveX
      }

      if (onVertical.value) {
        translateY.value = clamp(event.translationY + context.y, 0, height)
        translateX.value = event.translationX + context.x
      }
    },
    onEnd(event, context) {
      if (onHorizontal.value) {
        const _x = event.translationX
        const veX = Math.abs(event.velocityX)
        if (_x > 0) {
          goBack(_x, veX, moveX, currentIndex, setCurrentIndex)
        }
        if (_x < 0) {
          goNext(_x, veX, moveX, currentIndex, setCurrentIndex)
        }
      }

      if (onVertical.value) {
        translateX.value = withTiming(0, { duration: 200 })
        translateY.value = withTiming(0, { duration: 200 })
      }
    },
  })

  const $containerTransform = useAnimatedStyle(() => {
    if (onVertical.value) {
      return {}
    }
    return {
      transform: [
        {
          translateX: moveX.value,
        },
      ],
    }
  })

  const $containerAnim = useAnimatedStyle(() => {
    if (!onVertical.value) {
      return {}
    }
    return {
      transform: [
        {
          translateX: translateX.value,
        },
        {
          translateY: translateY.value,
        },
        {
          scale: interpolate(translateY.value, [0, height], [1, 0]),
        },
      ],
    }
  })

  const $background = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(translateY.value, [0, 200], ["black", "transparent"]),
    }
  })

  return (
    <Animated.View style={[$container, $background]}>
      <Animated.View style={[$container, $containerAnim]}>
        <PanGestureHandler onGestureEvent={panGestureHandler}>
          <Animated.View style={[$mediaContainer, $containerTransform]}>
            {IMAGE.map((source, index) => (
              <ZoomableItem
                key={index}
                mediaIndex={index}
                spacing={index !== 0 ? SPACING : 0}
                minZoom={MIN_ZOOM}
                maxZoom={MAX_ZOOM}
                source={source}
                moveX={moveX}
                currentIndex={currentIndex}
                setCurrentIndex={setCurrentIndex}
              />
            ))}
          </Animated.View>
        </PanGestureHandler>
      </Animated.View>
    </Animated.View>
  )
}

const $container: ViewStyle = {
  flex: 1,
  overflow: "hidden",
}

const $mediaContainer: ViewStyle = {
  flex: 1,
  flexDirection: "row",
  alignItems: "center",
}
