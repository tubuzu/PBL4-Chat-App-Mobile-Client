import React from "react";
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
import { Group } from "../../utils/types";
import groupAvatar from "../../assets/people.png";
import { formatRelative } from "date-fns";
import { getTransformedTitle } from "../../utils/helpers";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

type Props = {
  item: Group;
  navigation: any;
  userId: string;
  onContextMenu: any;
};

function GroupItem({ item: group, navigation, userId, onContextMenu }: Props) {
  const MESSAGE_LENGTH_MAX = 50;
  const latestMessageContent = () => {
    if (group?.latestMessage !== undefined) {
      const { latestMessage } = group;
      const isMe = latestMessage.sender.toString() === userId;
      let sender = group.users.find(
        (user) => user._id === group.latestMessage.sender.toString()
      );
      if (latestMessage && latestMessage.content) {
        return latestMessage.content?.length >= MESSAGE_LENGTH_MAX
          ? isMe
            ? latestMessage.content?.slice(0, MESSAGE_LENGTH_MAX).concat("...")
            : `${sender?.lastname}: ${latestMessage.content
                ?.slice(0, MESSAGE_LENGTH_MAX)
                .concat("...")}`
          : isMe
          ? latestMessage.content
          : `${sender?.lastname}: ${latestMessage.content}`;
      } else if (latestMessage && latestMessage.attachments) {
        let msg =
          latestMessage.sender.toString() === userId
            ? `You has sent an attachment`
            : `${sender?.lastname} has sent an attachment`;
        return msg.length >= MESSAGE_LENGTH_MAX
          ? msg.slice(0, MESSAGE_LENGTH_MAX).concat("...")
          : msg;
      }
    }
    return null;
  };
  return (
    <Card
      underlayColor={"rgba(0,0,0,0.1)"}
      delayLongPress={400}
      onPress={() => navigation.navigate("Group", { chatId: group._id })}
      onLongPress={onContextMenu}
    >
      <UserInfo>
        <UserImgWrapper>
          <UserImg source={groupAvatar} />
        </UserImgWrapper>
        <TextSection>
          <UserInfoText>
            <UserName>{getTransformedTitle(group)}</UserName>
            <PostTime>
              {group?.latestMessage
                ? formatRelative(
                    new Date(group.latestMessage.createdAt),
                    new Date()
                  )
                : "new group"}
            </PostTime>
          </UserInfoText>
          <MessageText>{latestMessageContent()}</MessageText>
        </TextSection>
      </UserInfo>
    </Card>
  );
}

export default GroupItem;
