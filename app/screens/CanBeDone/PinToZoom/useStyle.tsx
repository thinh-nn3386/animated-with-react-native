import { Dimensions } from "react-native"
import { interpolate, interpolateColor, SharedValue, useAnimatedStyle } from "react-native-reanimated"

const {width, height} = Dimensions.get("screen")

/**
 * Interpolate transparent background when swip down offset.
 * @param isActive return transparent background style
 * @param interpolateOffset interpolateColor by this offset, inputRange: [0, maxOffset]
 * @param color start interpolate color, default: black
 * @param maxOffset 
 * @returns 
 */
export const useBackgroundTransparent = (
  isActive: SharedValue<boolean>,
  interpolateOffset: SharedValue<number>,
  color?: string,
  maxOffset?: number
) => {
  const outPutColor = color || "black"
  return useAnimatedStyle(() => {
    return {
      backgroundColor: isActive.value
        ? "transparent"
        : interpolateColor(interpolateOffset.value, [0, maxOffset || 150], [outPutColor, "transparent"]),
    }
  })
}



export const usePangestureContainerStyle = (
  onVertical: SharedValue<boolean>,
  translateX: SharedValue<number>,
  translateY: SharedValue<number>,
) => {
  return useAnimatedStyle(() => {
    if (!onVertical.value) {
      return {}
    }
    return {
      transform: [
        {
          translateX: translateX.value,
        },
        {
          translateY: translateY.value,
        },
        {
          scale: interpolate(translateY.value, [0, height / 2], [1, 0]),
        },
      ],
    }
  })
}