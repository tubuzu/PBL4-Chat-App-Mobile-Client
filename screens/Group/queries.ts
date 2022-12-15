import { axiosClient, config } from '../../utils/apis';
import { AddGroupRecipientParams, CreateGroupParams, Group, RemoveGroupRecipientParams, UpdateGroupOwnerParams } from '../../utils/types';

export const searchGroups = (query: string) =>
    axiosClient.get<Group[]>(`/groups/search?search=${query}`, config());

export const fetchGroups = () => axiosClient.get<Group[]>(`/groups`, config());

export const fetchGroupById = (_id: string) =>
    axiosClient.get<Group>(`/groups/${_id}`, config());

export const createGroup = (params: CreateGroupParams) =>
    axiosClient.post(`/groups`, params, config());

export const addGroupRecipient = ({ _id, recipients }: AddGroupRecipientParams) =>
    axiosClient.post(`/groups/${_id}/recipients`, { recipients }, config());

export const removeGroupRecipient = ({
    _id,
    userId,
}: RemoveGroupRecipientParams) =>
    axiosClient.delete<Group>(`/groups/${_id}/recipients/${userId}`, config());

export const updateGroupOwner = ({ _id, newOwnerId }: UpdateGroupOwnerParams) =>
    axiosClient.patch(`/groups/${_id}/owner`, { newOwnerId }, config());

export const leaveGroupAPI = (_id: string) =>
    axiosClient.delete(`/groups/${_id}/leave`, config());