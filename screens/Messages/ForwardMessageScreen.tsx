import React, { useContext, useEffect, useState } from "react";
import { View, Pressable, FlatList, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import TopSearchBar from "../../components/searchBar/TopSearchBar";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";

import { Conversation, ConversationType, Group } from "../../utils/types";
import ConversationItem from "../../components/chat/ConversationItem";
import GroupItem from "../../components/chat/GroupItem";
import { AuthContext } from "../../navigation/AuthProvider";
import { chatTypes } from "../../utils/constants";
import { ConversationTabItemStyle } from "../../components/tabs/styles";
import { useRoute } from "@react-navigation/native";
import { ForwardConversationItem } from "../../components/forward-message/ForwardMessageItem";
import { fetchConversationsThunk } from "../../store/conversations/conversationSlice";
import { fetchGroupsThunk } from "../../store/groups/groupSlice";
import { forwardMessage } from "../../utils/apis";
import { getRecipientFromConversation } from "../../utils/helpers";

type Props = {
  navigation: any;
};

const ForwardMessageScreen = ({ navigation }: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const route: any = useRoute();
  const { user } = useContext(AuthContext);
  const [query, setQuery] = useState("");
  const chatId = route.params.chatId;
  let conversations = useSelector(
    (state: RootState) => state.conversations.conversations
  );
  conversations = conversations.filter((conv) => conv._id !== chatId);
  let groups = useSelector((state: RootState) => state.groups.groups);
  groups = groups.filter((group) => group._id !== chatId);
  const [selectedType, setSelectedType] = useState<ConversationType>("private");
  const { messageBeingForward } = useSelector(
    (state: RootState) => state.messageContainer
  );
  const onForwardClick = (conversation: Conversation | Group) => {
    forwardMessage(conversation._id, selectedType, messageBeingForward!);
    if (selectedType === "private") dispatch(fetchConversationsThunk());
    else dispatch(fetchGroupsThunk());
  };

  useEffect(() => {
    dispatch(fetchConversationsThunk());
    dispatch(fetchGroupsThunk());
  }, []);

  return (
    <View style={styles.chatscreen}>
      <View style={styles.chattopContainer}>
        <View style={styles.chatheader}>
          <TopSearchBar query={query} setQuery={setQuery} />
        </View>
      </View>
      <View style={styles.tabsContainer}>
        {chatTypes.map((chat) => (
          <ConversationTabItemStyle
            selected={chat.type === selectedType}
            key={chat.type}
          >
            <Pressable onPress={() => setSelectedType(chat.type)}>
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
      {selectedType === "private" ? (
        <FlatList
          data={
            query
              ? conversations.filter((conv) => {
                  const recipient = getRecipientFromConversation(
                    conv,
                    user?._id
                  );
                  return `${recipient?.firstname} ${recipient?.lastname}`
                    .toLowerCase()
                    .includes(query.toLowerCase());
                })
              : conversations
          }
          keyExtractor={(item: Conversation) => item._id}
          renderItem={({ item }) => (
            <ForwardConversationItem
              conversation={item}
              selectedType={selectedType}
              onForwardClick={onForwardClick}
            />
          )}
        />
      ) : (
        <FlatList
          data={
            query
              ? groups.filter((group) =>
                  group?.title?.toLowerCase().includes(query.toLowerCase())
                )
              : groups
          }
          keyExtractor={(item: Group) => item._id}
          renderItem={({ item }) => (
            <ForwardConversationItem
              conversation={item}
              selectedType={selectedType}
              onForwardClick={onForwardClick}
            />
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  chatscreen: {
    backgroundColor: "#F7F7F7",
    flex: 1,
  },
  chattopContainer: {
    height: 50,
    paddingHorizontal: 5,
    marginTop: 5,
    width: "100%",
    justifyContent: "center",
  },
  chatheader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    height: "100%",
  },
  tabsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderBottomColor: "#cccccc",
    borderBottomWidth: 1,
  },
});

export default ForwardMessageScreen;
