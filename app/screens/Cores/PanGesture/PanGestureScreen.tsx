import React from "react"
import { useWindowDimensions } from "react-native"
import { PanGestureHandler, PanGestureHandlerGestureEvent } from "react-native-gesture-handler"
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withDecay,
} from "react-native-reanimated"
import { Card, Cards, CARD_HEIGHT, CARD_WIDTH, Header, Screen } from "../../../components"
import { goBack } from "../../../navigators"

export const PanGestureScreen = () => {
  const { width, height } = useWindowDimensions()
  const x = useSharedValue(0)
  const y = useSharedValue(0)

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
      x.value = context.offsetX + event.translationX
      y.value = context.offsetY + event.translationY
    },
    onEnd(event, context) {
      x.value = withDecay({
        velocity: event.velocityX,
        clamp: [0, width - CARD_WIDTH],
      })
      y.value = withDecay({
        velocity: event.velocityY,
        clamp: [0, height - CARD_HEIGHT],
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
