// Filtre.tsx
import React, { useState } from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { colors } from "../../theme/colors";

interface FiltreProps {
  onFilterPress: (filter: string) => void;
  selectedFilter: string;
}

const Filtre: React.FC<FiltreProps> = ({ onFilterPress, selectedFilter }) => {
  const filters = ["Best Match", "New Arrival", "Trendy", "Promotion"];

  return (
    <View>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Products</Text>
        <Text style={styles.viewMore}>See More</Text>
      </View>
      <View style={styles.ProductFilters}>
        {filters.map((filter) => (
          <TouchableOpacity
            key={filter}
            onPress={() => onFilterPress(filter)}
            style={[
              styles.filterItem,
              selectedFilter === filter && styles.selectedFilter,
            ]}
          >
            <Text
              style={[
                styles.filtreText,
                selectedFilter === filter && styles.selectedFilterText,
              ]}
            >
              {filter}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  ProductFilters: {
    padding: 2,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "white",
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  title: {
    color: colors.maincolor,
    fontWeight: "600",
    fontSize: 20,
  },
  viewMore: {
    color: colors.breakcolor,
    textDecorationLine: "underline",
    fontSize: 15,
  },
  filterItem: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 10,
  },
  filtreText: {
    fontWeight: "500",
    fontSize: 15,
    color: "black", // Default color
  },
  selectedFilter: {
    // backgroundColor: "blue",
  },
  selectedFilterText: {
    color: colors.breakcolor,
    fontWeight: "900",
    textDecorationLine: "underline",
  },
});

export default Filtre;
