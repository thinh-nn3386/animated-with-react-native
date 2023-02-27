import React, { useEffect, useMemo, useState } from "react"
import {  Dimensions,  ImageSourcePropType, View, ViewStyle } from "react-native"
import Animated, {
  runOnJS,
  SharedValue,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated"
import {
  Gesture,
  GestureDetector,
} from "react-native-gesture-handler"
import { goBack, goNext, noName } from "./Utils"
import { clamp } from "react-native-redash"

interface Props {
  minZoom: number
  maxZoom: number
  source: ImageSourcePropType
  spacing: number
  moveX: SharedValue<number>
  mediaIndex: number
  currentIndex: number
  setCurrentIndex: (val: number) => void
}

const { width, height } = Dimensions.get("screen")

export const ZoomableItem = ({
  minZoom,
  maxZoom,
  source,
  spacing,
  moveX,
  currentIndex,
  mediaIndex,
  setCurrentIndex,
}: Props) => {
  const [onScale, setOnScale] = useState(false)

  const setScale = (value: boolean) => {
    setOnScale(value)
  }

  const scale = useSharedValue(1)
  //Position expressed in points along X axis of center anchor point of gesture
  const translateX = useSharedValue(0)
  //Position expressed in points along Y axis of center anchor point of gesture
  const translateY = useSharedValue(0)

  const pinchGestureEvent = usePinchGesture(
    scale,
    translateX,
    translateY,
    minZoom,
    maxZoom,
    setScale,
  )
  const parentTranslateX = useSharedValue(0)
  const panCtx = useSharedValue({
    x: 0,
    y: 0,
    parentMoveX: 0,
  })
  const panGestureEvent = Gesture.Pan()
    .onStart((e) => {
      panCtx.value = {
        x: translateX.value,
        y: translateY.value,
        parentMoveX: moveX.value,
      }
    })
    .onChange((e) => {
      const haftWidth = width / 2
      const haftHeight = height/2
      translateX.value = noName(
        panCtx.value.x + e.translationX,
        -(scale.value - 1) * haftWidth,
        (scale.value - 1) * haftWidth,
        parentTranslateX,
        currentIndex,
      )

      moveX.value = panCtx.value.parentMoveX + parentTranslateX.value

      translateY.value = 
      clamp(panCtx.value.y + e.translationY,
        -(scale.value - 1) * haftWidth,
        (scale.value - 1) * haftWidth, )
    })
    .onEnd((e) => {
      const parentMoveX = parentTranslateX.value
      const veX = Math.abs(e.velocityX)
      if (parentMoveX > 0) {
        goBack(parentMoveX, veX, moveX, currentIndex, setCurrentIndex)
      }
      if (parentMoveX < 0) {
        goNext(parentMoveX, veX, moveX, currentIndex, setCurrentIndex)
      }

      parentTranslateX.value = 0
    })

  const singleTap = Gesture.Tap()
    .maxDuration(250)
    .runOnJS(true)
    .onStart(() => {})
  const doubleTap = Gesture.Tap()
    .maxDuration(250)
    .numberOfTaps(2)
    .runOnJS(true)
    .onEnd(() => {
      if (scale.value === 1) {
        // image is not scale
        scale.value = withTiming(2)

        setScale(true)
      } else {
        scale.value = withTiming(1)
        setScale(false)
      }
      translateX.value = withTiming(0)
      translateY.value = withTiming(0)
    })

  const $imageStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: translateX.value,
        },
        {
          translateY: translateY.value,
        },
        {
          scale: scale.value,
        },
      ],
    }
  })

  let gesture = useMemo(() => {
    if (onScale)
      return Gesture.Simultaneous(
        pinchGestureEvent,
        panGestureEvent,
        Gesture.Exclusive(doubleTap, singleTap),
      )
    return Gesture.Simultaneous(pinchGestureEvent, Gesture.Exclusive(doubleTap, singleTap))
  }, [onScale])

  useEffect(() => {
    if (mediaIndex !== currentIndex && onScale) {
      translateX.value = withTiming(0, { duration: 200 })
      translateY.value = withTiming(0, { duration: 200 })
      scale.value = withTiming(1, { duration: 200 })
      setOnScale(false)
    }
  }, [currentIndex])

  return (
    <View style={[$container, { marginLeft: spacing }]}>
      <GestureDetector gesture={gesture}>
        <Animated.Image
          source={source}
          resizeMode="contain"
          style={[
            {
              width: width,
              height: height,
            },
            $imageStyle,
          ]}
        />
      </GestureDetector>
    </View>
  )
}

const usePinchGesture = (
  scale: SharedValue<number>,
  translateX: SharedValue<number>,
  translateY: SharedValue<number>,
  minZoom: number,
  maxZoom: number,
  setScale: (val: boolean) => void,
) => {
  const pinchCtx = useSharedValue({
    scale: 0,
    x: 0,
    y: 0,
    focalX: 0,
    focalY: 0,
  })
  return Gesture.Pinch()
    .onStart((e) => {
      pinchCtx.value = {
        scale: scale.value,
        x: translateX.value,
        y: translateY.value,
        focalX: e.focalX,
        focalY: e.focalY,
      }
    })
    .onChange((e) => {
      if (e.scale >= 1) {
        scale.value = clamp(pinchCtx.value.scale + e.scale - 1, minZoom, maxZoom)
      } else {
        if (pinchCtx.value.scale > 1) {
          // previous zoom > 1 => when zoom to 1 need this formular
          scale.value = clamp(
            pinchCtx.value.scale - pinchCtx.value.scale * (1 - e.scale),
            minZoom,
            maxZoom,
          )
        } else {
          scale.value = clamp(pinchCtx.value.scale - e.scale - 1, minZoom, maxZoom)
        }
      }

      translateX.value = e.focalX - pinchCtx.value.focalX + translateX.value
      translateY.value = e.focalY - pinchCtx.value.focalY + translateY.value
    })
    .onEnd((e) => {
      if (scale.value !== 1) {
        runOnJS(setScale)(true)
      } else {
        runOnJS(setScale)(false)
      }
    })
}

const $container: ViewStyle = {
  justifyContent: "center",
  width: width,
  height: height,
  overflow: "hidden",
}
