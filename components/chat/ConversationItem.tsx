import React, { useState } from "react";
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
import { Conversation } from "../../utils/types";
import { getRecipientFromConversation } from "../../utils/helpers";
import defaultAvatar from "../../assets/default_avatar.jpg";
import { formatRelative } from "date-fns";

type Props = {
  item: Conversation;
  navigation: any;
  userId: string;
  onContextMenu: any;
};

function ConversationItem({
  item: conversation,
  navigation,
  userId,
  onContextMenu,
}: Props) {
  const MESSAGE_LENGTH_MAX = 50;
  const recipient = getRecipientFromConversation(conversation, userId);
  // console.log(recipient);
  const latestMessageContent = () => {
    if (conversation?.latestMessage != undefined) {
      const { latestMessage } = conversation;
      let isMe = latestMessage.sender.toString() === userId;
      if (latestMessage && latestMessage.content)
        return latestMessage.content?.length >= MESSAGE_LENGTH_MAX
          ? isMe
            ? latestMessage.content?.slice(0, MESSAGE_LENGTH_MAX).concat("...")
            : `${recipient?.lastname} ${latestMessage.content
                ?.slice(0, MESSAGE_LENGTH_MAX)
                .concat("...")}`
          : isMe
          ? latestMessage.content
          : `${recipient?.lastname} ${latestMessage.content}`;
      else if (latestMessage && latestMessage.attachments) {
        let msg = isMe
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
      underlayColor={"rgba(0,0,0,0.1)"}
      delayLongPress={400}
      onPress={() =>
        navigation.navigate("Conversation", { chatId: conversation._id })
      }
      onLongPress={onContextMenu}
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
