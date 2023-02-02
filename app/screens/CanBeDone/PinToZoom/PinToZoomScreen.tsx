import React from 'react'
import {Screen} from '../../../components/Screen'
import { Image, View, ViewStyle } from 'react-native'


export const PinToZoomScreen = () => {
  
  return (
    <View style={$container}>
      <Image
        resizeMode='contain'
        source={require('./image.jpeg')}
        style={{
          maxWidth: "100%"
        }}
      />
    </View>      
  )
}


const $container: ViewStyle = {
  flex: 1, 
  justifyContent: "center",
  alignItems: "center"
}