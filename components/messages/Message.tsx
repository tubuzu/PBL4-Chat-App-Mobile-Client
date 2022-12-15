import { formatRelative } from "date-fns";
import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlexAlignType,
  Image,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import defaultAvatar from "../../assets/default_avatar.jpg";
import { AppDispatch, RootState } from "../../store";
import { setSelectedMessage } from "../../store/messageContainer/messageContainerSlice";
import ImageAttachments from "./ImageAttachments";

type MessageProps = {
  time: any;
  isLeft: boolean;
  isFirst: boolean;
  isLast: boolean;
  message: any;
  displayMessageTime: boolean;
  setDisplayMessageTime: any;
};
type LeftMessageStyleProps = {
  color?: string;
  alignSelf?: FlexAlignType | "auto" | undefined;
  alignItems?: FlexAlignType | undefined;
  justifyContent?: any;
  backgroundColor?: string;
  borderTopLeftRadius?: number;
  borderTopRightRadius?: number;
  borderBottomLeftRadius?: number;
  borderBottomRightRadius?: number;
};

const MessageBorderRadius = 20;
const SecondMessageBorderRadius = 5;

const Message = ({
  time,
  isLeft,
  isFirst,
  isLast,
  message,
  displayMessageTime,
  setDisplayMessageTime,
}: MessageProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const selectedMessage = useSelector(
    (state: RootState) => state.messageContainer.selectedMessage
  );

  const { width } = useWindowDimensions();
  const imageContainerWidth = width * 0.8 - 30;

  const isOnLeft = (type: any): LeftMessageStyleProps => {
    if (isLeft) {
      if (type === "messageContainer") {
        return {
          alignSelf: "flex-start",
        };
      } else if (type === "messageContentContainer") {
        return {
          alignItems: "flex-start",
        };
      } else if (type === "messageContent") {
        if (isFirst && isLast) {
          return {
            backgroundColor: "white",
          };
        } else if (isFirst) {
          return {
            backgroundColor: "white",
            borderBottomLeftRadius: SecondMessageBorderRadius,
          };
        } else if (isLast) {
          return {
            backgroundColor: "white",
            borderTopLeftRadius: SecondMessageBorderRadius,
          };
        } else
          return {
            backgroundColor: "white",
            borderTopLeftRadius: SecondMessageBorderRadius,
            borderBottomLeftRadius: SecondMessageBorderRadius,
          };
      } else if (type === "message") {
        return {
          alignSelf: "flex-start",
          color: "#000",
        };
      } else if (type === "time") {
        return {
          alignSelf: "flex-start",
          color: "darkgray",
        };
      } else if (type === "images") {
        return {
          justifyContent: "flex-start",
        };
      }
    } else {
      if (isFirst && isLast) {
        return {};
      } else if (isFirst) {
        return {
          borderBottomRightRadius: SecondMessageBorderRadius,
        };
      } else if (isLast) {
        return {
          borderTopRightRadius: SecondMessageBorderRadius,
        };
      } else
        return {
          borderTopRightRadius: SecondMessageBorderRadius,
          borderBottomRightRadius: SecondMessageBorderRadius,
        };
    }
    return {};
  };
  const handlePress = () => {
    dispatch(setSelectedMessage(message));
    if (!displayMessageTime || selectedMessage?._id === message._id)
      setDisplayMessageTime(!displayMessageTime);
  };
  return (
    <View
      style={[
        styles.container,
        isFirst && { paddingTop: 8 },
        isLast && { paddingBottom: 8 },
      ]}
    >
      <View style={[styles.messageContainer, isOnLeft("messageContainer")]}>
        {isLeft &&
          (isLast ? (
            <Image
              source={
                message.sender?.avatar?.url
                  ? { uri: message.sender?.avatar?.url }
                  : defaultAvatar
              }
              style={{
                width: 37,
                height: 37,
                borderRadius: 25,
                marginRight: 5,
              }}
            />
          ) : (
            <View
              style={{
                width: 37,
                height: 37,
                marginRight: 5,
                // backgroundColor: "green",
              }}
            ></View>
          ))}
        <View
          style={[
            styles.messageContentContainer,
            isOnLeft("messageContentContainer"),
          ]}
        >
          {message?.attachments?.length > 0 && (
            <View
              style={[
                { width: imageContainerWidth },
                styles.images,
                isOnLeft("images"),
              ]}
            >
              <ImageAttachments attachments={message.attachments} />
              {/* <VideoAttachments
                attachments={videoAttachments}
                width={imageContainerWidth}
              /> */}
            </View>
          )}
          {message?.content && (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={handlePress}
              onLongPress={() => {
                console.log("Long Press");
              }}
              style={[styles.messageContent, isOnLeft("messageContent")]}
            >
              <View style={styles.messageView}>
                <Text style={[styles.message, isOnLeft("message")]}>
                  {message.content}
                </Text>
              </View>
              {displayMessageTime && message._id === selectedMessage?._id && (
                <View style={styles.timeView}>
                  <Text style={[styles.time, isOnLeft("time")]}>
                    {formatRelative(new Date(time), new Date())}
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 1,
    // backgroundColor: "black",
  },
  messageContainer: {
    maxWidth: "80%",
    alignSelf: "flex-end",
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "center",
    marginHorizontal: 5,
    flexWrap: "wrap",
    // backgroundColor: "blue",
  },
  messageContentContainer: {
    flex: 1,
    alignItems: "flex-end",
    // backgroundColor: "red",
  },
  messageContent: {
    backgroundColor: "#696969",
    borderRadius: MessageBorderRadius,
    paddingHorizontal: 15,
    paddingTop: 5,
    paddingBottom: 8,
    flexDirection: "column",
  },
  messageView: {
    backgroundColor: "transparent",
  },
  timeView: {
    backgroundColor: "transparent",
    justifyContent: "flex-start",
  },
  message: {
    alignSelf: "flex-end",
    color: "white",
    fontSize: 18,
  },
  time: {
    color: "lightgray",
    alignSelf: "flex-end",
    fontSize: 10,
  },

  images: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-end",
  },
});

export default Message;
