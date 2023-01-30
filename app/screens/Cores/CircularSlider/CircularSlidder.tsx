import React from "react"
import { Dimensions, PixelRatio, StyleSheet, View } from "react-native"
import Animated, { useSharedValue } from "react-native-reanimated"

import { Header, Screen } from "../../../components"
import { goBack } from "../../../navigators"
import { CircularProgress } from "./CircularProgress"
import { Cursor } from "./Cursor"

const { width } = Dimensions.get("window")
const size = width - 32
const STROKE_WIDTH = 40
const r = PixelRatio.roundToNearestPixel(size / 2)

export const CircularSliderScreen = () => {
  const alpha = useSharedValue(0)

  return (
    <Screen
      preset="fixed"
      safeAreaEdges={["bottom"]}
      header={
        <Header
          leftText="Back"
          onLeftPress={() => goBack()}
          title="Circuler slider"
          style={{
            borderBottomWidth: 1,
            borderBottomColor: "gray",
          }}
        />
      }
      contentContainerStyle={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View style={{ width: r * 2, height: r * 2 }}>
        <Animated.View style={StyleSheet.absoluteFill}>
          <CircularProgress strokeWidth={STROKE_WIDTH} {...{ alpha, r }} />
        </Animated.View>
        <Cursor strokeWidth={STROKE_WIDTH} r={r - STROKE_WIDTH / 2} />
      </View>
    </Screen>
  )
}
