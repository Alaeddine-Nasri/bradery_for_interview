import React, { useEffect, useState } from "react";
import {
  ScrollView,
  View,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar as StatusB,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
// import { users } from "../@types/users";
import UserInfos from "../components/profil/UserInfo";
import Commands from "../components/profil/Commands";
import Panel from "../components/profil/Panel";
import FavoriteHeader from "../components/favorite/FavoriteHeader";
import { fetchUserById } from "../api/productAPI";
import { User } from "../@types/product";

export const FavoriteScreen: React.FC = () => {
  const [user, setUser] = useState<User | undefined>(undefined);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await fetchUserById(1); // Assuming user ID is 1 for demonstration
        setUser(userData);
      } catch (error) {
        console.error("Error fetching user:", error);
        // Handle error as needed
      }
    };

    fetchData();
  }, []);

  // const currentUser = users[0]; // Assuming you have an array of users, adjust as needed
  // const currentUserId = users[0].id;
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
    >
      <StatusBar style="light" />
      <SafeAreaView
        style={{
          flex: 1,
          marginTop: 4,
          paddingTop: Platform.OS === "android" ? StatusB.currentHeight : 0,
        }}
      >
        <FavoriteHeader
          title="Favorite Items"
          description="Your most loved items"
        />
        <Panel userId={1} />
      </SafeAreaView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
});
