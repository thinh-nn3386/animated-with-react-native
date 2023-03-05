import React from 'react'
import { Dimensions, View, ViewStyle } from 'react-native'
import { Card, Cards, CARD_HEIGHT, Header, Screen } from '../../../components'
import { goBack } from '../../../navigators'
import { SortableList } from './SortableList'


const { width } = Dimensions.get("window");
const cards = [Cards.Card1, Cards.Card2, Cards.Card3];

const $cardStyle: ViewStyle = {
  height: CARD_HEIGHT,
  width: "100%",
  alignItems: "center",
  marginTop: 32,
}

export const DragToSortScreen = () => {

  return (
    <Screen
      preset="fixed"
      safeAreaEdges={["bottom"]}
      header={
        <Header
          leftText="Back"
          onLeftPress={() => goBack()}
          title="DragToSort"
          style={{
            borderBottomWidth: 1,
            borderBottomColor: "gray",
          }}
        />
      }
    >
      <SortableList item={{ width, height: CARD_HEIGHT + 32 }}>
        {cards.map((card, index) => (
          <View style={$cardStyle} key={index}>
            <Card card={card} />
          </View>
        ))}
      </SortableList>
    </Screen>
  )
}