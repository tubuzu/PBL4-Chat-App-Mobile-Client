import { useRoute } from "@react-navigation/native";
import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import ContextMenuPopup from "../../components/action-menu/ContextMenuPopup";
import GroupSettingActionMenu from "../../components/action-menu/GroupSettingActionMenu";
import GroupUserDropdown from "../../components/group/GroupUserDropdown";
import { AppDispatch, RootState } from "../../store";
import {
  setSelectedUser,
  toggleContextMenu,
} from "../../store/groups/groupRecipientsSidebarSlice";
import { selectGroupById } from "../../store/groups/groupSlice";
import { SocketContext } from "../../utils/context/SocketContext";
import { Group, User } from "../../utils/types";

function GroupSettings() {
  const route: any = useRoute();
  const groupId = route.params.groupId;

  const [onlineUsers, setOnlineUsers] = useState<User[]>([]);

  const dispatch = useDispatch<AppDispatch>();
  const socket = useContext(SocketContext);
  const group = useSelector((state: RootState) =>
    state.groups.groups.find((g: Group) => g._id === groupId)
  );
  const { showUserContextMenu } = useSelector(
    (state: RootState) => state.groupSidebar
  );
  const groupSidebarState = useSelector(
    (state: RootState) => state.groupSidebar
  );
  useEffect(() => {
    socket.emit("getOnlineGroupUsers", { groupId });
    const interval = setInterval(() => {
      socket.emit("getOnlineGroupUsers", { groupId });
    }, 5000);
    socket.on("onlineGroupUsersReceived", (payload: any) => {
      console.log("received onlineGroupUsersReceived event");
      setOnlineUsers(payload.onlineUsers);
    });
    return () => {
      console.log("Clearing Interval for GroupRecipientsSidebar");
      clearInterval(interval);
      socket.off("onlineGroupUsersReceived");
    };
  }, [group, groupId]);


  return (
    <>
      <View style={styles.participantsContainer}>
        <GroupUserDropdown title="Online Users" users={onlineUsers} group={group} />
        <GroupUserDropdown
          title="Offline Users"
          users={
            group?.users.filter(
              (user) =>
                !onlineUsers.find((onlineUser) => onlineUser._id === user._id)
            )!
          }
          group={group}
        />
      </View>
      <ContextMenuPopup
        modalVisible={showUserContextMenu}
        setModalVisible={(visable: boolean) =>
          dispatch(toggleContextMenu(visable))
        }
      >
        <GroupSettingActionMenu
          modalVisible={showUserContextMenu}
          setModalVisible={(visable: boolean) =>
            dispatch(toggleContextMenu(visable))
          }
        />
      </ContextMenuPopup>
    </>
  );
}

const styles = StyleSheet.create({
  participantsContainer: {
    width: "100%",
    flexDirection: "column",
    flex: 1,
    padding: 10,
  },
  dropdownContainer: {
    flexDirection: "column",
  },
  dropdownItem: {},
});

export default GroupSettings;
