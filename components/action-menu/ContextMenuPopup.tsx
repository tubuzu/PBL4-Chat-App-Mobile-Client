import React from "react";
import {
  Modal,
  Pressable,
  StyleSheet,
//   Text,
//   Pressable,
  View,
//   Dimensions,
} from "react-native";
// import { Ionicons } from "@expo/vector-icons";
// import AddConversationForm from "../forms/conversation/AddConversationForm";

type ModalProps = {
  modalVisible: boolean;
  setModalVisible: any;
  children: any;
};

function ContextMenuPopup({
  modalVisible,
  setModalVisible,
  children,
}: ModalProps) {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}
    >
      <Pressable style={styles.centeredView} onPress={() => setModalVisible(!modalVisible)}>
        <View style={styles.modalView}>
          <View style={styles.modalBody}>{children}</View>
        </View>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // marginTop: 22,
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  modalView: {
    position: "relative",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 7,
    // paddingHorizontal: 5,
    // paddingVertical: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalBody: {
    borderRadius: 20,
  },
});

export default ContextMenuPopup;
