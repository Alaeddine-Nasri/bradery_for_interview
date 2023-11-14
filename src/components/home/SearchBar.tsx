import React from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";
import { MagnifyingGlassIcon } from "react-native-heroicons/solid";
import { theme } from "../../theme";
import { colors } from "../../theme/colors";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";
import { NavigationKey } from "../../navigation/NavigationKey";

type SearchBarProps = {
  showSearch: boolean;
  toggleSearch: (show: boolean) => void;
  handleTextDebouce: (text: string) => void;
};

const SearchBar: React.FC<SearchBarProps> = ({
  showSearch,
  toggleSearch,
  handleTextDebouce,
}) => {
  const navigation = useNavigation();

  const handleCartPress = () => {
    console.log("changing to panelScreen");
    navigation.navigate(NavigationKey.PanelScreen as never);
  };
  return (
    <View style={styles.topBarContainer}>
      <TouchableOpacity
        style={styles.searchContainer}
        onPress={() => toggleSearch(!showSearch)}
      >
        <View style={styles.searchInputContainer}>
          <TouchableOpacity
            onPress={() => toggleSearch(!showSearch)}
            style={styles.searchIconContainer}
          >
            <MagnifyingGlassIcon size={25} color={colors.maincolor} />
          </TouchableOpacity>
          {/* {!showSearch ? ( */}
          <TextInput
            onChangeText={(text) => handleTextDebouce(text)}
            placeholder="Search Product.."
            placeholderTextColor={colors.maincolor}
            style={styles.searchInput}
          ></TextInput>
          {/* ) : null} */}
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={handleCartPress}
        style={styles.shodowContainer}
      >
        <Icon name="shopping-cart" color={colors.maincolor} size={25} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  topBarContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
  },
  searchContainer: {
    width: "82%",
    height: "auto",
    marginVertical: 10,
    zIndex: 2,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
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
  searchInputContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    borderRadius: 10,
    padding: 5,
    backgroundColor: "#FFF",
  },
  searchInput: {
    paddingLeft: 6,
    height: 40,
    flex: 1,
    fontSize: 16,
    fontWeight: "bold",
    color: colors.maincolor,
  },
  searchIconContainer: {
    backgroundColor: theme.bgWhite("0.2"),
    borderRadius: 10,
    padding: 8,
    margin: 1,
  },
});

export default SearchBar;
