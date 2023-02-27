import React, { useState } from "react"
import { Dimensions, ViewStyle } from "react-native"
import Animated, {
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated"
import { PanGestureHandler, PanGestureHandlerGestureEvent } from "react-native-gesture-handler"
import { clamp } from "react-native-redash"
import { ZoomableItem } from "./ZoomableItem"
import {
  goBack,
  goNext,
  IMAGE,
  ITEM_WIDTH,
  MAX_ZOOM,
  MIN_ZOOM,
  SPACING,
  SWIP_DOWN_TRHESSHOLD,
} from "./Utils"
import { SharedElement } from "react-navigation-shared-element"
import { NavigationProp, RouteProp, useNavigation, useRoute } from "@react-navigation/native"
import { GalleryStackParamList } from "./Stack/GalleryStack"
import { Header } from "../../../components"
import { useBackgroundTransparent, usePangestureContainerStyle } from "./useStyle"

const { width, height } = Dimensions.get("screen")

export const PinToZoomScreen = () => {
  const navigation = useNavigation<NavigationProp<GalleryStackParamList>>()
  const route = useRoute<RouteProp<GalleryStackParamList, "MediaViewer">>()
  const initIndex = route.params.index || 0

  const [currentIndex, setCurrentIndex] = useState(initIndex)
  const moveX = useSharedValue(-initIndex * ITEM_WIDTH)
  const translateX = useSharedValue(0)
  const translateY = useSharedValue(0)
  const onGoBack = useSharedValue(false)
  const onVertical = useSharedValue(false)
  const onHorizontal = useSharedValue(false)

  const navigateBack = () => navigation.navigate("Gallery")

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
    },
    onActive(event, context) {
      if (
        !onHorizontal.value &&
        !onVertical.value &&
        (Math.abs(event.translationX) > 10 || Math.abs(event.translationY) > 10)
      ) {
        if (Math.abs(event.translationX) > event.translationY) {
          onHorizontal.value = true
        } else {
          onVertical.value = true
        }
      } else {
        if (onHorizontal.value && !onVertical.value && translateY.value === 0) {
          moveX.value = event.translationX + context.moveX
        }

        if (onVertical.value && !onHorizontal.value) {
          translateY.value = event.translationY + context.y
          translateX.value = event.translationX + context.x
        }
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
        onHorizontal.value = false
      }

      if (onVertical.value) {
        if (translateY.value > SWIP_DOWN_TRHESSHOLD) {
          onGoBack.value = true
          runOnJS(navigateBack)()
        } else {
          moveX.value = context.moveX
          translateX.value = withSpring(0, { velocity: event.velocityX })
          translateY.value = withSpring(0, { velocity: event.velocityX }, () => {
            onVertical.value = false
          })
        }
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

  const $containerAnim = usePangestureContainerStyle(onVertical, translateX, translateY)
  const $background = useBackgroundTransparent(onGoBack, translateY)

  return (
    <Animated.View style={[$container, $background]}>
      <Header onLeftPress={navigateBack} leftText="Back" />
      <Animated.View style={[$container, $containerAnim]}>
        <PanGestureHandler onGestureEvent={panGestureHandler}>
          <Animated.View style={[$mediaContainer, $containerTransform]}>
            {IMAGE.map((source, index) => (
              <SharedElement key={index} id={`image.${index}`}>
                <ZoomableItem
                  mediaIndex={index}
                  spacing={index !== 0 ? SPACING : 0}
                  minZoom={MIN_ZOOM}
                  maxZoom={MAX_ZOOM}
                  source={source}
                  moveX={moveX}
                  currentIndex={currentIndex}
                  setCurrentIndex={setCurrentIndex}
                />
              </SharedElement>
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
