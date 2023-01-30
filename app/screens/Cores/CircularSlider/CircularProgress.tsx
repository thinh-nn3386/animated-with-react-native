import React from 'react'
import { StyleSheet } from "react-native";
import type Animated from "react-native-reanimated";
import Svg, { Circle } from "react-native-svg";


const { PI } = Math;

interface CircularProgressProps {
  alpha: Animated.SharedValue<number>;
  r: number;
  strokeWidth: number;
}

export const CircularProgress = ({ r, strokeWidth }: CircularProgressProps) => {
  const radius = r - strokeWidth / 2;
  const circumference = radius * 2 * PI;
  return (
    <Svg style={StyleSheet.absoluteFill}>
      <Circle
        cx={r}
        cy={r}
        fill="transparent"
        stroke="white"
        r={radius}
        {...{ strokeWidth }}
      />
      <Circle
        cx={r}
        cy={r}
        fill="transparent"
        r={radius}
        stroke={"blue"}
        strokeDasharray={`${circumference}, ${circumference}`}
        {...{ strokeWidth }}
      />
    </Svg>
  );
};
