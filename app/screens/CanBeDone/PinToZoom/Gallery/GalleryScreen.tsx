import {
  NavigationProp,
  NavigatorScreenParams,
  useFocusEffect,
  useNavigation,
} from "@react-navigation/native"
import { StackScreenProps } from "@react-navigation/stack"
import React, { useState } from "react"
import { Dimensions, FlatList, Image, ImageProps, TouchableOpacity, View } from "react-native"
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated"
import { SharedElement } from "react-navigation-shared-element"
import { Screen, Header } from "../../../../components"
import { goBack } from "../../../../navigators"
import { GalleryStackParamList } from "../Stack/GalleryStack"
import { IMAGE } from "../Utils"

export const GalleryScreen = () => {
  const navigation = useNavigation<NavigationProp<GalleryStackParamList>>()
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
              overflow: "hidden",
            }}
          >
            <AnimatedImageTouchable
              navigation={navigation}
              onPress={() => {
                navigation.navigate("MediaViewer", {
                  index,
                })
              }}
              source={item}
              style={{
                flex: 1,
                width: Dimensions.get("screen").width / 3,
                height: Dimensions.get("screen").width / 3,
              }}
              resizeMode="cover"
            />
          </SharedElement>
        )}
      />
    </Screen>
  )
}

const AnimatedImageTouchable = (
  props: ImageProps & { onPress: () => void; navigation: NavigationProp<GalleryStackParamList> },
) => {
  const [opacity, setOpacity] = useState(1)

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
  useFocusEffect(() => {
    if (props.navigation.isFocused()) {
      setOpacity(1)
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
        setOpacity(0)
        props.onPress && props.onPress()
      }}
      style={props.style}
    >
      <Animated.Image {...props} style={[props.style, annimatedSize, { opacity }]} />
    </TouchableOpacity>
  )
}
