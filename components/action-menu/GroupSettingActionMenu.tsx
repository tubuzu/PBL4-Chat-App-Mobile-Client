import React, { useContext } from "react";
import { StyleSheet, Text, TouchableHighlight, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { selectType } from "../../store/selectedSlice";
import { AuthContext } from "../../navigation/AuthProvider";
import { useNavigation } from "@react-navigation/native";
import {
  removeGroupRecipient,
  updateGroupOwner,
} from "../../screens/Group/queries";
import { selectGroupById } from "../../store/groups/groupSlice";

type Props = {
  modalVisible: boolean;
  setModalVisible: any;
};
function GroupSettingActionMenu({ modalVisible, setModalVisible }: Props) {
  const route: any = useRoute();
//   const navigation: any = useNavigation();
  const { user } = useContext(AuthContext);
  const _id = route.params.groupId;
//   const dispatch = useDispatch<AppDispatch>();
  const group = useSelector((state: RootState) => selectGroupById(state, _id!));
  const selectedUser = useSelector(
    (state: RootState) => state.groupSidebar.selectedUser
  );
  const kickUser = () => {
    setModalVisible(!modalVisible);
    console.log(`Kicking User: ${selectedUser?._id}`);
    console.log(selectedUser);
    if (!selectedUser) return;
    removeGroupRecipient({
      _id: _id!,
      userId: selectedUser._id,
    });
  };
  const transferGroupOwner = () => {
    setModalVisible(!modalVisible);
    console.log(`Transfering Group Owner to ${selectedUser?._id}`);
    if (!selectedUser) return;
    updateGroupOwner({ _id: _id!, newOwnerId: selectedUser._id });
  };
  console.log(group?.owner._id , user?._id, selectedUser?._id )
  return (
    <View style={styles.menuContainer}>
      <TouchableHighlight onPress={() => {}} underlayColor="#ccc" style={styles.menuItemContainer}>
        <View style={[styles.menuItem]}>
          <Ionicons
            name="person-circle-outline"
            size={24}
            color="black"
            style={styles.menuItemIcon}
          />
          <Text style={styles.menuItemText}>See Profile</Text>
        </View>
      </TouchableHighlight>
      {group?.owner._id === user?._id && user?._id !== selectedUser?._id && (
        <>
          <TouchableHighlight underlayColor="#ccc" onPress={kickUser} style={styles.menuItemContainer}>
            <View style={[styles.menuItem]}>
              <Ionicons
                name="ios-person-remove-outline"
                size={24}
                color="black"
                style={styles.menuItemIcon}
              />
              <Text style={styles.menuItemText}>Kick User</Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight underlayColor="#ccc" onPress={transferGroupOwner} style={styles.menuItemContainer}>
            <View style={[styles.menuItem]}>
              <MaterialCommunityIcons
                name="crown-outline"
                size={24}
                color="black"
                style={styles.menuItemIcon}
              />
              <Text style={styles.menuItemText}>Transfer Owner</Text>
            </View>
          </TouchableHighlight>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  menuContainer: {
    flexDirection: "column",
    backgroundColor: "white",
  },
  menuItemContainer: {
    borderRadius: 10,
  },
  menuItem: {
    paddingHorizontal: 20,
    paddingVertical: 7,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  menuItemIcon: {
    marginRight: 10,
  },
  menuItemText: {
    color: "black",
    fontSize: 18,
    marginLeft: 10,
  },
});

export default GroupSettingActionMenu;
