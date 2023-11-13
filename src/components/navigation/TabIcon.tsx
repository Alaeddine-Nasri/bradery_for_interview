import { View, StyleSheet } from "react-native";
// import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Icon from "react-native-vector-icons/FontAwesome";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

import { NavigationKey } from "../../navigation/NavigationKey";
import { sizes } from "../../theme/sizes";
import React from "react";

interface Props {
  focused: boolean;
  color: string;
  size: number;
  route: { name: string };
}

const iconMapper: { [key: string]: string } = {
  [NavigationKey.HomeScreen]: "home",
  [NavigationKey.FavoriteScreen]: "heart-o",
  [NavigationKey.PanelScreen]: "home",
  [NavigationKey.ProfilScreen]: "user",
};

export const TabIcon: React.FC<Props> = ({
  focused = false,
  color,
  size,
  route,
}) => {
  return (
    <View style={[styles.tab, focused && styles.tabFocused]}>
      <Icon name={iconMapper[route.name]} color={color} size={size} />
      {/* <FontAwesomeIcon icon="square-check" /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  tab: {
    alignItems: "center",
    justifyContent: "center",
    padding: sizes.s,
  },
  tabFocused: {
    //backgroundColor: colors.lightgray,
  },
});
