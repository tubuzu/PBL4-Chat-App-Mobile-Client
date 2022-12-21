import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { Conversation, Group } from "../../utils/types";
import groupAvatar from "../../assets/people.png";
import defaultAvatar from "../../assets/default_avatar.jpg";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { getTransformedTitle } from "../../utils/helpers";
import { useRoute } from "@react-navigation/native";

// type GroupTitleProps = {
//   conversationId?: string;
//   groupId?: string;
// };

function GroupTitle() {
  const route: any = useRoute();
  const chatId = route.params?.chatId;
  // console.log(chatId);
  const conversationType = useSelector(
    (state: RootState) => state.selectedConversationType.type
  );
  const group = useSelector((state: RootState) =>
    state.groups.groups.find((g: Group) => g._id === chatId)
  );
  // console.log(group);
  const conversation = useSelector((state: RootState) =>
    state.conversations.conversations.find(
      (c: Conversation) => c._id === chatId
    )
  );
  return (
    <View style={styles.container}>
      <Image
        source={
          conversationType === "private"
            ? conversation?.recipient?.avatar?.url
              ? {
                  uri: conversation?.recipient?.avatar?.url,
                }
              : defaultAvatar
            : groupAvatar
        }
        style={styles.avatar}
      />
      <Text style={styles.username}>
        {conversationType === "private"
          ? `${conversation?.recipient?.firstname} ${conversation?.recipient?.lastname}`
          : getTransformedTitle(group!)}
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
    marginRight: 10,
  },
  username: { fontSize: 18, color: "#1b1b33" },
});

export default GroupTitle;
