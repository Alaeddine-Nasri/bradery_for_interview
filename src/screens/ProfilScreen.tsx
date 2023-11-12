import React from "react";
import {
  Image,
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  Platform,
  StatusBar as StatusB,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { users } from "../@types/users";
import UserInfos from "../components/profil/UserInfo";
import Commands from "../components/profil/Commands";
import Panel from "../components/profil/Panel";

export const ProfilScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <SafeAreaView
        style={{
          flex: 1,
          marginTop: 4,
          paddingTop: Platform.OS === "android" ? StatusB.currentHeight : 0,
        }}
      >
        <UserInfos user={users[0]} />
        <Commands user={users[0]} />
        <Panel user={users[0]} />
      </SafeAreaView>
      {/* <Text style={styles.text}>Profil</Text> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    height: "100%",
    width: "100%",
  },
  text: {
    color: "black",
    textAlign: "center",
    alignSelf: "center",
    top: 50,
    zIndex: 1,
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 30,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  userName: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
});
