import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { Conversation, Group } from "../../utils/types";
import groupAvatar from "../../assets/people.png";
import defaultAvatar from "../../assets/default_avatar.jpg";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { getTransformedTitle } from "../../utils/helpers";
import { useNavigation, useRoute } from "@react-navigation/native";
// import { Ionicons } from "@expo/vector-icons";
// import { AntDesign } from "@expo/vector-icons";
// import { toggleModal } from "../../store/groups/groupSlice";
// import { toggleSidebar } from "../../store/groups/groupRecipientsSidebarSlice";

// type ConversationTitleProps = {
//   conversationId?: string;
//   groupId?: string;
// };

function ConversationTitle({ props }: any) {
  const route: any = useRoute();
  // const navigation: any = useNavigation();
  // const dispatch = useDispatch<AppDispatch>();
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
  // const handleGroupSettingNavigate = () => {
  //   navigation.navigate("GroupSettings", {
  //     groupId: group?._id,
  //   });
  // };
  // const handleToggleAddRecipientModal = () => {
  //   dispatch(toggleModal(true));
  // };

  return (
    <View style={styles.container} {...props}>
      <View style={styles.leftContainer}>
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
      {/* {conversationType === "group" && (
        <View style={styles.rightContainer}>
          <Pressable onPress={handleToggleAddRecipientModal}>
            <AntDesign
              name="adduser"
              size={24}
              color="black"
              style={{ marginRight: 10 }}
            />
          </Pressable>
          <Pressable onPress={handleGroupSettingNavigate}>
            <Ionicons name="menu" size={30} color="black" />
          </Pressable>
        </View>
      )} */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginLeft: -18,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  leftContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  rightContainer: {
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

export default ConversationTitle;
