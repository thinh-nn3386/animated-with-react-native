import { observer } from "mobx-react-lite"
import React, { FC } from "react"
import { View } from "react-native"
import { Button, Header, Screen, Text } from "../../components"
import { NavigationProp, useNavigation } from "@react-navigation/native"
import { AppStackParamList } from "../../navigators"

export const examples = [
  {
    screen: 'PinToZoom',
    title: "Pin To Zoom RN",
  },
] as const

export const CanBeDoneScreen: FC = observer(function WelcomeScreen() {
  const navigation = useNavigation<NavigationProp<AppStackParamList>>()

  return (
    <Screen
      preset="scroll"
      header={
        <Header
          title="Can Be Done With React Native"
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
          onPress={() => navigation.navigate("CanBeDoneStack", { screen: thumbnail.screen })}
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
