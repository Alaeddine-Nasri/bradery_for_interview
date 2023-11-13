import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Image, Text, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/FontAwesome";
import { NavigationKey } from "../../navigation/NavigationKey";

type TopBarProps = {};

const TopBar: React.FC<TopBarProps> = () => {
  const navigation = useNavigation();

  const handleCartPress = () => {
    console.log("changing to panelScreen");
    navigation.navigate(NavigationKey.PanelScreen as never);
  };

  return (
    <View style={styles.topBarContainer}>
      <TouchableOpacity style={styles.topBarLeft}>
        {/* <Image
          source={require("../../../assets/icons/drop.png")}
          style={styles.detailIcon}
        /> */}
        <Icon name="shopping-cart" color={"#203059"} size={30} />
        <Text style={styles.detailText}>Left</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.topBarRight} onPress={handleCartPress}>
        <Icon name="shopping-cart" color={"#203059"} size={30} />
        {/* <Image
          source={require("../../../assets/icons/drop.png")}
          style={styles.detailIcon}
        />
        <Text style={styles.detailText}>Left</Text> */}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  topBarContainer: {
    alignItems: "center",
    flex: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "white",
    paddingVertical: 15,
    paddingHorizontal: 10,
  },
  topBarLeft: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  topBarRight: {
    flexDirection: "row",
    alignItems: "center",
    // marginHorizontal: 10,
  },
  detailIcon: {
    width: 24,
    height: 24,
  },
  detailText: {
    color: "#203059",
    fontWeight: "600",
    fontSize: 16,
  },
});

export default TopBar;
