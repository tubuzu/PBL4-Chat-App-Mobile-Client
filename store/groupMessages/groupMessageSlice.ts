import {
  createAsyncThunk,
  createSelector,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import { RootState } from '..';
import {
  deleteGroupMessage as deleteGroupMessageAPI,
  fetchGroupMessages as fetchGroupMessagesAPI,
  editGroupMessage as editGroupMessageAPI,
} from '../../utils/apis';
import {
  DeleteGroupMessageParams,
  DeleteGroupMessageResponse,
  EditMessagePayload,
  GroupMessage,
  GroupMessageEventPayload,
  GroupMessageType,
} from '../../utils/types';

export interface GroupMessagesState {
  messages: GroupMessage[];
}

const initialState: GroupMessagesState = {
  messages: [],
};

export const fetchGroupMessagesThunk = createAsyncThunk(
  'groupMessages/fetch',
  (id: string) => fetchGroupMessagesAPI(id)
);

export const deleteGroupMessageThunk = createAsyncThunk(
  'groupMessages/delete',
  (params: DeleteGroupMessageParams) => deleteGroupMessageAPI(params)
);

export const editGroupMessageThunk = createAsyncThunk(
  'groupMessages/edit',
  (params: EditMessagePayload) => editGroupMessageAPI(params)
);

export const groupMessagesSlice = createSlice({
  name: 'groupMessages',
  initialState,
  reducers: {
    addGroupMessage: (
      state,
      action: PayloadAction<GroupMessageEventPayload>
    ) => {
      const { group, message } = action.payload;
      const groupMessage = state.messages.find((gm) => gm._id === group._id);
      groupMessage?.messages.unshift(message);
    },
    editGroupMessage: (state, action: PayloadAction<GroupMessageType>) => {
      console.log('editGroupMessageThunk.fulfilled');
      const { payload } = action;
      const { _id } = payload.group;
      const groupMessage = state.messages.find((gm) => gm._id === _id);
      if (!groupMessage) return;
      const messageIndex = groupMessage.messages.findIndex(
        (m) => m._id === payload._id
      );
      console.log(messageIndex);
      groupMessage.messages[messageIndex] = payload;
      console.log('Updated Message');
    },
    deleteGroupMessage: (state, action: PayloadAction<DeleteGroupMessageResponse>) => {
      console.log('deleteGroupMessageThunk.fulfilled');
      const { payload } = action;
      const groupMessages = state.messages.find((gm) => gm._id === payload.groupId);
      if (!groupMessages) return;
      const messageIndex = groupMessages.messages.findIndex(
        (m) => m._id === payload.messageId
      );
      groupMessages.messages.splice(messageIndex, 1);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGroupMessagesThunk.fulfilled, (state, action) => {
        const { _id } = action.payload.data;
        console.log('fetchGroupMessagesThunk.fulfilled');
        console.log(action.payload.data);
        const index = state.messages.findIndex((gm) => gm._id === _id);
        const exists = state.messages.find((gm) => gm._id === _id);
        exists
          ? (state.messages[index] = action.payload.data)
          : state.messages.push(action.payload.data);
      })
      .addCase(deleteGroupMessageThunk.fulfilled, (state, action) => {
        console.log('deleteGroupMessageThunk.fulfilled');

        const { data } = action.payload;
        const groupMessages = state.messages.find(
          (gm) => gm._id === data.groupId
        );
        if (!groupMessages) return;
        const messageIndex = groupMessages.messages.findIndex(
          (m) => m._id === data.messageId
        );
        groupMessages?.messages.splice(messageIndex, 1);
      })
      .addCase(editGroupMessageThunk.fulfilled, (state, action) => {
        console.log('editGroupMessageThunk.fulfilled');
        const { data } = action.payload;
        const { _id } = data.group;
        const groupMessage = state.messages.find((gm) => gm._id === _id);
        if (!groupMessage) return;
        const messageIndex = groupMessage.messages.findIndex(
          (m) => m._id === data._id
        );
        console.log(messageIndex);
        groupMessage.messages[messageIndex] = data;
        console.log('Updated Message');
      });
  },
});

const selectGroupMessages = (state: RootState) => state.groupMessages.messages;
const selectGroupMessageId = (state: RootState, _id: string) => _id;

export const selectGroupMessage = createSelector(
  [selectGroupMessages, selectGroupMessageId],
  (groupMessages, _id) => groupMessages.find((gm: any) => gm._id === _id)
);

export const { addGroupMessage, editGroupMessage, deleteGroupMessage } = groupMessagesSlice.actions;

export default groupMessagesSlice.reducer;
