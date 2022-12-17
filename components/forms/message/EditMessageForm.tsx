import { useRoute } from "@react-navigation/native";
import React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store";
import { editGroupMessageThunk } from "../../../store/groupMessages/groupMessageSlice";
import {
  editMessageContent,
  setIsEditing,
} from "../../../store/messageContainer/messageContainerSlice";
import { editMessageThunk } from "../../../store/messages/messageThunk";
import { selectType } from "../../../store/selectedSlice";
import { palette } from "../../../utils/themes";
import { EditMessagePayload } from "../../../utils/types";
import FormContainer from "../FormContainer";

type Props = {
  setShowModal: any;
};

function EditMessageForm({ setShowModal }: Props) {
  const route: any = useRoute();
  const id = route.params.chatId;
  const dispatch = useDispatch<AppDispatch>();
  const { messageBeingEdited } = useSelector(
    (state: RootState) => state.messageContainer
  );
  const conversationType = useSelector((state: RootState) => selectType(state));

  const onSubmit = () => {
    console.log("Submitting Edit");
    if (!messageBeingEdited) {
      console.log("messageBeingEdited is undefined... Returning");
      return;
    }
    const params: EditMessagePayload = {
      _id: id!,
      messageId: messageBeingEdited._id,
      content: messageBeingEdited.content || "",
    };
    console.log("Editing...", conversationType);
    conversationType === "private"
      ? dispatch(editMessageThunk(params)).finally(() =>
          dispatch(setIsEditing(false))
        )
      : dispatch(editGroupMessageThunk(params)).finally(() =>
          dispatch(setIsEditing(false))
        );
  };
  const onEditMessageChange = (text: string) =>
    dispatch(editMessageContent(text));

  return (
    <FormContainer widthScale={0.9}>
      <TextInput
        placeholder={messageBeingEdited?.content}
        value={messageBeingEdited?.content}
        onChangeText={(text) => onEditMessageChange(text)}
        style={styles.input}
        placeholderTextColor="#ccc" 
      />
      <View style={styles.actionContainer}>
      <TouchableOpacity
          onPress={() => setShowModal(false)}
          style={[styles.button, { backgroundColor: palette.tomato }]}
        >
          <Text style={{ fontSize: 18, color: "#fff" }}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={onSubmit}
          style={[styles.button, { backgroundColor: palette.lightGreen }]}
        >
          <Text style={{ fontSize: 18, color: "#fff" }}>Submit</Text>
        </TouchableOpacity>
      </View>
    </FormContainer>
  );
}
const styles = StyleSheet.create({
  actionContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  input: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    fontSize: 15,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
  },
  button: {
    height: 45,
    paddingHorizontal: 15,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default EditMessageForm;
