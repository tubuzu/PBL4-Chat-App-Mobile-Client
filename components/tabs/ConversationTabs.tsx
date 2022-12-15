import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { fetchConversationsThunk } from "../../store/conversations/conversationSlice";
import { fetchGroupsThunk } from "../../store/groups/groupSlice";
import { updateType } from "../../store/selectedSlice";
import { chatTypes } from "../../utils/constants";
import { ConversationTypeData } from "../../utils/types";
import { ConversationTabItemStyle } from "./styles";

type Props = {
  navigation: any;
};

function ConversationTabs({ navigation }: Props) {
  const selectedType = useSelector(
    (state: RootState) => state.selectedConversationType.type
  );
  const dispatch = useDispatch<AppDispatch>();
  const onSelectType = (chat: ConversationTypeData) => {
    if (chat.type === "private") dispatch(fetchConversationsThunk());
    else dispatch(fetchGroupsThunk());
    dispatch(updateType(chat.type));
  };
  return (
    <View style={styles.container}>
      {chatTypes.map((chat) => (
        <ConversationTabItemStyle
          selected={chat.type === selectedType}
          key={chat.type}
        >
          <Pressable onPress={() => onSelectType(chat)}>
            <Text
              style={{
                color: chat.type === selectedType ? "black" : "#ccc",
                fontSize: 17,
                fontWeight: "900",
              }}
            >
              {chat.label}
            </Text>
          </Pressable>
        </ConversationTabItemStyle>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderBottomColor: "#cccccc",
    borderBottomWidth: 1,
  },
});

export default ConversationTabs;
