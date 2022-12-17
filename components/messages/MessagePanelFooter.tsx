import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  View,
  // Text,
  StyleSheet,
  TextInput,
  Platform,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";

import Animated, {
  useSharedValue,
  withSpring,
  withTiming,
  useAnimatedStyle,
} from "react-native-reanimated";
import * as ImagePicker from "expo-image-picker";
// import Voice from "@react-native-voice/voice";

import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { Ionicons } from "@expo/vector-icons";
// import EmojiPicker from "../emojis/EmojiPicker";
import { LightTheme } from "../../utils/themes";
import { takePhoto } from "../../utils/helpers";
// import { useDispatch, useSelector } from "react-redux";
// import { RootState } from "../../store";
// import { useTheme } from "styled-components/native";

// import { useKeyboard } from "@react-native-community/hooks";

// import { theme } from "../../theme";

type Props = {
  content: string;
  setContent: Dispatch<SetStateAction<string>>;
  files: ImagePicker.ImagePickerAsset[];
  setFiles: Dispatch<SetStateAction<ImagePicker.ImagePickerAsset[]>>;
  sendMessage: () => void;
  sendImage: (file: ImagePicker.ImagePickerAsset) => void;
  // sendTypingStatus: () => void;
};

const MessagePanelFooter = ({
  content,
  setContent,
  files,
  setFiles,
  sendMessage,
  sendImage,
}: Props) => {
  const MAX_LENGTH = 2048;
  // const dispatch = useDispatch();
  // const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const height = useSharedValue(70);

  // let [started, setStarted] = useState(false);
  // let [results, setResults] = useState([]);

  // useEffect(() => {
  //   Voice.onSpeechError = onSpeechError;
  //   Voice.onSpeechResults = onSpeechResults;

  //   return () => {
  //     Voice.destroy().then(Voice.removeAllListeners);
  //   };
  // }, []);

  // const startSpeechToText = async () => {
  //   console.log("startSpeechToText")
  //   await Voice.start("en-NZ");
  //   setStarted(true);
  // };

  // const stopSpeechToText = async () => {
  //   console.log("stopSpeechToText")
  //   await Voice.stop();
  //   setStarted(false);
  //   console.log(results);
  // };

  // const onSpeechResults = (result: any) => {
  //   console.log("onSpeechResults")
  //   setResults(result.value);
  // };

  // const onSpeechError = (error: any) => {
  //   console.log("onSpeechError")
  //   console.log(error);
  // };

  useEffect(() => {
    if (files.length) {
      height.value = withTiming(175);
    } else {
      height.value = withSpring(70);
    }
  }, [files]);

  const heightAnimatedStyle = useAnimatedStyle(() => {
    return {
      height: height.value,
    };
  });

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      quality: 1,
      allowsMultipleSelection: true,
    });

    if (!result.canceled) {
      if (result.assets && result.assets.length <= 5) {
        setFiles(result.assets);
        // console.log("assets: ", files);
      } else {
        setFiles([]);
        // console.log("!assets: ", files);
      }
    }
  };

  const handlePhotoPicker = async () => {
    const result = await takePhoto();
    if (!result.canceled) {
      sendImage(result.assets[0]);
    }
  };
  // console.log(files);
  return (
    <>
      <Animated.View style={[styles.container, heightAnimatedStyle]}>
        {files.length > 0 && (
          <View style={styles.attachmentsContainer}>
            <FlatList
              data={files}
              horizontal
              renderItem={({ item }) => (
                <>
                  <Image
                    source={{ uri: item.uri }}
                    style={styles.selectedImage}
                    resizeMode="contain"
                  />

                  {/* {progresses[item.uri] && (
                  <View
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      backgroundColor: "#8c8c8cAA",
                      padding: 5,
                      borderRadius: 50,
                    }}
                  >
                    <Text style={{ color: "white", fontWeight: "bold" }}>
                      {(progresses[item.uri] * 100).toFixed(0)} %
                    </Text>
                  </View>
                )} */}

                  <Ionicons
                    name="close-circle"
                    onPress={() =>
                      setFiles((existingFiles) =>
                        existingFiles.filter((file) => file !== item)
                      )
                    }
                    size={20}
                    color="gray"
                    style={styles.removeSelectedImage}
                  />
                </>
              )}
            />
          </View>
        )}
        <View style={styles.innerContainer}>
          <View style={styles.inputAndMicrophone}>
            <TextInput
              multiline
              maxLength={MAX_LENGTH}
              placeholder={"Type something..."}
              style={styles.input}
              value={content}
              onChangeText={(text) => setContent(text)}
            />
            <TouchableOpacity style={styles.rightIconButtonStyle}>
              <Ionicons
                name="image"
                size={23}
                onPress={pickImage}
                color={LightTheme.colors.description}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.rightIconButtonStyle}>
              <Icon
                name="camera"
                size={23}
                onPress={handlePhotoPicker}
                color={LightTheme.colors.description}
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
            <Icon name={"send"} size={23} color={LightTheme.colors.white} />
          </TouchableOpacity>

          {/* {
            content || files.length ? (
              <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
                <Icon name={"send"} size={23} color={LightTheme.colors.white} />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity style={styles.sendButton}>
                <Icon
                  name={"microphone"}
                  size={23}
                  color={LightTheme.colors.white}
                />
              </TouchableOpacity>
            )

            !started ? (
              <TouchableOpacity
                style={styles.sendButton}
                onPress={startSpeechToText}
              >
                <Icon
                  name={"microphone"}
                  size={23}
                  color={LightTheme.colors.white}
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={styles.sendButton}
                onPress={stopSpeechToText}
              >
                <Icon name={"pause"} size={23} color={LightTheme.colors.white} />
              </TouchableOpacity>
            )
          } */}
        </View>
      </Animated.View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    backgroundColor: "rgba(255,255,255,0.6)",
  },
  replyContainer: {
    paddingHorizontal: 10,
    marginHorizontal: 10,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  title: {
    marginTop: 5,
    fontWeight: "bold",
  },
  closeReply: {
    position: "absolute",
    right: 10,
    top: 5,
  },
  reply: {
    marginTop: 5,
  },
  innerContainer: {
    paddingHorizontal: 10,
    marginHorizontal: 10,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    paddingVertical: 10,
  },
  inputAndMicrophone: {
    flexDirection: "row",
    backgroundColor: LightTheme.colors.input.inputBackground,
    flex: 3,
    marginRight: 10,
    paddingVertical: Platform.OS === "ios" ? 10 : 0,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "space-between",
  },
  input: {
    backgroundColor: "transparent",
    paddingLeft: 20,
    color: LightTheme.colors.input.inputText,
    flex: 3,
    fontSize: 15,
    height: 50,
    alignSelf: "center",
  },
  rightIconButtonStyle: {
    justifyContent: "center",
    alignItems: "center",
    paddingRight: 15,
    paddingLeft: 10,
    borderLeftWidth: 1,
    borderLeftColor: "#fff",
    // borderLeftColor: "#f0f0f0",
  },
  swipeToCancelView: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 30,
  },
  swipeText: {
    color: LightTheme.colors.description,
    fontSize: 15,
  },
  emoticonButton: {
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: 10,
  },
  recordingActive: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingLeft: 10,
  },
  recordingTime: {
    color: LightTheme.colors.description,
    fontSize: 20,
    marginLeft: 5,
  },
  microphoneAndLock: {
    alignItems: "center",
    justifyContent: "flex-end",
  },
  lockView: {
    backgroundColor: "#eee",
    width: 60,
    alignItems: "center",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    height: 130,
    paddingTop: 20,
  },
  sendButton: {
    backgroundColor: LightTheme.colors.primary,
    borderRadius: 50,
    height: 50,
    width: 50,
    alignItems: "center",
    justifyContent: "center",
  },

  attachmentsContainer: {
    alignItems: "flex-end",
  },
  selectedImage: {
    height: 90,
    width: 180,
    margin: 5,
  },
  removeSelectedImage: {
    position: "absolute",
    right: 10,
    backgroundColor: "white",
    borderRadius: 10,
    overflow: "hidden",
  },
});

export default MessagePanelFooter;
