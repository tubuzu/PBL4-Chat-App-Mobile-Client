import React, { useContext, useEffect, useState } from "react";
import { View, Pressable, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./styles";
import TopSearchBar from "../../components/searchBar/TopSearchBar";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";

import {
  Conversation,
  Group,
  GroupMessageEventPayload,
  MessageEventPayload,
} from "../../utils/types";
import { updateType } from "../../store/selectedSlice";
import {
  addConversation,
  fetchConversationsThunk,
  updateConversation,
} from "../../store/conversations/conversationSlice";
import ConversationItem from "../../components/chat/ConversationItem";
import ConversationTabs from "../../components/tabs/ConversationTabs";
import GroupItem from "../../components/chat/GroupItem";
import AddConversationModal from "../../components/modals/AddConversationModal";
import { AuthContext } from "../../navigation/AuthProvider";
import AntDesign from "react-native-vector-icons/AntDesign";
import AddGroupModal from "../../components/modals/AddGroupModal";
import { SocketContext } from "../../utils/context/SocketContext";
import {
  addGroupMessage,
  deleteGroupMessage,
} from "../../store/groupMessages/groupMessageSlice";
import {
  addGroup,
  fetchGroupsThunk,
  removeGroup,
  updateGroup,
} from "../../store/groups/groupSlice";
import { addMessage, deleteMessage } from "../../store/messages/messageSlice";
import { getRecipientFromConversation } from "../../utils/helpers";

type Props = {
  navigation: any;
};

const ChatScreen = ({ navigation }: Props) => {
  const [query, setQuery] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const socket = useContext(SocketContext);
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useContext(AuthContext);

  const conversations = useSelector(
    (state: RootState) => state.conversations.conversations
  );
  const groups = useSelector((state: RootState) => state.groups.groups);
  const conversationType = useSelector(
    (state: RootState) => state.selectedConversationType.type
  );

  useEffect(() => {
    dispatch(updateType("private"));
    dispatch(fetchConversationsThunk());
    dispatch(fetchGroupsThunk());
  }, []);

  useEffect(() => {
    // CONVERSATION
    socket.on("onMessage", (payload: MessageEventPayload) => {
      console.log("Message Received");
      const { conversation, message } = payload;
      // console.log(conversation, message);
      dispatch(addMessage(payload));
      dispatch(updateConversation(conversation));
    });
    socket.on("onConversation", (payload: Conversation) => {
      console.log("Received onConversation Event");
      console.log(payload);
      dispatch(addConversation(payload));
    });
    socket.on("onMessageDelete", (payload) => {
      console.log("Message Deleted");
      console.log(payload);
      dispatch(deleteMessage(payload));
    });

    // GROUP
    socket.on("onGroupMessage", (payload: GroupMessageEventPayload) => {
      const { group, message } = payload;
      console.log(group, message);
      dispatch(addGroupMessage(payload));
    });

    socket.on("onGroupMessageDelete", (payload) => {
      dispatch(deleteGroupMessage(payload));
    });

    socket.on("onGroupCreate", (payload: Group) => {
      dispatch(addGroup(payload));
    });

    // add group for user being added to group
    socket.on("onGroupUserAdd", (payload) => {
      dispatch(addGroup(payload));
    });

    // update all user in room to see new member
    socket.on("onGroupReceivedNewUser", (payload) => {
      dispatch(updateGroup(payload));
    });

    socket.on("onGroupRecipientRemoved", (payload) => {
      dispatch(updateGroup(payload));
    });

    socket.on("onGroupRemoved", (payload) => {
      dispatch(removeGroup(payload));
    });

    socket.on("onGroupParticipantLeft", (payload) => {
      if (payload.userId === user?._id) {
        dispatch(removeGroup(payload.group));
      } else dispatch(updateGroup(payload.group));
    });

    socket.on("onGroupOwnerUpdate", (payload: Group) => {
      dispatch(updateGroup(payload));
    });

    return () => {
      // CONVERSATION
      socket.off("onMessage");
      socket.off("onConversation");
      socket.off("onMessageDelete");

      // GROUP
      socket.off("onGroupMessage");
      socket.off("onGroupMessageDelete");
      socket.off("onGroupCreate");
      socket.off("onGroupUserAdd");
      socket.off("onGroupReceivedNewUser");
      socket.off("onGroupRecipientRemoved");
      socket.off("onGroupRemoved");
      socket.off("onGroupParticipantLeft");
      socket.off("onGroupOwnerUpdate");
    };
  }, []);
  //...other variables
  return (
    <SafeAreaView style={styles.chatscreen}>
      <View style={styles.chattopContainer}>
        <View style={styles.chatheader}>
          <View style={styles.searchBar}>
            <TopSearchBar query={query} setQuery={setQuery} />
          </View>
          <Pressable
            onPress={() => setModalVisible(true)}
            style={styles.addIcon}
          >
            {conversationType === "private" ? (
              <AntDesign name="adduser" size={30} color="white" />
            ) : (
              <AntDesign name="addusergroup" size={30} color="white" />
            )}
          </Pressable>
        </View>
      </View>
      <ConversationTabs navigation={navigation} />
      {conversationType === "private" ? (
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
            <ConversationItem
              navigation={navigation}
              item={item}
              userId={user?._id!}
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
            <GroupItem navigation={navigation} item={item} userId={user?._id!} />
          )}
        />
      )}
      {conversationType === "private" ? (
        <AddConversationModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
        />
      ) : (
        <AddGroupModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
        />
      )}
    </SafeAreaView>
  );
};

export default ChatScreen;
