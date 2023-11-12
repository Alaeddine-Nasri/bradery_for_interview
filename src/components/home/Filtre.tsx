// Filtre.tsx
import React, { useState } from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";

interface FiltreProps {
  onFilterPress: (filter: string) => void;
  selectedFilter: string;
}

const Filtre: React.FC<FiltreProps> = ({ onFilterPress, selectedFilter }) => {
  const filters = ["Best Match", "New Arrival", "Trendy", "Promotion"];

  return (
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
  );
};

const styles = StyleSheet.create({
  ProductFilters: {
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "white",
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
    backgroundColor: "blue", // Change to your desired selected color
  },
  selectedFilterText: {
    color: "white", // Change to your desired selected text color
  },
});

export default Filtre;
