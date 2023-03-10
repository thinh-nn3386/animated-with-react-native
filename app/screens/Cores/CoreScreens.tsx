import { observer } from "mobx-react-lite"
import React, { FC } from "react"
import { View } from "react-native"
import { Button, Header, Screen, Text } from "../../components"
import { NavigationProp, useNavigation } from "@react-navigation/native"
import { AppStackParamList } from "../../navigators"

export const examples = [
  {
    screen: 'RNSvgLi',
    title: "π Learn React Native Svg lib",
  },
  {
    screen: "HeartOfTheMatter",
    title: "π The Heart of the Matter",
  },
  {
    screen: "PanGesture",
    title: "π³ PanGesture",
  },
  {
    screen: "Transitions",
    title: "π Transitions",
  },
  {
    screen: "HigherAnimation",
    title: "π HigherAnimation",
  },
  {
    screen: "CircularSlider",
    title: "β­οΈ Circular Slider",
  },
  // {
  //   screen: "Graph",
  //   title: "π Graph Interactions",
  // },
  // {
  //   screen: "DynamicSpring",
  //   title: "π¨βπ¬ Dynamic Spring",
  // },
  {
    screen: "DragToSort",
    title: "π€ Drag To Sort",
  },
  // {
  //   screen: "Swiping",
  //   title: "π Swiping",
  // },
  // {
  //   screen: "Bezier",
  //   title: "β€΄οΈ BΓ©zier",
  // },
  {
    screen: "ShapeMorphing",
    title: "βΊοΈ Shape Morphing",
  },
  // {
  //   screen: "Accordion",
  //   title: "πΊ Accordion",
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
