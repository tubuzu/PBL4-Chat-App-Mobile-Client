import React, { useContext } from "react";
import {
  Card,
  MessageText,
  PostTime,
  TextSection,
  UserImg,
  UserImgWrapper,
  UserInfo,
  UserInfoText,
  UserName,
} from "../../utils/styles/MessageStyles";
import { Conversation, User } from "../../utils/types";
import { getRecipientFromConversation } from "../../utils/helpers";
import defaultAvatar from "../../assets/default_avatar.jpg";
import { formatRelative } from "date-fns";

type Props = {
  item: Conversation;
  navigation: any;
  userId: string;
};

function ConversationItem({ item: conversation, navigation, userId }: Props) {
  const MESSAGE_LENGTH_MAX = 50;
  const recipient = getRecipientFromConversation(conversation, userId);
  // console.log(recipient);
  const latestMessageContent = () => {
    if (conversation?.latestMessage != undefined) {
      const { latestMessage } = conversation;
      if (latestMessage && latestMessage.content)
        return latestMessage.content?.length >= MESSAGE_LENGTH_MAX
          ? latestMessage.content?.slice(0, MESSAGE_LENGTH_MAX).concat("...")
          : latestMessage.content;
      else if (latestMessage && latestMessage.attachments) {
        let msg =
          latestMessage.sender.toString() === userId
            ? `You has sent an attachment`
            : `${recipient?.firstname} ${recipient?.lastname} has sent an attachment`;
        return msg.length >= MESSAGE_LENGTH_MAX
          ? msg.slice(0, MESSAGE_LENGTH_MAX).concat("...")
          : msg;
      }
    }
    return null;
  };

  const hasProfilePicture = () => recipient?.avatar?.url;

  return (
    <Card
      onPress={() =>
        navigation.navigate("Conversation", { chatId: conversation._id, recipient: recipient })
      }
    >
      <UserInfo>
        <UserImgWrapper>
          <UserImg
            source={
              hasProfilePicture()
                ? { uri: recipient?.avatar?.url! }
                : defaultAvatar
            }
          />
        </UserImgWrapper>
        <TextSection>
          <UserInfoText>
            <UserName>{`${recipient?.firstname} ${recipient?.lastname}`}</UserName>
            <PostTime>
              {conversation?.latestMessage
                ? formatRelative(
                    new Date(conversation.latestMessage.createdAt),
                    new Date()
                  )
                : "new conversation"}
            </PostTime>
          </UserInfoText>
          <MessageText>{latestMessageContent()}</MessageText>
        </TextSection>
      </UserInfo>
    </Card>
  );
}

export default ConversationItem;