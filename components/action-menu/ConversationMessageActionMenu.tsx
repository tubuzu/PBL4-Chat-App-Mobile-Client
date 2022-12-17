import React, { useContext } from "react";
import { StyleSheet, Text, TouchableHighlight, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { selectType } from "../../store/selectedSlice";
import { deleteMessageThunk } from "../../store/messages/messageThunk";
import { deleteGroupMessageThunk } from "../../store/groupMessages/groupMessageSlice";
import {
  setIsEditing,
  setIsForwarding,
  setMessageBeingEdited,
  setMessageBeingForward,
} from "../../store/messageContainer/messageContainerSlice";
import { AuthContext } from "../../navigation/AuthProvider";
import { useNavigation } from '@react-navigation/native';

type Props = {
  modalVisible: boolean;
  setModalVisible: any;
};
function ConversationMessageActionMenu({
  modalVisible,
  setModalVisible,
}: Props) {
  const route: any = useRoute();
  const navigation: any = useNavigation();
  const { user } = useContext(AuthContext);
  const _id = route.params.chatId;
  const dispatch = useDispatch<AppDispatch>();
  const conversationType = useSelector((state: RootState) => selectType(state));
  const { selectedMessage: message } = useSelector(
    (state: RootState) => state.messageContainer
  );
  const deleteMessage = () => {
    console.log(`Delete message ${message?._id}`);
    if (!message) return;
    const messageId = message._id;
    setModalVisible(!modalVisible);
    return conversationType === "private"
      ? dispatch(deleteMessageThunk({ _id, messageId: message._id }))
      : dispatch(deleteGroupMessageThunk({ _id, messageId }));
  };

  const editMessage = () => {
    setModalVisible(!modalVisible);
    dispatch(setIsEditing(true));
    dispatch(setMessageBeingEdited(message));
  };

  const forwardMessage = () => {
    setModalVisible(!modalVisible);
    dispatch(setIsForwarding(true));
    dispatch(setMessageBeingForward(message));
    navigation.navigate("ForwardMessage", {
      chatId: _id,
    });
  };

  return (
    <View style={styles.menuContainer}>
      {message?.sender._id === user?._id && (
        <TouchableHighlight onPress={deleteMessage} underlayColor="#ccc">
          <View style={[styles.menuItem, styles.borderAtBottom]}>
            <AntDesign
              name="delete"
              size={24}
              color="black"
              style={styles.menuItemIcon}
            />
            <Text style={styles.menuItemText}>Delete</Text>
          </View>
        </TouchableHighlight>
      )}
      {message?.sender._id === user?._id && (
        <TouchableHighlight underlayColor="#ccc" onPress={editMessage}>
          <View style={[styles.menuItem, styles.borderAtBottom]}>
            <AntDesign
              name="edit"
              size={24}
              color="black"
              style={styles.menuItemIcon}
            />
            <Text style={styles.menuItemText}>Edit</Text>
          </View>
        </TouchableHighlight>
      )}
      <TouchableHighlight underlayColor="#ccc" onPress={forwardMessage}>
        <View style={[styles.menuItem]}>
          <Ionicons
            name="arrow-forward-circle-outline"
            size={24}
            color="black"
            style={styles.menuItemIcon}
          />
          <Text style={styles.menuItemText}>Forward</Text>
        </View>
      </TouchableHighlight>
    </View>
  );
}

const styles = StyleSheet.create({
  menuContainer: {
    flexDirection: "column",
    backgroundColor: "white",
  },
  menuItem: {
    paddingHorizontal: 20,
    paddingVertical: 7,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  menuItemIcon: {
    marginRight: 10,
  },
  menuItemText: {
    color: "black",
    fontSize: 18,
    marginLeft: 10,
  },
  borderAtBottom: {
    borderBottomColor: "#ccc",
    borderStyle: "solid",
    borderBottomWidth: 1,
  },
});

export default ConversationMessageActionMenu;
