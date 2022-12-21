import React from "react";
import { StyleSheet, Text, TouchableHighlight, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type Props = {
  modalVisible: boolean;
  setModalVisible: any;
};
function ConversationActionMenu({ modalVisible, setModalVisible }: Props) {
  const handleSeeProfile = () => {
    setModalVisible(!modalVisible);
  };
  return (
    <View style={styles.menuContainer}>
      <TouchableHighlight
        onPress={handleSeeProfile}
        underlayColor="#ccc"
        style={styles.menuItemContainer}
      >
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

export default ConversationActionMenu;
