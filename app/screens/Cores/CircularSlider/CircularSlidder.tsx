import React from "react"
import { Dimensions, PixelRatio, StyleSheet, View } from "react-native"
import Animated, {
  interpolateColor,
  useDerivedValue,
  useSharedValue,
} from "react-native-reanimated"
import { canvas2Polar } from "react-native-redash"

import { Header, Screen } from "../../../components"
import { goBack } from "../../../navigators"
import { CircularProgress } from "./CircularProgress"
import { Cursor } from "./Cursor"

const { width } = Dimensions.get("window")
const size = width - 32
const STROKE_WIDTH = 40
const r = PixelRatio.roundToNearestPixel(size / 2)

const defaultTheta = canvas2Polar({ x: 0, y: 0 }, { x: r, y: r }).theta

export const CircularSliderScreen = () => {
  const theta = useSharedValue(defaultTheta)
  const backgroundColor = useDerivedValue(() => {
    return interpolateColor(theta.value, [0, Math.PI, Math.PI * 2], ["#ff3884", "blue", "#38ffb3"])
  })
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
      backgroundColor="gray"
      contentContainerStyle={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View style={{ width: r * 2, height: r * 2}}>
        <Animated.View style={StyleSheet.absoluteFill}>
        <CircularProgress
            backgroundColor={backgroundColor}
            strokeWidth={STROKE_WIDTH}
            {...{ r }}
            {...{ theta }}
          />
        </Animated.View>
        <Cursor
          strokeWidth={STROKE_WIDTH}
          r={r - STROKE_WIDTH / 2}
          backgroundColor={backgroundColor}
          {...{ theta }}
        />
      </View>
    </Screen>
  )
}
