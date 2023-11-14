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
      <View style={styles.PanelContainer}>
        <Icon name="shopping-cart" color={colors.breakcolor} size={25} />
      </View>
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
  },
  PanelContainer: {
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
