import React, { useState } from 'react'
import { Screen } from '../../../components/Screen'
import { Alert, Dimensions, Image, View, ViewStyle } from 'react-native'
import Animated, { Easing, interpolate, interpolateColor, runOnUI, SharedValue, useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withDecay, withTiming } from 'react-native-reanimated'
import { Gesture, GestureDetector, PanGestureHandler, PanGestureHandlerGestureEvent, PinchGestureHandler, PinchGestureHandlerGestureEvent } from 'react-native-gesture-handler'
import { clamp, withBouncing } from 'react-native-redash'
import { ZoomableItem } from './ZoomableItem'
import { goBack, goNext, IMAGE, ITEM_WIDTH, MAX_ZOOM, MIN_ZOOM, SPACING, SWIP_VELOCITY, THRESSHOLD } from './utils'



export const PinToZoomScreen = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const translateX = useSharedValue(0)
  const translateY = useSharedValue(0)
  const onSwipDown = useSharedValue(false)


  const panGestureHandler = useAnimatedGestureHandler
    <PanGestureHandlerGestureEvent, {
      x: number
      y: number
    }>
    ({
      onStart(event, context) {
        context.x = translateX.value
        context.y = translateY.value
      },
      onActive(event, context) {
        translateX.value = event.translationX + context.x
        translateY.value = clamp(event.translationY + context.y, 0, 200)
      },
      onEnd(event, context) {
        if (translateY.value === 0) {
          const moveX = event.translationX
          const veX = Math.abs(event.velocityX)
          if (moveX > 0) {
            goBack(moveX, veX, translateX, currentIndex, setCurrentIndex)
          }
          if (moveX < 0) {
            goNext(moveX, veX, translateX, currentIndex, setCurrentIndex)
          }
        }
      },
    })

  const $containerTransform = useAnimatedStyle(() => {
    if (translateY.value !== 0) {
      return {}
    }
    return {
      transform: [
        {
          translateX: translateX.value
        }
      ]
    }
  })


  const $containerAnim = useAnimatedStyle(() => {
    if (translateY.value === 0) {
      return {}
    }
    return {
      transform: [
        {
          translateX: translateX.value
        },
        {
          translateY: translateY.value
        },
        {
          scale: interpolate(translateY.value, [0, 200], [1, 0.5])
        }
      ]
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
            {
              IMAGE.map((source, index) => (
                <ZoomableItem
                  key={index}
                  spacing={index !== 0 ? SPACING : 0}
                  minZoom={MIN_ZOOM}
                  maxZoom={MAX_ZOOM}
                  source={source}
                  moveX={translateX}
                  currentIndex={currentIndex}
                  setCurrentIndex={setCurrentIndex}
                />
              ))
            }
          </Animated.View>
        </PanGestureHandler>
      </Animated.View>
    </Animated.View>
  )
}



const $container: ViewStyle = {
  flex: 1,
  overflow: "hidden"
}

const $mediaContainer: ViewStyle = {
  flex: 1,
  flexDirection: "row",
  alignItems: "center"
}
