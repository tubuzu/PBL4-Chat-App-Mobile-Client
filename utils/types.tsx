export type message = {
    text: string;
    time: any;
}

export type CreateUserParams = {
    username: string;
    firstname: string;
    lastname: string;
    email: string;
    password: string;
};

export type UserCredentialsParams = {
    email: string;
    password: string;
};

export type UserResponse = {
    userData: User;
    token: string;
}

export type User = {
    _id: string;
    username: string;
    email: string;
    firstname: string;
    lastname: string;
    about: string;
    avatar : {
        url: string;
    };
    background: {
        url: string;
    };
    statusMessage: string;
    showOffline: boolean;
};

export type UserProfileResponse = {
    _id: string;
    username: string;
    about: string;
    avatar : {
        url: string;
    };
    background: {
        url: string;
    };
};

export type Conversation = {
    _id: string;
    creator: User;
    recipient: User;
    createdAt: string;
    latestMessage: MessageType;
};

export type CreateConversationParams = {
    userId: string;
    // message: string;
};

export type MessageAttachment = {
    _id: string;
    url: string;
    cloudId: string;
};

export type MessageType = {
    _id: string;
    content?: string;
    createdAt: string;
    sender: User;
    conversation: Conversation;
    attachments?: MessageAttachment[];
};

export type GroupMessageType = {
    _id: string;
    content?: string;
    createdAt: string;
    sender: User;
    group: Group;
    attachments?: MessageAttachment[];
};

export type FetchMessagePayload = {
    _id: string;
    messages: MessageType[];
};

export type FetchGroupMessagePayload = {
    _id: string;
    messages: GroupMessageType[];
};

export type MessageEventPayload = {
    message: MessageType;
    conversation: Conversation;
};

export type CreateMessageParams = {
    _id: string;
    content: string;
};

export type ConversationMessage = {
    _id: string;
    messages: MessageType[];
};

export type GroupMessage = {
    _id: string;
    messages: GroupMessageType[];
};

export type DeleteMessageParams = {
    _id: string;
    messageId: string;
};

export type DeleteGroupMessageParams = {
    _id: string;
    messageId: string;
};

export type DeleteMessageResponse = {
    conversationId: string;
    messageId: string;
};

export type DeleteGroupMessageResponse = {
    groupId: string;
    messageId: string;
};

export type MessagePanelBodyProps = {
    isTyping: boolean;
};

export type EditMessagePayload = {
    _id: string;
    messageId: string;
    content: string;
};

export type ConversationType = 'group' | 'private';

export type ConversationTypeData = {
    type: ConversationType;
    label: string;
};

export type Group = {
    _id: string;
    title?: string;
    users: User[];
    creator: User;
    owner: User;
    messages: GroupMessageType[];
    createdAt: number;
    latestMessage: MessageType;
};

export type GroupMessageEventPayload = {
    message: GroupMessageType;
    group: Group;
};

export type CreateGroupParams = {
    users: string[];
    title: string;
};

export type AddGroupRecipientParams = {
    _id: string;
    recipients: string[];
};

export type RemoveGroupRecipientParams = {
    _id: string;
    userId: string;
};

export type Points = {
    x: number;
    y: number;
};

export type UserContextMenuActionType = 'kick' | 'transfer_owner' | 'profile';
export type ContextMenuItemType = {
    label: string;
    action: UserContextMenuActionType;
    color: string;
    ownerOnly: boolean;
};

export type AddGroupUserMessagePayload = {
    group: Group;
    user: User;
};

export type RemoveGroupUserMessagePayload = {
    group: Group;
    user: User;
};

export type UpdateGroupOwnerParams = {
    _id: string;
    newOwnerId: string;
};

export type ContextMenuEvent = React.MouseEvent<HTMLDivElement, MouseEvent>;
export type DivMouseEvent = React.MouseEvent<HTMLDivElement, MouseEvent>;
export type InputChangeEvent = React.ChangeEvent<HTMLInputElement>;
export type DragEvent = React.DragEvent<HTMLTextAreaElement>;
export type ClipboardEvent = React.ClipboardEvent<HTMLTextAreaElement>;

export type FriendRequestStatus = 'accepted' | 'pending' | 'rejected';

export type Friend = {
    _id: string;
    sender: User;
    receiver: User;
    createdAt: number;
};

export type FriendRequest = {
    _id: string;
    sender: User;
    receiver: User;
    createdAt: number;
    status: FriendRequestStatus;
};

export type HandleFriendRequestAction = 'accept' | 'reject' | 'cancel';

export type CancelFriendRequestResponse = {
    _id: string;
};

export type AcceptFriendRequestResponse = {
    friend: Friend;
    friendRequest: FriendRequest;
};

export type UserSidebarRouteType =
    | 'conversations'
    | 'friends'
    | 'settings';

export type UserSidebarItemType = {
    _id: UserSidebarRouteType;
    pathname: string;
};

export type SettingsSidebarRouteType =
    | 'profile'
    | 'security'
    | 'notifications'
    | 'integrations'
    | 'appearance';

export type SettingsItemType = {
    _id: SettingsSidebarRouteType;
    label: string;
    pathname: string;
};

export type RateLimitType = 'group' | 'private';

export type UpdateRateLimitPayload = {
    type: RateLimitType;
    status: boolean;
};

export type UpdateProfileParams = Partial<{
    about: string;
    avatar: File;
    background: File;
}>;

export type Attachment = {
    _id: number;
    file: File;
};

export type FriendRequestDetailsType = {
    status: string;
    displayName: string;
    user: User;
    incoming: boolean;
};

export type SystemMessageLevel = 'info' | 'warning' | 'error';
export type SystemMessageType = {
    _id: number;
    content: string;
    level: SystemMessageLevel;
};

export type SystemNotificationLevel = 'success' | 'error' | 'info';
export type SystemNotificationType = {
    content: string;
    level: SystemNotificationLevel;
};

export type UpdateStatusParams = {
    statusMessage: string;
};

export type ChangePasswordParams = {
    password: string;
    newPassword: string;
};

export type SelectableTheme = 'dark' | 'light';