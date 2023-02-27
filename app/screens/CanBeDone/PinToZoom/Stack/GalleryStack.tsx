import React from "react"
import { NavigationContainer } from "@react-navigation/native"
import { createSharedElementStackNavigator } from "react-navigation-shared-element"
import { StackScreenProps, TransitionPresets } from "@react-navigation/stack"
import { PinToZoomScreen } from "../PinToZoomScreen"
import { GalleryScreen } from "../Gallery/GalleryScreen"

export type GalleryStackParamList = {
  Gallery: undefined
  MediaViewer: {
    index: number
  }
}

const Stack = createSharedElementStackNavigator<GalleryStackParamList>()

export const GalleryStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: false,
        cardOverlayEnabled: false,
        cardStyle: {
          backgroundColor: "transparent",
        },
      }}
      initialRouteName="Gallery"
    >
      <Stack.Screen name="Gallery" component={GalleryScreen} />
      <Stack.Screen
        name="MediaViewer"
        component={PinToZoomScreen}
        options={{
          presentation: "modal",
          detachPreviousScreen: false,
          cardStyle: {
            backgroundColor: "transparent",
          },
          cardStyleInterpolator: ({ current: { progress } }) => ({
            cardStyle: {
              opacity: progress,
              backgroundColor: "transparent",
            },
          }),
        }}
        sharedElements={(route, otherRoute, showing) => {
          const { index } = route.params
          return [
            {
              id: `image.${index}`,
              animation: "move",
              resize: "clip",
            },
          ]
        }}
      />
    </Stack.Navigator>
  )
}
