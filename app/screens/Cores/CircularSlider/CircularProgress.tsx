import React from 'react'
import { StyleSheet } from "react-native";
import Animated, { useAnimatedProps } from "react-native-reanimated";
import Svg, { Circle } from "react-native-svg";


const { PI } = Math;
const AnimatedCircle = Animated.createAnimatedComponent(Circle);

interface CircularProgressProps {
  theta: Animated.SharedValue<number>;
  r: number;
  strokeWidth: number;
  backgroundColor: Animated.SharedValue<string | number>;
}

export const CircularProgress = ({
  theta,
  r,
  strokeWidth,
  backgroundColor,
}: CircularProgressProps) => {
  const radius = r - strokeWidth / 2;
  const circumference = radius * 2 * PI;
  const props = useAnimatedProps(() => {
    return {
      stroke: backgroundColor.value,
      strokeDashoffset: theta.value * radius,
    };
  });
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
      <AnimatedCircle

      // @ts-ignore 
        animatedProps={props}
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
