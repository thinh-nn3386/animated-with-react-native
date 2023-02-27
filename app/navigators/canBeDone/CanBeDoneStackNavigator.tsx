import { NavigatorScreenParams } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { StackScreenProps } from "@react-navigation/stack"
import { observer } from "mobx-react-lite"
import React from "react"
import { GalleryStack, GalleryStackParamList } from "../../screens/CanBeDone/PinToZoom/Stack/GalleryStack"

export type CanBeDoneStackParamList = {
  PinToZoom: NavigatorScreenParams<GalleryStackParamList>
}

export type CoreStackScreenProps<T extends keyof CanBeDoneStackParamList> = StackScreenProps<
CanBeDoneStackParamList,
  T
>

const Stack = createNativeStackNavigator<CanBeDoneStackParamList>()

export const CanBeDoneStack = observer(function CoreStack() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="PinToZoom"
    >
      <Stack.Screen name="PinToZoom" component={GalleryStack} />
    </Stack.Navigator>
  )
})