import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { StackScreenProps } from "@react-navigation/stack"
import { observer } from "mobx-react-lite"
import React from "react"
import { CardTransitionScreen } from "../../screens/Cores/CardTransition/CardTransitionScreen"
import { HeartOfTheMatterScreen } from "../../screens/Cores/HeartOfTheMatter/HeartOfTheMatterScreen"
import { PanGestureScreen } from "../../screens/Cores/PanGesture/PanGestureScreen"

export type CoreStackParamList = {
  HeartOfTheMatter: undefined
  PanGesture: undefined
  Transitions: undefined
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
      <Stack.Screen name="HeartOfTheMatter" component={HeartOfTheMatterScreen} />
      <Stack.Screen name="PanGesture" component={PanGestureScreen} />
      <Stack.Screen name="Transitions" component={CardTransitionScreen} />
    </Stack.Navigator>
  )
})