// UserInfos.tsx
import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { User } from "../../@types/product";

interface UserInfosProps {
  user: User;
}

const UserInfos: React.FC<UserInfosProps> = ({ user }) => {
  return (
    <View style={styles.container}>
      <Image source={user.photo} style={styles.profileImage} />
      <Text style={styles.userName}>{user.name}</Text>
      <Text>Email: {user.email}</Text>
      <Text>Phone: {user.phoneNumber}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
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

export default UserInfos;
