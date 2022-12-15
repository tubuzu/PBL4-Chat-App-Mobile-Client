import { axiosClient, config } from '../../utils/apis';
import { Conversation, CreateConversationParams } from '../../utils/types';

export const searchConversations = (query: string) =>
    axiosClient.get<Conversation[]>(`/conversations/search?search=${query}`, config());

export const getConversations = () => {
    return axiosClient.get<Conversation[]>(`/conversations`, config());
}

export const getConversationById = (id: string) =>
    axiosClient.get<Conversation>(`/conversations/${id}`, config());

export const postNewConversation = (data: CreateConversationParams) =>
    axiosClient.post<Conversation>(`/conversations`, data, config());

// export const checkConversationOrCreate = (userId: string) =>
//     axiosClient.get<Conversation>(`/exists/conversations/${userId}`, config());