import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage"
import { Conversation, User } from "./types";

export async function takePhoto() {
    let result = ImagePicker.launchCameraAsync();
    return result;
  }

export const getUserData = async () => {
    return JSON.parse(await AsyncStorage.getItem("userData") as string) as User;
}

export const getToken = async () => {
    return await AsyncStorage.getItem("token");
}

export const saveStorage = async (userData: User, token: string) => {
    await AsyncStorage.setItem("userData", JSON.stringify(userData));
    await AsyncStorage.setItem("token", JSON.stringify(token));
}

export const removeStorage = async () => {
    await AsyncStorage.removeItem("userData");
    await AsyncStorage.removeItem("token");
}

export const getRecipientFromConversation = (
    conversation?: Conversation,
    userId?: string
) => {
    return userId == conversation?.creator?._id.toString()
        ? conversation?.recipient
        : conversation?.creator;
};