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

type Props = {
  item: Group;
  navigation: any;
};

function GroupItem({ item: group, navigation }: Props) {
  const MAX_TITLE_LENGTH = 20;
  const getTransformedTitle = () => {
    if (!group.title) {
      const usersToString = group.users
        .map((user) => user.firstname)
        .join(", ");
      return usersToString.length > MAX_TITLE_LENGTH
        ? usersToString.slice(0, MAX_TITLE_LENGTH).concat("...")
        : usersToString;
    }
    return group.title.length > MAX_TITLE_LENGTH
      ? group.title.slice(0, MAX_TITLE_LENGTH).concat("...")
      : group.title;
  };
  //   const latestMessageContent = () => {
  //     const { latestMessage } = conversation;
  //     if (latestMessage && latestMessage.content)
  //       return latestMessage.content?.length >= MESSAGE_LENGTH_MAX
  //         ? latestMessage.content?.slice(0, MESSAGE_LENGTH_MAX).concat("...")
  //         : latestMessage.content;
  //     else if (latestMessage && latestMessage.attachments) {
  //       let msg =
  //         latestMessage.sender.toString() === user?._id
  //           ? `You has sent an attachment`
  //           : `${recipient?.firstname} ${recipient?.lastname} has sent an attachment`;
  //       return msg.length >= MESSAGE_LENGTH_MAX
  //         ? msg.slice(0, MESSAGE_LENGTH_MAX).concat("...")
  //         : msg;
  //     }
  //     return null;
  //   };

  //   const hasProfilePicture = () => recipient?.avatar;

  return (
    <Card onPress={() => navigation.navigate("Chat", { groupId: group._id })}>
      <UserInfo>
        <UserImgWrapper>
          <UserImg source={groupAvatar} />
        </UserImgWrapper>
        <TextSection>
          <UserInfoText>
            <UserName>{getTransformedTitle()}</UserName>
            <PostTime>
              {group?.latestMessage
                ? formatRelative(
                    new Date(group.latestMessage.createdAt),
                    new Date()
                  )
                : "new group"}
            </PostTime>
          </UserInfoText>
          <MessageText>{group?.latestMessage?.content}</MessageText>
        </TextSection>
      </UserInfo>
    </Card>
  );
}

export default GroupItem;
