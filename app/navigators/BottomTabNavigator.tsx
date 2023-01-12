import React from "react"
import { BottomTabScreenProps, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps} from '@react-navigation/native';
import { CoreScreen } from '../screens/Cores/CoreScreens';
import { AppStackParamList, AppStackScreenProps } from './AppNavigator';
import { CanBeDoneScreen } from "../screens/CanBeDone/CanBeDoneScreen";


export type BottomTabsParamList = {
  CanBeDoneScreen: undefined
  CoreScreen:undefined
}

/**
 * Helper for automatically generating navigation prop types for each route.
 *
 * More info: https://reactnavigation.org/docs/typescript/#organizing-types
 */
export type BottomTabsScreenProps<T extends keyof BottomTabsParamList> = CompositeScreenProps<
  BottomTabScreenProps<BottomTabsParamList, T>,
  AppStackScreenProps<keyof AppStackParamList>
>

const Tab = createBottomTabNavigator<BottomTabsParamList>();

export function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      <Tab.Screen name="CoreScreen" component={CoreScreen} />
      <Tab.Screen name="CanBeDoneScreen" component={CanBeDoneScreen} />
    </Tab.Navigator>
  );
}