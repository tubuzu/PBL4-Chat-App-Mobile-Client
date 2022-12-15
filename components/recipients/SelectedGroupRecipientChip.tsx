import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { User } from "../../utils/types";
import { Ionicons } from "@expo/vector-icons";
type Props = {
  user: User;
  removeUser: (user: User) => void;
};

function SelectedGroupRecipientChip({ user, removeUser }: Props) {
  return (
    <View style={styles.pill}>
      <View style={styles.container}>
        <Text style={{ paddingRight: 3 }}>{user.username}</Text>
        <Pressable>
          <Ionicons
            name="close-circle-outline"
            size={20}
            onPress={() => removeUser(user)}
          />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  pill: {
    borderWidth: 2,
    borderColor: "#323232b0",
    borderRadius: 14,
    alignSelf: "flex-start",
    paddingVertical: 6,
    paddingHorizontal: 8,
    fontSize: 14,
    margin: 5
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    userSelect: "none",
  },
  icon: {
    marginLeft: 10,
    color: "#656565",
  },
});

export default SelectedGroupRecipientChip;
