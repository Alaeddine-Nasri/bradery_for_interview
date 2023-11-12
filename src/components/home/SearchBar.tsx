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
import { colors } from "../../theme/sizes";

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
    <TouchableOpacity
      style={styles.searchContainer}
      onPress={() => toggleSearch(!showSearch)}
    >
      <View style={styles.searchInputContainer}>
        {showSearch ? (
          <TextInput
            onChangeText={(text) => handleTextDebouce(text)}
            placeholder="Search Product.."
            placeholderTextColor={"lightgray"}
            style={styles.searchInput}
          />
        ) : null}

        <TouchableOpacity
          onPress={() => toggleSearch(!showSearch)}
          style={styles.searchIconContainer}
        >
          <MagnifyingGlassIcon size={25} color={colors.maincolor} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    height: "auto",
    marginVertical: 10,
    zIndex: 2,
  },
  searchInputContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: theme.bgWhite("0.2"),
  },
  searchInput: {
    paddingLeft: 6,
    height: 40,
    flex: 1,
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
  searchIconContainer: {
    backgroundColor: theme.bgWhite("0.2"),
    borderRadius: 10,
    padding: 8,
    margin: 1,
  },
});

export default SearchBar;
