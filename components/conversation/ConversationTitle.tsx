import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { User } from "../../utils/types";
import defaultAvatar from "../../assets/default_avatar.jpg";

type ConversationTitleProps = {
  recipient: User;
};

function ConversationTitle({ recipient }: ConversationTitleProps) {
  return (
    <View style={styles.container}>
      <Image
        source={
          recipient?.avatar?.url
            ? {
                uri: recipient?.avatar?.url,
              }
            : defaultAvatar
        }
        style={styles.avatar}
      />
      <Text style={styles.username}>
        {recipient?.firstname} {recipient?.lastname}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  avatar: {
    width: 35,
    height: 35,
    borderRadius: 25,
    marginRight: 10
  },
  username: { fontSize: 18, color: "#1b1b33" },
});

export default ConversationTitle;
