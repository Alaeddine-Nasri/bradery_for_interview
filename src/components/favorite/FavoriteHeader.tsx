import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { colors } from "../../theme/colors";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";
import { NavigationKey } from "../../navigation/NavigationKey";

interface FavoriteHeaderProps {
  title: string;
  description: string;
}

const FavoriteHeader: React.FC<FavoriteHeaderProps> = ({
  title,
  description,
}) => {
  const navigation = useNavigation();

  const handleCartPress = () => {
    console.log("changing to panelScreen");
    navigation.navigate(NavigationKey.HomeScreen as never);
  };
  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity
        onPress={handleCartPress}
        style={styles.shodowContainer}
      >
        <Icon name="chevron-left" color={colors.maincolor} size={25} />
      </TouchableOpacity>
      <View>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
      <TouchableOpacity style={styles.shodowContainer2}></TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: -30,
    padding: 16,
    // backgroundColor: "#3498db", // You can customize the background color
  },
  shodowContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "15%",
    height: 50,
    marginVertical: 10,
    zIndex: 2,
    borderRadius: 10,
    padding: 5,
    backgroundColor: "#FFF",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 2,
  },
  shodowContainer2: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "15%",
    height: 50,
    marginVertical: 10,
    zIndex: 2,
    borderRadius: 10,
    padding: 5,
    // display: "none",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    color: colors.maincolor, // You can customize the text color
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    color: colors.maincolor, // You can customize the text color
  },
});

export default FavoriteHeader;
