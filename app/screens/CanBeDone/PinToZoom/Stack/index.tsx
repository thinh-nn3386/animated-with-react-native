import React from "react"
import { NavigationContainer } from "@react-navigation/native"
import { createSharedElementStackNavigator } from "react-navigation-shared-element"
import { StackScreenProps } from "@react-navigation/stack"
import { PinToZoomScreen } from "../PinToZoomScreen"
import { GalleryScreen } from "../Gallery/GalleryScreen"

export type CoreStackParamList = {
  Gallery: undefined
  MediaViewer: {
    index: number
  }
}

const Stack = createSharedElementStackNavigator<CoreStackParamList>()

export const GalleryStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Gallery">
      <Stack.Screen name="Gallery" component={GalleryScreen} />
      <Stack.Screen
        name="MediaViewer"
        component={PinToZoomScreen}
        options={{
          presentation: "transparentModal"
        }}
        sharedElements={(route, otherRoute, showing) => {
          const { index } = route.params
          return [`image.${index}`]
        }}
      />
    </Stack.Navigator>
  )
}
