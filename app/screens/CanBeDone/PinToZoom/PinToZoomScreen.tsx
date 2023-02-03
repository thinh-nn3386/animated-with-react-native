import React from 'react'
import { Screen } from '../../../components/Screen'
import { Alert, Image, View, ViewStyle } from 'react-native'
import Animated, { runOnUI, useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import { Gesture, GestureDetector, PanGestureHandler, PanGestureHandlerGestureEvent, PinchGestureHandler, PinchGestureHandlerGestureEvent } from 'react-native-gesture-handler'
import { clamp } from 'react-native-redash'


const MIN_ZOOM = 0.8
const MAX_ZOOM = 10

export const PinToZoomScreen = () => {

  const scale = useSharedValue(1)
  //Position expressed in points along X axis of center anchor point of gesture
  const translateX = useSharedValue(0)

  //Position expressed in points along Y axis of center anchor point of gesture
  const translateY = useSharedValue(0)


  const pinchGestureEvent = useAnimatedGestureHandler
    <PinchGestureHandlerGestureEvent, {
      scale: number;
      x: number
      y: number
      focalX: number
      focalY: number
    }>
    ({
      onStart(event, context) {
        context.scale = scale.value
        context.x = translateX.value
        context.y = translateY.value
        context.focalX = event.focalX
        context.focalY = event.focalY
      },
      onActive(event, context) {
        scale.value = clamp(event.scale + context.scale - 1, MIN_ZOOM, MAX_ZOOM)
        translateX.value = (event.focalX - context.focalX) + translateX.value
        translateY.value = (event.focalY - context.focalY) + translateY.value
      }
    })


  const singleTap = Gesture.Tap()
    .maxDuration(250)
    .runOnJS(true)
    .onStart(() => {
    })
    ;

  const doubleTap = Gesture.Tap()
    .maxDuration(250)
    .numberOfTaps(2)
    .runOnJS(true)
    .onEnd(() => {
      if (scale.value === 1) {
        // image is not scale
        scale.value = withTiming(2)
      } else {
        scale.value = withTiming(1)
      }
      translateX.value = withTiming(0)
      translateY.value = withTiming(0)
    });


  const $imageStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: translateX.value
        },
        {
          translateY: translateY.value
        },
        {
          scale: scale.value
        }
      ]
    }
  })
  return (
    <View style={$container}>
      <GestureDetector gesture={Gesture.Exclusive(doubleTap, singleTap)}>
        <PinchGestureHandler onGestureEvent={pinchGestureEvent}>
          <Animated.Image
            resizeMode='contain'
            source={require('./image.jpeg')}
            style={[{
              maxWidth: "100%"
            }, $imageStyle]}
          />
        </PinchGestureHandler>
      </GestureDetector>
    </View>
  )
}


const $container: ViewStyle = {
  flex: 1,
  justifyContent: "center",
  alignItems: "center"
}
