// UserInfos.tsx
import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { User } from "../../@types/product";

interface UserInfosProps {
  user?: User;
}

const UserInfos: React.FC<UserInfosProps> = ({ user }) => {
  if (!user) {
    // If user is undefined, you can render a loading state or return null
    return null;
  }

  return (
    <View style={styles.container}>
      <Image source={{ uri: user.photo }} style={styles.profileImage} />
      <Text style={styles.userName}>{user.name}</Text>
      <Text>Email: {user.email}</Text>
      <Text>Phone: {user.phoneNumber}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginTop: 10,
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
