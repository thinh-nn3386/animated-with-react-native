import { useFocusEffect, useNavigation } from "@react-navigation/native"
import React, { useState } from "react"
import { FlatList, Image, ImageProps, TouchableOpacity, View } from "react-native"
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated"
import { SharedElement } from "react-navigation-shared-element"
import { Screen, Header } from "../../../../components"
import { goBack } from "../../../../navigators"
import { IMAGE } from "../Utils"

export const GalleryScreen = () => {
  const navigation = useNavigation()
  const [selectIndex, setSelectIndex] = useState<undefined | number>(undefined)

  useFocusEffect(() => {
    setSelectIndex(undefined)
  })

  return (
    <Screen
      preset="fixed"
      safeAreaEdges={["bottom"]}
      header={
        <Header
          leftText="Back"
          onLeftPress={goBack}
          title="Gallery"
          style={{
            borderBottomWidth: 1,
            borderBottomColor: "gray",
          }}
        />
      }
      contentContainerStyle={{
        flex: 1,
      }}
    >
      <FlatList
        data={IMAGE}
        keyExtractor={(_, index) => index.toString()}
        numColumns={3}
        ItemSeparatorComponent={() => <View style={{ height: 1 }} />}
        renderItem={({ item, index }) => (
          <SharedElement
            id={`image.${index}`}
            style={{
              flex: 1 / 3,
            }}
          >
            <AnimatedImageTouchable
              onPress={() => {
                setSelectIndex(index)
                navigation.navigate("MediaViewer", {
                  index,
                })
              }}
              source={item}
              style={{
                flex: 1,
                overflow: "hidden",
                width: 200,
                height: 200,
                opacity: selectIndex === index ? 0 : 1
              }}
            />
          </SharedElement>
        )}
      />
    </Screen>
  )
}

const AnimatedImageTouchable = (props: ImageProps & { onPress: () => void }) => {
  const size = useSharedValue(1)
  const annimatedSize = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: size.value,
        },
      ],
    }
  })
  return (
    <TouchableOpacity
      activeOpacity={1}
      onPressIn={() => {
        size.value = withSpring(0.9)
      }}
      onPressOut={() => {
        size.value = withSpring(1)
        props.onPress && props.onPress()
      }}
      style={props.style}
    >
      <Animated.Image {...props} style={[props.style, annimatedSize]} />
    </TouchableOpacity>
  )
}
