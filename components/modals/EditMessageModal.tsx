import React from "react";
import {
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AddConversationForm from "../forms/conversation/AddConversationForm";
import EditMessageForm from "../forms/message/EditMessageForm";

type ModalProps = {
  modalVisible: boolean;
  setModalVisible: any;
};

function EditMessageModal({ modalVisible, setModalVisible }: ModalProps) {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}
    >
      <Pressable
        style={styles.centeredView}
        onPress={() => setModalVisible(!modalVisible)}
      >
        <View style={styles.modalView}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Edit message</Text>
            {/* <Pressable
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Ionicons name="ios-close" size={30} />
            </Pressable> */}
          </View>

          <View style={styles.modalBody}>
            <EditMessageForm setShowModal={setModalVisible} />
          </View>
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
    paddingHorizontal: 10,
    paddingVertical: 20,
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
  modalHeader: {
    marginBottom: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: Dimensions.get("window").width * 0.9,
    paddingHorizontal: 20,
  },
  modalTitle: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "900",
  },
  modalBody: {},
});

export default EditMessageModal;
