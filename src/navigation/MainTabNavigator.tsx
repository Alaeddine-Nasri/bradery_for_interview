import {
  BottomTabScreenProps,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import { CompositeScreenProps } from "@react-navigation/native";
import { StackScreenProps } from "@react-navigation/stack";
import { StyleSheet } from "react-native";

import { HomeScreen } from "../screens";
import { NavigationKey } from "./NavigationKey";
import { RootStackParamList } from "./RootNavigator";
import { TabIcon } from "../components/navigation/TabIcon";
import React from "react";
import { ProfilScreen } from "../screens/ProfilScreen";
import { FavoriteScreen } from "../screens/FavoriteScreen";
import PanelScreen from "../screens/PanelScreen";
import AuthScreen from "../screens/AuthScreen";

export type MainTabParamList = {
  [NavigationKey.HomeScreen]: undefined;
  [NavigationKey.FavoriteScreen]: undefined;
  [NavigationKey.ProfilScreen]: undefined;
  [NavigationKey.PanelScreen]: undefined;
  [NavigationKey.AuthScreen]: undefined;
};

type MainTabScreenProps = CompositeScreenProps<
  StackScreenProps<RootStackParamList, NavigationKey.MainTabNavigator>,
  BottomTabScreenProps<MainTabParamList>
>;

const Tab = createBottomTabNavigator<MainTabParamList>();
export const MainTabNavigator: React.FC<MainTabScreenProps> = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarShowLabel: false,
        headerShown: false,
        tabBarIcon: (props) => <TabIcon {...props} route={route} />,
        tabBarStyle: styles.tabBar,
      })}
      initialRouteName={NavigationKey.AuthScreen}
    >
      {/* <Tab.Screen name={NavigationKey.AuthScreen} component={AuthScreen} /> */}
      <Tab.Screen name={NavigationKey.HomeScreen} component={HomeScreen} />
      <Tab.Screen
        name={NavigationKey.FavoriteScreen}
        component={FavoriteScreen}
      />
      <Tab.Screen name={NavigationKey.PanelScreen} component={PanelScreen} />
      <Tab.Screen name={NavigationKey.ProfilScreen} component={ProfilScreen} />
    </Tab.Navigator>
  );
};
const styles = StyleSheet.create({
  tabBar: {
    elevation: 0,
    borderTopWidth: 0,
  },
});
