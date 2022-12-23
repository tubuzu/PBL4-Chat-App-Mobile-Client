import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Conversation, CreateConversationParams } from '../../utils/types';
import { getConversations, postNewConversation } from '../../screens/Conversations/queries';
import { RootState } from '..';

export interface ConversationsState {
  conversations: Conversation[];
  showContextMenu: boolean;
  selectedContextMenu?: Conversation;
  loading: boolean;
}

const initialState: ConversationsState = {
  conversations: [],
  showContextMenu: false,
  loading: false,
};

export const fetchConversationsThunk = createAsyncThunk('conversations/fetch', async () => {
  return getConversations();
});

// .then((data) => {
//   console.log(data);
//   return data;
// }).catch((err) => {
//   console.log(err);
//   throw err;
// })

export const createConversationThunk = createAsyncThunk(
  'conversations/create',
  async (data: CreateConversationParams) => {
    return postNewConversation(data);
  }
);

export const conversationsSlice = createSlice({
  name: 'conversations',
  initialState,
  reducers: {
    addConversation: (state, action: PayloadAction<Conversation>) => {
      console.log('addConversation');
      const { _id } = action.payload;
      const index = state.conversations.findIndex((cm) => cm._id === _id);
      const exists = state.conversations.find((c) => c._id === _id);
      if (exists) {
        state.conversations[index] = action.payload;
      }
      else state.conversations.unshift(action.payload);
    },
    updateConversation: (state, action: PayloadAction<Conversation>) => {
      console.log('Inside updateConversation');
      const conversation = action.payload;
      const index = state.conversations.findIndex((c) => c._id === conversation._id);
      state.conversations.splice(index, 1);
      state.conversations.unshift(conversation);
    },
    toggleContextMenu: (state, action: PayloadAction<boolean>) => {
      state.showContextMenu = action.payload;
    },
    setSelectedConversation: (state, action: PayloadAction<Conversation>) => {
      state.selectedContextMenu = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchConversationsThunk.fulfilled, (state, action) => {
        state.conversations = action.payload.data;
        // console.log('fullfilled')
        state.loading = false;
      })
      .addCase(fetchConversationsThunk.pending, (state, action) => {
        // console.log('pending')
        state.loading = true;
      })
      .addCase(createConversationThunk.fulfilled, (state, action) => {
        console.log('CreateConversationFulfilled');
        console.log(action.payload.data);
        const { _id } = action.payload.data;
        const index = state.conversations.findIndex((cm) => cm._id === _id);
        const exists = state.conversations.find((c) => c._id === _id);
        if (exists) {
          state.conversations[index] = action.payload.data;
        }
        else state.conversations.unshift(action.payload.data);
      });
  },
});

const selectConversations = (state: RootState) => state.conversations.conversations;
const selectConversationId = (state: RootState, id: string) => id;

export const selectConversationById = createSelector(
  [selectConversations, selectConversationId],
  (conversations, conversationId) => conversations.find((c: Conversation) => c._id === conversationId)
);

// Action creators are generated for each case reducer function
export const { addConversation, updateConversation, toggleContextMenu, setSelectedConversation } = conversationsSlice.actions;

export default conversationsSlice.reducer;
