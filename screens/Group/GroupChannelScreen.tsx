import React, { useContext, useEffect } from "react";
import { ImageBackground, View } from "react-native";
// import { useTheme } from "styled-components/native";
// import { Theme } from "../../utils/themes";
import chatbg from "../../assets/chatbg.png";
import { AppDispatch } from "../../store";
import { useDispatch } from "react-redux";
import { useRoute } from "@react-navigation/native";
import MessagePanel from "../../components/messages/MessagePanel";
import { SocketContext } from "../../utils/context/SocketContext";
import { editGroupMessage, fetchGroupMessagesThunk } from "../../store/groupMessages/groupMessageSlice";
import { GroupMessageType } from "../../utils/types";

function GroupChannelScreen() {
  // const theme = useTheme() as Theme;
  const route = useRoute() as any;
  const groupId = route.params?.chatId;
  const socket = useContext(SocketContext);
  const dispatch = useDispatch<AppDispatch>();
  // const [timer, setTimer] = useState<ReturnType<typeof setTimeout>>();
  // const [isTyping, setIsTyping] = useState(false);
  // const [isRecipientTyping, setIsRecipientTyping] = useState(false);

  useEffect(() => {
    dispatch(fetchGroupMessagesThunk(groupId));
  }, [groupId]);

  useEffect(() => {
    console.log(groupId);
    socket.emit("onGroupJoin", { groupId });
    socket.on("onGroupMessageUpdate", (message: GroupMessageType) => {
      console.log("onGroupMessageUpdate received");
      console.log(message);
      dispatch(editGroupMessage(message));
    });
    return () => {
      socket.emit("onGroupLeave", { groupId });
      socket.off("onGroupMessageUpdate");
    };
  }, [groupId]);

  return (
    <ImageBackground resizeMode="cover" source={chatbg} style={{ flex: 1 }}>
      <MessagePanel />
    </ImageBackground>
  );
}

export default GroupChannelScreen;
