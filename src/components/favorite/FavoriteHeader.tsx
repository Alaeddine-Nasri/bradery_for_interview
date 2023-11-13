import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface FavoriteHeaderProps {
  title: string;
  description: string;
}

const FavoriteHeader: React.FC<FavoriteHeaderProps> = ({
  title,
  description,
}) => {
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    alignItems: "center",
    padding: 16,
    backgroundColor: "#3498db", // You can customize the background color
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white", // You can customize the text color
  },
  description: {
    fontSize: 16,
    color: "white", // You can customize the text color
  },
});

export default FavoriteHeader;
