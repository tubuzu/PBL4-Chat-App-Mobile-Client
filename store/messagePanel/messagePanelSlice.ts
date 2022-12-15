import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Attachment } from '../../utils/types';

export interface MessagePanelState {
  attachments: Attachment[];
  attachmentCounter: number;
}

const initialState: MessagePanelState = {
  attachments: [],
  attachmentCounter: 0,
};

export const messagePanelSlice = createSlice({
  name: 'messagePanel',
  initialState,
  reducers: {
    addAttachment: (state, action: PayloadAction<Attachment>) => {
      state.attachments.push(action.payload);
      state.attachmentCounter++;
    },
    removeAttachment: (state, action: PayloadAction<Attachment>) => {
      state.attachments = state.attachments.filter(
        (file) => file._id !== action.payload._id
      );
    },
    removeAllAttachments: (state) => {
      state.attachments = [];
      state.attachmentCounter = 0;
    },
  },
});

export const {
  addAttachment,
  removeAttachment,
  removeAllAttachments,
} = messagePanelSlice.actions;

export default messagePanelSlice.reducer;
