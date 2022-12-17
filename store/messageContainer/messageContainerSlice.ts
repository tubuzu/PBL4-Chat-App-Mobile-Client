import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MessageType } from '../../utils/types';

export interface MessageContainerState {
  selectedMessage?: MessageType;
  messageBeingEdited?: MessageType;
  messageBeingForward?: MessageType;
  isEditingMessage: boolean;
  isForwardingMessage: boolean;
  showContextMenu: boolean;
}

const initialState: MessageContainerState = {
  isEditingMessage: false,
  isForwardingMessage: false,
  showContextMenu: false,
};

export const messageContainerSlice = createSlice({
  name: 'messageContainer',
  initialState,
  reducers: {
    setSelectedMessage: (state, action) => {
      state.selectedMessage = action.payload;
    },
    setMessageBeingEdited: (state, action) => {
      state.messageBeingEdited = action.payload;
    },
    setIsEditing: (state, action: PayloadAction<boolean>) => {
      state.isEditingMessage = action.payload;
    },
    editMessageContent: (state, action) => {
      if (state.messageBeingEdited) state.messageBeingEdited.content = action.payload;
    },
    setIsForwarding: (state, action: PayloadAction<boolean>) => {
      state.isForwardingMessage = action.payload;
    },
    setMessageBeingForward: (state, action) => {
      state.messageBeingForward = action.payload;
    },
    // forwardMessage: (state, action) => {
    //   if (state.messageBeingForward) state.messageBeingForward.content = action.payload;
    // },
    resetMessageContainer: (state) => {
      state.isEditingMessage = false;
      state.messageBeingEdited = undefined;
      state.isForwardingMessage = false;
      state.messageBeingForward = undefined;
      state.selectedMessage = undefined;
    },
    toggleContextMenu: (state, action: PayloadAction<boolean>) => {
      state.showContextMenu = action.payload;
    },
    // setContextMenuLocation: (state, action: PayloadAction<Points>) => {
    //   state.points = action.payload;
    // },
  },
});

export const {
  setIsEditing,
  setMessageBeingEdited,
  setIsForwarding,
  setMessageBeingForward,
  setSelectedMessage,
  editMessageContent,
  // forwardMessage,
  resetMessageContainer,
  toggleContextMenu,
//   setContextMenuLocation,
} = messageContainerSlice.actions;

export default messageContainerSlice.reducer;
