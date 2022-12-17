import React, { FC, useContext, useState } from "react";
import { useSelector } from "react-redux";
import { getRecipientFromConversation } from "../../utils/helpers";
import {
  Card,
  TextSection,
  UserImg,
  UserImgWrapper,
  UserInfo,
  UserInfoText,
  UserName,
} from "../../utils/styles/MessageStyles";
import { Conversation, ConversationType, Group } from "../../utils/types";
import defaultAvatar from "../../assets/default_avatar.jpg";
import groupAvatar from "../../assets/people.png";
import { AuthContext } from "../../navigation/AuthProvider";
import ForwardSubmitBtn from "../buttons/ForwardSubmitBtn";
import { ActivityIndicator } from "react-native";

type Props = {
  conversation: Conversation | Group;
  selectedType: ConversationType;
  onForwardClick: (conversation: Conversation | Group) => void;
};

export const ForwardConversationItem: FC<Props> = ({
  conversation,
  selectedType,
  onForwardClick,
}) => {
  const MAX_TITLE_LENGTH = 20;
  const { user } = useContext(AuthContext);
  const recipient = getRecipientFromConversation(
    conversation as Conversation,
    user?._id
  );
  const hasProfilePicture = () => recipient?.avatar?.url;

  const [sended, setSended] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleForward = async () => {
    setLoading(true);
    await onForwardClick(conversation);
    setSended(true);
    setLoading(false);
  };
  const getTransformedTitle = () => {
    if (!(conversation as Group).title) {
      const usersToString = (conversation as Group).users
        .map((user) => user.firstname)
        .join(", ");
      return usersToString.length > MAX_TITLE_LENGTH
        ? usersToString.slice(0, MAX_TITLE_LENGTH).concat("...")
        : usersToString;
    }
    return (conversation as Group).title?.length! > MAX_TITLE_LENGTH
      ? (conversation as Group).title?.slice(0, MAX_TITLE_LENGTH).concat("...")
      : (conversation as Group)?.title;
  };

  return (
    <Card>
      <UserInfo>
        <UserImgWrapper>
          <UserImg
            source={
              selectedType === "private"
                ? hasProfilePicture()
                  ? { uri: recipient?.avatar?.url! }
                  : defaultAvatar
                : groupAvatar
            }
          />
        </UserImgWrapper>
        <TextSection>
          <UserInfoText>
            <UserName>
              {selectedType === "private"
                ? `${recipient?.firstname} ${recipient?.lastname}`
                : getTransformedTitle()}
            </UserName>
            {sended && !loading ? (
              <ForwardSubmitBtn content="Sent" onPress={handleForward} disabled />
            ) : sended && loading ? (
              <ActivityIndicator />
            ) : (
              <ForwardSubmitBtn content="Send" onPress={handleForward} />
            )}
          </UserInfoText>
        </TextSection>
      </UserInfo>
    </Card>
  );
};
