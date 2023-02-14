import { Dimensions, ImageSourcePropType } from "react-native";
import { Easing, runOnJS, SharedValue, withTiming } from "react-native-reanimated";


const { width, height } = Dimensions.get("screen")
export const SPACING = 16
export const MIN_ZOOM = 1
export const MAX_ZOOM = 10
export const IMAGE: ImageSourcePropType[] = [
  require('../../../../assets/images/landscape/1.jpg'),
  require('../../../../assets/images/landscape/2.jpeg'),
  require('../../../../assets/images/landscape/3.jpg'),
  require('../../../../assets/images/landscape/4.png'),
  require('../../../../assets/images/landscape/5.jpeg'),
  require('../../../../assets/images/landscape/6.jpeg'),
]
export const ITEM_WIDTH = width + SPACING
export const THRESSHOLD = width / 2
export const SWIP_VELOCITY = 1500
export const SWIP_DOWN_TRHESSHOLD = 50


export const noName = (
  value: number,
  lowerBound: number,
  upperBound: number,
  overflow: SharedValue<number>,
  currentIndex: number
) => {
  "worklet";

  const currentDistance = -currentIndex * ITEM_WIDTH
  if (value > upperBound) {
    overflow.value = value - upperBound
  } else if (value < lowerBound) {
    overflow.value = value - lowerBound
  }

  console.log(overflow.value)

  return Math.min(Math.max(lowerBound, value), upperBound);
};



export const goNext = (
  moveX: number,
  veX: number,
  translateX: SharedValue<number>,
  currentIndex: number,
  setCurrentIndex: (val: number) => void
) => {
  "worklet"
  // go next
  if (currentIndex === IMAGE.length - 1) {
    translateX.value = withTiming(-currentIndex * ITEM_WIDTH)
    return
  } else {
    if (veX > SWIP_VELOCITY) {
      const newIndex = currentIndex + 1
      translateX.value = withTiming(-newIndex * ITEM_WIDTH, {
        duration: 200,
        easing: Easing.out(Easing.linear)
      })
      runOnJS(setCurrentIndex)(newIndex)
      return
    }
    if (moveX > -THRESSHOLD) {
      translateX.value = withTiming(-currentIndex * ITEM_WIDTH)
    }
    else {
      const newIndex = currentIndex + 1
      translateX.value = withTiming(-newIndex * ITEM_WIDTH)
      runOnJS(setCurrentIndex)(newIndex)
    }
  }
}

export const goBack = (
  moveX: number,
  veX: number,
  translateX: SharedValue<number>,
  currentIndex: number,
  setCurrentIndex: (val: number) => void
) => {
  "worklet"
  // swip left to right
  // go back
  if (currentIndex === 0) {
    translateX.value = withTiming(0)
    return
  } else {
    if (veX > SWIP_VELOCITY) {
      const newIndex = currentIndex - 1
      translateX.value = withTiming(-newIndex * ITEM_WIDTH, {
        duration: 200,
        easing: Easing.out(Easing.linear)
      })
      runOnJS(setCurrentIndex)(newIndex)
      return
    }
    if (moveX < THRESSHOLD) {
      translateX.value = withTiming(-currentIndex * ITEM_WIDTH)
    }
    else {
      const newIndex = currentIndex - 1
      translateX.value = withTiming(-newIndex * ITEM_WIDTH)
      runOnJS(setCurrentIndex)(newIndex)
    }
  }
}