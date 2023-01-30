import React from "react"
import { useWindowDimensions } from "react-native"
import { PanGestureHandler, PanGestureHandlerGestureEvent } from "react-native-gesture-handler"
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withDecay,
} from "react-native-reanimated"
import {
  Card,
  Cards,
  CARD_HEIGHT,
  CARD_WIDTH,
  Header,
  HEADER_HEIGHT,
  Screen,
} from "../../../components"
import { goBack } from "../../../navigators"
import { clamp, withBouncing } from "react-native-redash"
import { useSafeAreaInsets } from "react-native-safe-area-context"

export const PanGestureScreen = () => {
  const bottomInsets = useSafeAreaInsets().bottom
  const { width, height } = useWindowDimensions()
  const x = useSharedValue(0)
  const y = useSharedValue(0)
  const boundX = width - CARD_WIDTH
  const boundY = height - CARD_HEIGHT - HEADER_HEIGHT - bottomInsets * 2
  const panGesture = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    {
      offsetX: number
      offsetY: number
    }
  >({
    onStart(event, context) {
      context.offsetX = x.value
      context.offsetY = y.value
    },
    onActive(event, context) {
      x.value = clamp(context.offsetX + event.translationX, 0, boundX) //Clamps a node with a lower and upper bound.
      y.value = clamp(context.offsetY + event.translationY, -HEADER_HEIGHT, boundY)
    },
    onEnd(event, context) {
      x.value = withBouncing( withDecay({
        velocity: event.velocityX,
        // clamp: [0, boundX],
        velocityFactor: 0.5,
      }), 0, boundX)
      y.value = withDecay({
        velocity: event.velocityY,
        clamp: [-HEADER_HEIGHT, boundY],
        velocityFactor: 0.5,
      })
    },
  })

  const $translateStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: x.value,
        },
        {
          translateY: y.value,
        },
      ],
    }
  })
  return (
    <Screen
      preset="fixed"
      header={
        <Header
          title="Pan Gesture "
          leftText="Back"
          onLeftPress={() => {
            goBack()
          }}
          style={{
            borderBottomWidth: 1,
            borderBottomColor: "gray",
          }}
        />
      }
      contentContainerStyle={{
        flex: 1,
      }}
    >
      <PanGestureHandler onGestureEvent={panGesture}>
        <Animated.View style={$translateStyle}>
          <Card card={Cards.Card1} />
        </Animated.View>
      </PanGestureHandler>
    </Screen>
  )
}
