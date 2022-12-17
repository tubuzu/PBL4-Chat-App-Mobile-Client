import { axiosClient, config, formConfig } from '../../utils/apis';
import { ChangePasswordParams, UpdateStatusParams, User } from "../../utils/types";

export const updateUserProfile = (data: FormData) =>
  axiosClient.patch<User>('/user/profile', data, formConfig());

export const updateStatusMessage = (data: UpdateStatusParams) =>
  axiosClient.patch('/user/status', data, config());

export const changePassword = (data: ChangePasswordParams) =>
  axiosClient.patch('/user/password', data, config());