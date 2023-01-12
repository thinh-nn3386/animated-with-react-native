import { useNavigation } from "@react-navigation/native"
import { observer } from "mobx-react-lite"
import React from "react"
import { StyleProp, ViewStyle } from "react-native"
import { PanGestureHandler, PanGestureHandlerGestureEvent } from "react-native-gesture-handler"
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated"
import { Header, Screen } from "../../../components"
import { goBack } from "../../../navigators"

export const HeartOfTheMatterScreen = observer(function HeartOfTheMatterScreen() {
  const x = useSharedValue(0)
  const y = useSharedValue(0)

  
  const gestureHandler = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    { x: number; y: number }
  >({
    onStart: (_, ctx) => {
      ctx.x = x.value
      ctx.y = y.value
    },
    onActive: (event, ctx) => {
      x.value = ctx.x + event.translationX
      y.value = ctx.y + event.translationY

      console.log(x.value, y.value)
    },
    onEnd: (_) => {
      const newX = x.value
      const newY = y.value
      x.value = withSpring(newX)
      y.value = withSpring(newY)
    },
  })

  const $animatedStyle = useAnimatedStyle(() => {
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
          title="The Heart of The Matter"
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
      <PanGestureHandler onGestureEvent={gestureHandler}>
        <Animated.View style={[$boxStyle, $animatedStyle]} />
      </PanGestureHandler>
    </Screen>
  )
})

const $boxStyle: StyleProp<ViewStyle> = {
  width: 100,
  height: 100,
  borderRadius: 50,
  backgroundColor: "blue",
}
