import React, { FC, useState } from "react";
// import { useSelector } from "react-redux";
import {
  Card,
  TextSection,
  UserImg,
  UserImgWrapper,
  UserInfo,
  UserInfoText,
  UserName,
} from "../../utils/styles/MessageStyles";
import { User } from "../../utils/types";
import defaultAvatar from "../../assets/default_avatar.jpg";
import { MaterialCommunityIcons } from "@expo/vector-icons";

type Props = {
  member: User;
  isLast?: boolean;
  isOwner?: boolean;
  onContextMenu?: any;
};

export const GroupUsersItem: FC<Props> = ({
  member,
  isLast,
  isOwner,
  onContextMenu,
}) => {
  const hasProfilePicture = () => member?.avatar?.url;
  return (
    <Card
      underlayColor={"rgba(0,0,0,0.1)"}
      onLongPress={onContextMenu}
      delayLongPress={400}
    >
      <UserInfo>
        <UserImgWrapper>
          <UserImg
            source={
              hasProfilePicture()
                ? { uri: member?.avatar?.url! }
                : defaultAvatar
            }
          />
        </UserImgWrapper>
        <TextSection style={isLast && { borderBottomWidth: 0 }}>
          <UserInfoText style={{ justifyContent: "flex-start" }}>
            <UserName>{`${member?.firstname} ${member?.lastname}`}</UserName>
            {isOwner && (
              <MaterialCommunityIcons name="crown" size={24} color="#ffbf00" />
            )}
          </UserInfoText>
        </TextSection>
      </UserInfo>
    </Card>
  );
};
