import { observer } from "mobx-react-lite"
import React, { FC } from "react"
import { View } from "react-native"
import { Button, Header, Screen, Text } from "../../components"
import { NavigationProp, useNavigation } from "@react-navigation/native"
import { CoreStackParamList } from "../../navigators/cores/CoresStackNavigator"
import { BottomTabsParamList } from "../../navigators/BottomTabNavigator"
import { AppStackParamList } from "../../navigators"

export const examples = [
  {
    screen: "HeartOfTheMatter",
    title: "💚 The Heart of the Matter",
  },
  // {
  //   screen: "Worklets",
  //   title: "👩‍🏭 Worklets",
  // },
  // {
  //   screen: "Transitions",
  //   title: "🔁 Transitions",
  // },
  // {
  //   screen: "PanGesture",
  //   title: "💳 PanGesture",
  // },
  // {
  //   screen: "Animations",
  //   title: "🐎 Animations",
  // },
  // {
  //   screen: "CircularSlider",
  //   title: "⭕️ Circular Slider",
  // },
  // {
  //   screen: "Graph",
  //   title: "📈 Graph Interactions",
  // },
  // {
  //   screen: "DynamicSpring",
  //   title: "👨‍🔬 Dynamic Spring",
  // },
  // {
  //   screen: "DragToSort",
  //   title: "📤 Drag To Sort",
  // },
  // {
  //   screen: "Swiping",
  //   title: "💚 Swiping",
  // },
  // {
  //   screen: "Bezier",
  //   title: "⤴️ Bézier",
  // },
  // {
  //   screen: "ShapeMorphing",
  //   title: "☺️ Shape Morphing",
  // },
  // {
  //   screen: "Accordion",
  //   title: "🗺 Accordion",
  // },
] as const

export const CoreScreen: FC = observer(function WelcomeScreen() {
  const navigation = useNavigation<NavigationProp<AppStackParamList>>()

  return (
    <Screen
      preset="scroll"
      header={
        <Header
          title="The Heart of The Matter"
          style={{
            borderBottomWidth: 1,
            borderBottomColor: "gray",
          }}
        />
      }
    >
      {examples.map((thumbnail) => (
        <Button
          key={thumbnail.screen}
          onPress={() => navigation.navigate("CoreStack", { screen: thumbnail.screen })}
          style={{
            borderTopWidth: 0
          }}
        >
          <View>
            <Text>{thumbnail.title}</Text>
          </View>
        </Button>
      ))}
    </Screen>
  )
})
