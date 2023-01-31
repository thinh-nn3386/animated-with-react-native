import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { StackScreenProps } from "@react-navigation/stack"
import { observer } from "mobx-react-lite"
import React from "react"
import { CardTransitionScreen } from "../../screens/Cores/CardTransition/CardTransitionScreen"
import { CircularSliderScreen } from "../../screens/Cores/CircularSlider/CircularSlidder"
import { HeartOfTheMatterScreen } from "../../screens/Cores/HeartOfTheMatter/HeartOfTheMatterScreen"
import { HigherOrderAnimationScreen } from "../../screens/Cores/HigerOrderAnimation/HigherOrderAnimation"
import { PanGestureScreen } from "../../screens/Cores/PanGesture/PanGestureScreen"
import { RNSvgLibScreen } from "../../screens/Cores/RNSvgLib/RNSvgLib"
import { ShapeMorphingScreen } from "../../screens/Cores/ShapeMorphing/ShapeMorphing"

export type CoreStackParamList = {
  RNSvgLi: undefined
  HeartOfTheMatter: undefined
  PanGesture: undefined
  Transitions: undefined
  HigherAnimation: undefined
  CircularSlider: undefined
  ShapeMorphing: undefined
}

export type CoreStackScreenProps<T extends keyof CoreStackParamList> = StackScreenProps<
  CoreStackParamList,
  T
>

const Stack = createNativeStackNavigator<CoreStackParamList>()

export const CoreStack = observer(function CoreStack() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="RNSvgLi" component={RNSvgLibScreen} />
      <Stack.Screen name="HeartOfTheMatter" component={HeartOfTheMatterScreen} />
      <Stack.Screen name="PanGesture" component={PanGestureScreen} />
      <Stack.Screen name="Transitions" component={CardTransitionScreen} />
      <Stack.Screen name="HigherAnimation" component={HigherOrderAnimationScreen} />
      <Stack.Screen name="CircularSlider" component={CircularSliderScreen} />
      <Stack.Screen name="ShapeMorphing" component={ShapeMorphingScreen} />
    </Stack.Navigator>
  )
})