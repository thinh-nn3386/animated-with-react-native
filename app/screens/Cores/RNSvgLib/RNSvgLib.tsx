import React from "react"
import { useSharedValue } from "react-native-reanimated"

import { Header, Screen } from "../../../components"
import { goBack } from "../../../navigators"
import Svg, {
  Circle,
  Ellipse,
  G,
  Text,
  TSpan,
  TextPath,
  Path,
  Polygon,
  Polyline,
  Line,
  Rect,
  Use,
  Image,
  Symbol,
  Defs,
  LinearGradient,
  RadialGradient,
  Stop,
  ClipPath,
  Pattern,
  Mask,
  SvgUri,
} from "react-native-svg"



export const RNSvgLibScreen = () => {
  const alpha = useSharedValue(0)
  const path = "M25 10 L98 65 L25 65"
  return (
    <Screen
      preset="scroll"
      safeAreaEdges={["bottom"]}
      header={
        <Header
          leftText="Back"
          onLeftPress={() => goBack()}
          title="React native svg guide"
          style={{
            borderBottomWidth: 1,
            borderBottomColor: "gray",
          }}
        />
      }
     
    >
      <Svg
        height="200"
        width="200"
        stroke="black"
        viewBox="0 0 100 100"
        style={{ backgroundColor: "red" }}
      >
        <Circle cx="50" cy="50" r="45" stroke="blue" strokeWidth="2.5" fill="green" />
        <Rect
          x="15"
          y="15"
          width="70"
          height="70"
          stroke="red"
          strokeWidth="2"
          fill="yellow"
          fillOpacity={0.5}
          rotation={23}
          scale={2}
          origin={[1, 2]}
        />
      </Svg>
      <Svg height="100" width="100">
        <Rect x="0" y="0" width="100" height="100" fill="black" />
        <Circle cx="50" cy="50" r="30" fill="yellow" />
        <Circle cx="40" cy="40" r="4" fill="black" />
        <Circle cx="60" cy="40" r="4" fill="black" />
        <Path d="M 40 60 A 10 10 0 0 0 60 60" stroke="black" />
      </Svg>
      <Svg height="100" width="100">
        <Polyline
          points="10,10 20,12 30,20 40,60 60,70 95,90"
          fill="none"
          stroke="black"
          strokeWidth="3"
        />
      </Svg>

      {/** Path M = moveto
                L = lineto
                H = horizontal lineto
                V = vertical lineto
                C = curveto
                S = smooth curveto
                Q = quadratic Bézier curve
                T = smooth quadratic Bézier curveto
                A = elliptical Arc
                Z = closepath
      */}
      <Svg height="200" width="500">
        <Path d="M25 10 L98 65 L25 65" fill="none" stroke="red" />
      </Svg>
      <Svg height="60" width="200">
        <Text
          fill="none"
          stroke="purple"
          fontSize="20"
          fontWeight="bold"
          x="100"
          y="20"
          textAnchor="middle"
        >
          STROKED TEXT
        </Text>
      </Svg>
      <Svg height="60" width="200">
        <Text
          fill="none"
          stroke="purple"
          fontSize="20"
          fontWeight="bold"
          x="100"
          y="20"
          textAnchor="middle"
        >
          STROKED TEXT
        </Text>
      </Svg>
      <Svg height="100" width="200">
        <Defs>
          <Path id="path" d={path} />
        </Defs>
        <G y="20">
          <Text fill="blue">
            <TextPath href="#path" startOffset="-10%">
              We go up and down,
              <TSpan fill="red" dy="5,5,5">
                then up again
              </TSpan>
            </TextPath>
          </Text>
          <Path d={path} fill="none" stroke="red" strokeWidth="1" />
        </G>
      </Svg>
    </Screen>
  )
}
