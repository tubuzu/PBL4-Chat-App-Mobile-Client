import { useRoute } from "@react-navigation/native";
import React, { useState, useContext } from "react";
import { ScrollView, FlatList, View } from "react-native";
import { useSelector } from "react-redux";
import { AuthContext } from "../../navigation/AuthProvider";
import { RootState } from "../../store";
import { selectGroupMessage } from "../../store/groupMessages/groupMessageSlice";
import { selectConversationMessage } from "../../store/messages/messageSlice";
import { selectType } from "../../store/selectedSlice";
import { GroupMessageType, MessageType } from "../../utils/types";
import Message from "./Message";
import {
  editMessageContent,
  resetMessageContainer,
  setIsEditing,
  setSelectedMessage,
} from "../../store/messageContainer/messageContainerSlice";

type MapMessageItemProps = {
  item: MessageType | GroupMessageType;
  index: number;
};

function MessagePanelBody() {
  const route: any = useRoute();
  const id = route.params.chatId;
  const { user } = useContext(AuthContext);
  //   const dispatch = useDispatch<AppDispatch>();
  const selectedType = useSelector((state: RootState) => selectType(state));
  const conversationMessages = useSelector((state: RootState) =>
    selectConversationMessage(state, id!)
  );
  const groupMessages = useSelector((state: RootState) =>
    selectGroupMessage(state, id!)
  );
  const messages =
    selectedType === "private" ? conversationMessages : groupMessages;

  const [displayMessageTime, setDisplayMessageTime] = useState(false);
  const mapMessages = ({ item: message, index }: MapMessageItemProps) => {
    const currentMessage = messages?.messages[index];
    const nextMessage = messages?.messages[index + 1];
    const preMessage = messages?.messages[index - 1];
    const isFirst =
      messages?.messages.length === index + 1 ||
      currentMessage?.sender._id !== nextMessage?.sender._id;
    const isLast =
      index === 0 || currentMessage?.sender._id !== preMessage?.sender._id;
    return (
      <Message
        key={index}
        time={message.createdAt}
        isLeft={user?._id !== message.sender._id}
        isFirst={isFirst}
        isLast={isLast}
        message={message}
        displayMessageTime={displayMessageTime}
        setDisplayMessageTime={setDisplayMessageTime}
        // onSwipe={onSwipeToReply}
      />
    );
  };

  return (
    <View style={{ flex: 1 }}>
      {selectedType === "private" ? (
        <FlatList
          data={conversationMessages?.messages}
          keyExtractor={(item: MessageType) => item._id}
          renderItem={({ item, index }) => mapMessages({ item, index })}
          inverted={true}
          // style={{marginBottom: 10}}
        />
      ) : (
        <FlatList
          data={groupMessages?.messages}
          keyExtractor={(item: GroupMessageType) => item._id}
          renderItem={({ item, index }) => mapMessages({ item, index })}
          inverted={true}
        />
      )}
    </View>
  );
}

export default MessagePanelBody;

{
  /* <ScrollView
      style={{ flex: 1, transform: [{ scaleY: -1 }] }}
      horizontal={false}
      ref={(ref) => (scrollView.current = ref)}
      //   onContentSizeChange={() => {
      //     scrollView.current.scrollToEnd({ animated: true });
      //   }}
    >
      {selectedType === "private"
        ? conversationMessages?.messages.map(mapMessages)
        : groupMessages?.messages.map(mapMessages)}
    </ScrollView> */
}
