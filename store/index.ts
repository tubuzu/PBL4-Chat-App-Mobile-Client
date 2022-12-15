import { configureStore } from '@reduxjs/toolkit';
import conversationReducer from './conversations/conversationSlice';
import messageReducer from './messages/messageSlice';
import selectedTypeReducer from './selectedSlice';
import groupsReducer from './groups/groupSlice';
import groupMessagesReducer from './groupMessages/groupMessageSlice';
import messageContainerReducer from './messageContainer/messageContainerSlice';
// import groupSidebarReducer from './groupRecipientsSidebarSlice';
// import friendsReducer from './friends/friendsSlice';
// import rateLimitReducer from './rate-limit/rateLimitSlice';
import messagePanelReducer from './messagePanel/messagePanelSlice';
// import systemNotificationReducer from './system-notification/systemNotificationSlice';
// import settingsReducer from './settings/settingsSlice';

export const store = configureStore({
  reducer: {
    conversations: conversationReducer,
    messages: messageReducer,
    selectedConversationType: selectedTypeReducer,
    // friends: friendsReducer,
    groups: groupsReducer,
    groupMessages: groupMessagesReducer,
    messageContainer: messageContainerReducer,
    // groupSidebar: groupSidebarReducer,
    // rateLimit: rateLimitReducer,
    messagePanel: messagePanelReducer,
    // systemNotification: systemNotificationReducer,
    // settings: settingsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
