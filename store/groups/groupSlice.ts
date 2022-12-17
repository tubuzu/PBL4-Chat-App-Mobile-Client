import {
  createAsyncThunk,
  createSelector,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import { RootState } from '..';
import {
  fetchGroups as fetchGroupsAPI,
  createGroup as createGroupAPI,
  removeGroupRecipient as removeGroupRecipientAPI,
  addGroupRecipient as addGroupRecipientAPI,
  updateGroupOwner as updateGroupOwnerAPI,
  leaveGroupAPI,
} from '../../screens/Group/queries';
import {
  AddGroupRecipientParams,
  CreateGroupParams,
  Group,
  Points,
  RemoveGroupRecipientParams,
  UpdateGroupOwnerParams,
} from '../../utils/types';

export interface GroupState {
  groups: Group[];
  showGroupContextMenu: boolean;
  selectedGroupContextMenu?: Group;
  points: Points;
}

const initialState: GroupState = {
  groups: [],
  showGroupContextMenu: false,
  points: { x: 0, y: 0 },
};

export const fetchGroupsThunk = createAsyncThunk('groups/fetch', () => {
  return fetchGroupsAPI();
});

export const createGroupThunk = createAsyncThunk(
  'groups/create',
  (params: CreateGroupParams) => createGroupAPI(params)
);

export const removeGroupRecipientThunk = createAsyncThunk(
  'groups/recipients/delete',
  (params: RemoveGroupRecipientParams) => removeGroupRecipientAPI(params)
);

export const addGroupRecipientThunk = createAsyncThunk(
  'groups/recipients/add',
  (params: AddGroupRecipientParams) => addGroupRecipientAPI(params)
);

export const updateGroupOwnerThunk = createAsyncThunk(
  'groups/owner/update',
  (params: UpdateGroupOwnerParams) => updateGroupOwnerAPI(params)
);

export const leaveGroupThunk = createAsyncThunk('groups/leave', (_id: string) =>
  leaveGroupAPI(_id)
);

export const groupsSlice = createSlice({
  name: 'groups',
  initialState,
  reducers: {
    addGroup: (state, action: PayloadAction<Group>) => {
      console.log(`addGroup reducer: Adding ${action.payload._id} to state`);
      state.groups.unshift(action.payload);
    },
    updateGroup: (state, action: PayloadAction<Group>) => {
      const updatedGroup = action.payload;
      const existingGroup = state.groups.find((g) => g._id === updatedGroup._id);
      const index = state.groups.findIndex((g) => g._id === updatedGroup._id);
      if (existingGroup) {
        state.groups[index] = updatedGroup;
        console.log('Updating Group....');
      }
    },
    removeGroup: (state, action: PayloadAction<Group>) => {
      console.log('removeGroup Reducer');
      const group = state.groups.find((g) => g._id === action.payload._id);
      const index = state.groups.findIndex((g) => g._id === action.payload._id);
      if (!group) return;
      state.groups.splice(index, 1);
    },
    toggleContextMenu: (state, action: PayloadAction<boolean>) => {
      state.showGroupContextMenu = action.payload;
    },
    setSelectedGroup: (state, action: PayloadAction<Group>) => {
      state.selectedGroupContextMenu = action.payload;
    },
    setContextMenuLocation: (state, action: PayloadAction<Points>) => {
      state.points = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGroupsThunk.fulfilled, (state, action) => {
        // console.log(action.payload.data);
        state.groups = action.payload.data;
      })
      .addCase(removeGroupRecipientThunk.fulfilled, (state, action) => {
        const { data: updatedGroup } = action.payload;
        console.log('removeGroupRecipientThunk.fulfilled');
        const existingGroup = state.groups.find(
          (g) => g._id === updatedGroup._id
        );
        const index = state.groups.findIndex((g) => g._id === updatedGroup._id);
        if (existingGroup) {
          state.groups[index] = updatedGroup;
          console.log('Updating Group....');
        }
      })
      .addCase(addGroupRecipientThunk.fulfilled, (state, action) => {
        const { data: updatedGroup } = action.payload;
        console.log('addGroupRecipientThunk.fulfilled');
        const existingGroup = state.groups.find(
          (g) => g._id === updatedGroup._id
        );
        const index = state.groups.findIndex((g) => g._id === updatedGroup._id);
        if (existingGroup) {
          state.groups[index] = updatedGroup;
          console.log('Updating Group....');
        }
      })
      .addCase(updateGroupOwnerThunk.fulfilled, (state, action) => {
        const { data: updatedGroup } = action.payload;
        console.log('updateGroupOwnerThunk.fulfilled');
        const existingGroup = state.groups.find(
          (g) => g._id === updatedGroup._id
        );
        const index = state.groups.findIndex((g) => g._id === updatedGroup._id);
        if (existingGroup) {
          state.groups[index] = updatedGroup;
          console.log('Updating Group....');
        }
      })
      .addCase(leaveGroupThunk.fulfilled, (state, action) => {
        console.log('leaveGroupThunk.fulfilled');
        const { data: groupId } = action.payload;
        const existingGroup = state.groups.find(
          (g) => g._id === groupId
        );
        const index = state.groups.findIndex((g) => g._id === groupId);
        if (existingGroup) {
          state.groups.splice(index, 1);
          console.log('Deleting Group....');
        }
      });
  },
});

// const selectGroups = (state: RootState) => state.groups.groups;
// const selectGroupId = (state: RootState, _id: string) => _id;

// export const selectGroupById = createSelector(
//   [selectGroups, selectGroupId],
//   (groups, groupId) => groups.find((g: Group) => g._id === groupId)
// );

export const {
  addGroup,
  updateGroup,
  removeGroup,
  toggleContextMenu,
  setContextMenuLocation,
  setSelectedGroup,
} = groupsSlice.actions;

export default groupsSlice.reducer;
