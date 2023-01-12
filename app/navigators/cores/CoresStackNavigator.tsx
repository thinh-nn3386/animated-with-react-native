import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { StackScreenProps } from "@react-navigation/stack"
import { observer } from "mobx-react-lite"
import React from "react"
import { HeartOfTheMatterScreen } from "../../screens/Cores/HeartOfTheMatter/HeartOfTheMatterScreen"

export type CoreStackParamList = {
  HeartOfTheMatter: undefined
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
    </Stack.Navigator>
  )
})