import React, { useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  Image,
} from "react-native";
import { AuthContext } from "../../navigation/AuthProvider";
import defaultAvatar from "../../assets/default_avatar.jpg";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
// import { useDispatch } from "react-redux";
// import { AppDispatch } from "../../store";

function SettingScreen() {
  const { logout } = useContext(AuthContext);
  // const dispatch = useDispatch<AppDispatch>();
  const navigation: any = useNavigation();
  const { user } = useContext(AuthContext);

  const handleLogout = async () => {
    await logout();
  };
  return (
    <View style={styles.container}>
      <TouchableHighlight
        // onPress={() => navigation.navigate("ProfileScreen")}
        onPress={() => {}}
        underlayColor="#fafafa"
        style={styles.profileSetting}
      >
        <View style={styles.profileSettingInner}>
          <View style={styles.avatarOuter}>
            <Image
              source={
                user?.avatar?.url ? { uri: user?.avatar?.url } : defaultAvatar
              }
              style={styles.avatar}
            />
          </View>
          <Text style={styles.username}>
            {user?.firstname} {user?.lastname}
          </Text>
          <TouchableHighlight
            underlayColor="#ccc"
            style={{ borderRadius: 20, padding: 10, marginLeft: "auto" }}
            onPress={handleLogout}
          >
            <MaterialIcons name="logout" size={30} />
          </TouchableHighlight>
        </View>
      </TouchableHighlight>
      <View style={styles.settingContainer}>
        <TouchableHighlight
          onPress={() => {navigation.navigate("ChangePassword")}}
          underlayColor="#f3f3f3"
          style={styles.settingItemConainer}
        >
          <View style={styles.settingItemInner}>
            <Ionicons
              name="key-outline"
              size={30}
              style={styles.settingItemIcon}
            />
            <Text style={styles.settingItemContent}>Change password</Text>
          </View>
        </TouchableHighlight>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
  },
  profileSetting: {
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 20,
    margin: 10,
    elevation: 3,
  },
  profileSettingInner: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  avatarOuter: {
    width: 50,
    height: 50,
    marginRight: 20,
    borderRadius: 50,
    elevation: 3,
  },
  avatar: {
    borderRadius: 50,
    width: "100%",
    height: "100%",
  },
  username: {
    fontSize: 24,
    fontWeight: "900",
    color: "black",
  },
  settingContainer: {
    flexDirection: "column",
    justifyContent: "flex-start",
    margin: 10,
    padding: 10,
    borderRadius: 20,
    backgroundColor: "#fff",
    elevation: 3,
  },
  settingItemConainer: {
    padding: 10,
    borderRadius: 20,
  },
  settingItemInner: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  settingItemIcon: {
    marginRight: 20,
  },
  settingItemContent: {
    fontSize: 18,
    color: "black",
  },
});

export default SettingScreen;
