import React, { useContext, useEffect } from "react";
import { ImageBackground, View } from "react-native";
// import { useTheme } from "styled-components/native";
// import { Theme } from "../../utils/themes";
import chatbg from "../../assets/chatbg.png";
import { AppDispatch } from "../../store";
import { useDispatch } from "react-redux";
import { fetchMessagesThunk } from "../../store/messages/messageThunk";
import { useRoute } from "@react-navigation/native";
import MessagePanel from "../../components/messages/MessagePanel";
import { SocketContext } from "../../utils/context/SocketContext";

function ConversationChannelScreen() {
  // const theme = useTheme() as Theme;
  const route = useRoute() as any;
  const routeId = route.params?.chatId;
  const conversationId = route.params.chatId;
  const socket = useContext(SocketContext);
  const dispatch = useDispatch<AppDispatch>();
  // const [timer, setTimer] = useState<ReturnType<typeof setTimeout>>();
  // const [isTyping, setIsTyping] = useState(false);
  // const [isRecipientTyping, setIsRecipientTyping] = useState(false);

  useEffect(() => {
    dispatch(fetchMessagesThunk(conversationId));
  }, [conversationId]);

  useEffect(() => {
    const conversationId = routeId!;
    socket.emit('onConversationJoin', { conversationId });
    socket.on('userJoin', () => {
      console.log('userJoin');
    });
    socket.on('userLeave', () => {
      console.log('userLeave');
    });
    // socket.on('onTypingStart', () => {
    //   console.log('onTypingStart: User has started typing...');
    //   setIsRecipientTyping(true);
    // });
    // socket.on('onTypingStop', () => {
    //   console.log('onTypingStop: User has stopped typing...');
    //   setIsRecipientTyping(false);
    // });
    // socket.on('onMessageUpdate', (message) => {
    //   console.log('onMessageUpdate received');
    //   console.log(message);
    //   dispatch(editMessage(message));
    // });

    return () => {
      socket.emit('onConversationLeave', { conversationId });
      socket.off('userJoin');
      socket.off('userLeave');
      socket.off('onTypingStart');
      socket.off('onTypingStop');
      socket.off('onMessageUpdate');
    };
  }, [routeId]);

  return (
    <ImageBackground resizeMode="cover" source={chatbg} style={{ flex: 1 }}>
      <MessagePanel />
    </ImageBackground>
  );
}

export default ConversationChannelScreen;
