import React from "react";
import { StyleSheet, Text, TouchableHighlight, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { leaveGroupAPI } from "../../screens/Group/queries";
import Toast from "react-native-simple-toast";

type Props = {
  modalVisible: boolean;
  setModalVisible: any;
};
function GroupActionMenu({ modalVisible, setModalVisible }: Props) {
  const contextMenuGroup = useSelector(
    (state: RootState) => state.groups.selectedGroupContextMenu
  );

  const leaveGroup = () => {
    if (!contextMenuGroup) return;
    console.log(contextMenuGroup);
    leaveGroupAPI(contextMenuGroup._id)
      .catch((err) => {
        console.log(err);
      });
    Toast.show("Left group!", 1000);
    setModalVisible(!modalVisible);
  };
  return (
    <View style={styles.menuContainer}>
      <TouchableHighlight
        onPress={leaveGroup}
        underlayColor="#ccc"
        style={styles.menuItemContainer}
      >
        <View style={[styles.menuItem]}>
          <MaterialIcons
            name="logout"
            size={24}
            color="black"
            style={styles.menuItemIcon}
          />
          <Text style={styles.menuItemText}>Leave Group</Text>
        </View>
      </TouchableHighlight>
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

export default GroupActionMenu;
