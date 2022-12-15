import { axiosClient, config } from '../../utils/apis';
import { CreateUserParams, User, UserCredentialsParams } from '../../utils/types';
import AsyncStorage from "@react-native-async-storage/async-storage";

export const postRegisterUser = (data: CreateUserParams) =>
    axiosClient.post(`/user`, data, config());

export const postLoginUser = (data: UserCredentialsParams) =>
    axiosClient.post(`/user/login`, data, config());

export const getAllUsers = () =>
    axiosClient.get<User[]>(`/user`, config());

export const getAuthJWT = async () =>
    axiosClient.get(`/user/authJWT`, {
        headers: {
            "Content-type": "application/json",
            "Authorization": `${"Bearer ".concat(await AsyncStorage.getItem("token")! || '').replaceAll('"', '')}`,
        },
    });