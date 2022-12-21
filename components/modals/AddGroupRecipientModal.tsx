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
import AddGroupRecipientForm from "../forms/group/AddGroupRecipientForm";

type ModalProps = {
  modalVisible: boolean;
  setModalVisible: any;
};

function AddGroupRecipientModal({ modalVisible, setModalVisible }: ModalProps) {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Add Recipients</Text>
            <Pressable
              // style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              {/* <Text style={styles.textStyle}>Hide Modal</Text> */}
              <Ionicons name="ios-close" size={30} />
            </Pressable>
          </View>

          <View style={styles.modalBody}>
            <AddGroupRecipientForm setShowModal={setModalVisible} />
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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

export default AddGroupRecipientModal;
