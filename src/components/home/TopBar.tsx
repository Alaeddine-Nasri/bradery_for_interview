import React from "react";
import { View, Image, Text, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/FontAwesome";

type TopBarProps = {
  current: {
    temp_c: number;
    wind_kph: string;
    humidity: string;
    condition: {
      text: string;
      icon: string;
    };
  };
};

const TopBar: React.FC<TopBarProps> = ({ current }) => {
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
      <TouchableOpacity style={styles.topBarRight}>
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
