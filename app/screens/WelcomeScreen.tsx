import { NavigationProp, useNavigation } from "@react-navigation/native"
import { observer } from "mobx-react-lite"
import React, { FC } from "react"
import { Button, Screen, Text } from "../components"
import { SvgImages } from "../constant/SvgASssets"
import { AppStackParamList } from "../navigators"


export const WelcomeScreen: FC = observer(function WelcomeScreen() {
  const navigation = useNavigation<NavigationProp<AppStackParamList>>()

  return (
    <Screen
      preset="fixed"
      safeAreaEdges={["top", "bottom"]}
      contentContainerStyle={{
        flex: 1,
      }}
    >
        <SvgImages.Intro width={"100%"} height={"50%"} />
        <Text testID="welcome-heading" tx="welcomeScreen.readyForLaunch" preset="heading" />
        <Text tx="welcomeScreen.exciting" preset="subheading" />

      <Button
        text="Start"
        onPress={() => {
          navigation.navigate("BottomTab")
        }}
      />
    </Screen>
  )
})
