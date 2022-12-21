import React, { useState } from "react";
import { StyleSheet, Text, TouchableHighlight, View } from "react-native";
import { Group, User } from "../../utils/types";
import { GroupUsersItem } from "./GroupUsersItem";
import { AntDesign } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import {
  setSelectedUser,
  toggleContextMenu,
} from "../../store/groups/groupRecipientsSidebarSlice";

type Props = {
  title: string;
  users: User[];
  group?: Group;
};

function GroupUserDropdown({ title, users, group }: Props) {
  const [drop, setDrop] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const onUserContextMenu = (user: User) => {
    console.log(user);
    dispatch(toggleContextMenu(true));
    dispatch(setSelectedUser(user));
  };
  return (
    <View>
      <TouchableHighlight
        underlayColor={"rgba(0,0,0,0.1)"}
        onPress={() => {
          setDrop(!drop);
        }}
      >
        <View style={styles.dropdownHeader}>
          <Text style={{ fontSize: 16 }}>{`${title} (${users?.length})`}</Text>
          {drop ? (
            <AntDesign name="up" size={24} color="black" />
          ) : (
            <AntDesign name="down" size={24} color="black" />
          )}
        </View>
      </TouchableHighlight>
      {drop &&
        users.map((user, index) => {
          return (
            <GroupUsersItem
              member={user}
              key={user?._id}
              isLast={index === users.length - 1}
              isOwner={user._id.toString() == group?.owner?._id.toString()}
              onContextMenu={() => onUserContextMenu(user)}
            />
          );
        })}
    </View>
  );
}

const styles = StyleSheet.create({
  dropdownContainer: {
    flexDirection: "column",
  },
  dropdownHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
  },
});

export default GroupUserDropdown;
