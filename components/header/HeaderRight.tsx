import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { Group } from "../../utils/types";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { toggleModal } from "../../store/groups/groupSlice";

function HeaderRight() {
  const route: any = useRoute();
  const navigation: any = useNavigation();
  const dispatch = useDispatch<AppDispatch>();
  const chatId = route.params?.chatId;
  const group = useSelector((state: RootState) =>
    state.groups.groups.find((g: Group) => g._id === chatId)
  );
  const handleGroupSettingNavigate = () => {
    navigation.navigate("GroupSettings", {
      groupId: group?._id,
    });
  };
  const handleToggleAddRecipientModal = () => {
    dispatch(toggleModal(true));
  };
  return (
    <View style={styles.rightContainer}>
      <Pressable onPress={handleToggleAddRecipientModal}>
        <AntDesign
          name="adduser"
          size={24}
          color="black"
          style={{ marginRight: 10 }}
        />
      </Pressable>
      <Pressable onPress={handleGroupSettingNavigate}>
        <Ionicons name="menu" size={30} color="black" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
//   container: {
//     width: "100%",
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//   },
//   leftContainer: {
//     flexDirection: "row",
//     justifyContent: "flex-start",
//     alignItems: "center",
//   },
  rightContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  avatar: {
    width: 35,
    height: 35,
    borderRadius: 25,
    marginRight: 10,
  },
  username: { fontSize: 18, color: "#1b1b33" },
});

export default HeaderRight;
