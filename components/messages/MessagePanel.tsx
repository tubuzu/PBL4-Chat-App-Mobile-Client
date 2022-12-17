import { useRoute } from "@react-navigation/native";
import { ImagePickerAsset } from "expo-image-picker";
import React, { useState } from "react";
// import { View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
// import { removeAllAttachments } from "../../store/messagePanel/messagePanelSlice";
import { createMessage } from "../../utils/apis";
import MessagePanelBody from "./MessagePanelBody";
import MessagePanelFooter from "./MessagePanelFooter";
import { MessagePanelStyle } from "./styles";

function MessagePanel() {
  const route: any = useRoute();
  const routeId = route.params?.chatId;
  const dispatch = useDispatch();
  const [content, setContent] = useState("");
  // const { attachments } = useSelector((state: RootState) => state.messagePanel);
  const [files, setFiles] = useState<ImagePickerAsset[]>([]);
  const selectedType = useSelector(
    (state: RootState) => state.selectedConversationType.type
  );
  const sendMessage = async () => {
    const trimmedContent = content.trim();
    const attachmentPayload = files;
    if (!routeId) return;
    if (!trimmedContent && !attachmentPayload.length) return;
    setContent("");
    // dispatch(removeAllAttachments());
    setFiles([]);
    const formData = new FormData();
    formData.append("id", routeId);
    trimmedContent && formData.append("content", trimmedContent);
    attachmentPayload.forEach((attachment) => {
      const photo = {
        uri: attachment.uri,
        type: "image/jpeg",
        name: "photo.jpg",
      };
      formData.append("attachments", photo as any);
    });
    try {
      await createMessage(routeId, selectedType, formData);
    } catch (err) {
      console.log(err);
    }
  };
  const sendImage = async (file: ImagePickerAsset) => {
    if (!routeId) return;
    if (!file) return;
    setContent("");
    setFiles([]);
    const formData = new FormData();
    formData.append("id", routeId);
    const photo = {
      uri: file.uri,
      type: "image/jpeg",
      name: "photo.jpg",
    };
    formData.append("attachments", photo as any);
    try {
      await createMessage(routeId, selectedType, formData);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <MessagePanelStyle>
      <MessagePanelBody />
      <MessagePanelFooter
        content={content}
        setContent={setContent}
        sendMessage={sendMessage}
        sendImage={sendImage}
        files={files}
        setFiles={setFiles}
      />
    </MessagePanelStyle>
  );
}

export default MessagePanel;
