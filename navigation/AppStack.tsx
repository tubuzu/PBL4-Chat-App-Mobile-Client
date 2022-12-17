import React, { useContext, useEffect } from "react";
// import { View, TouchableOpacity, Text } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import { AntDesign } from "@expo/vector-icons";
import ChatScreen from "../screens/Chat/ChatScreen";
import SettingScreen from "../screens/Setting/SettingScreen";
import FriendScreen from "../screens/Friend/FriendScreen";
import { SocketContext } from "../utils/context/SocketContext";
import { AuthContext } from "./AuthProvider";
import { Conversation } from "../utils/types";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import { addConversation } from "../store/conversations/conversationSlice";
import ConversationChannelScreen from "../screens/Conversations/ConversationChannelScreen";
import ConversationTitle from "../components/conversation/ConversationTitle";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import ForwardMessageScreen from "../screens/Messages/ForwardMessageScreen";
import GroupChannelScreen from "../screens/Group/GroupChannelScreen";
import ChangePasswordScreen from "../screens/Setting/ChangePasswordScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

type Props = {
  navigation: any;
};

const FriendStack = ({ navigation }: Props) => (
  <Stack.Navigator>
    <Stack.Screen
      name="FriendScreen"
      component={FriendScreen}
      options={{
        headerShown: false,
      }}
    />
    {/* <Stack.Screen
      name="RN Social"
      component={HomeScreen}
      options={{
        headerTitleAlign: "center",
        headerTitleStyle: {
          color: "#2e64e5",
          fontFamily: "Kufam-SemiBoldItalic",
          fontSize: 18,
        },
        headerStyle: {
          shadowColor: "#fff",
          elevation: 0,
        },
        headerRight: () => (
          <View style={{ marginRight: 10 }}>
            <FontAwesome5.Button
              name="plus"
              size={22}
              backgroundColor="#fff"
              color="#2e64e5"
              onPress={() => navigation.navigate("AddPost")}
            />
          </View>
        ),
      }}
    /> */}
  </Stack.Navigator>
);

const MessageStack = ({ navigation }: Props) => (
  <Stack.Navigator>
    <Stack.Screen
      name="ChatScreen"
      component={ChatScreen}
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen
      name="Conversation"
      component={ConversationChannelScreen}
      options={({ route }: any) => ({
        // title: "hehe",
        headerTitle: () => <ConversationTitle />,
        headerBackTitleVisible: false,
      })}
    />
    <Stack.Screen
      name="Group"
      component={GroupChannelScreen}
      options={({ route }: any) => ({
        // title: "hehe",
        headerTitle: () => <ConversationTitle />,
        headerBackTitleVisible: false,
      })}
    />
    <Stack.Screen
      name="ForwardMessage"
      component={ForwardMessageScreen}
      options={({ route }: any) => ({
        title: "Forward Message",
        // headerTitle: () => (
        //   <ConversationTitle recipient={route?.params?.recipient} />
        // ),
        headerBackTitleVisible: false,
      })}
    />
  </Stack.Navigator>
);

const SettingStack = ({ navigation }: Props) => (
  <Stack.Navigator>
    <Stack.Screen
      name="SettingScreen"
      component={SettingScreen}
      options={{
        title: "Settings",
      }}
    />
    <Stack.Screen
      name="ChangePassword"
      component={ChangePasswordScreen}
      options={{
        headerTitle: "Change Password",
        headerBackTitleVisible: false,
        headerTitleAlign: "center",
        headerStyle: {
          backgroundColor: "#fff",
        },
      }}
    />
  </Stack.Navigator>
);

const AppStack = () => {
  const { user } = useContext(AuthContext);
  const socket = useContext(SocketContext);
  const dispatch = useDispatch<AppDispatch>();

  const getTabBarVisibility = (route: any) => {
    const routeName = getFocusedRouteNameFromRoute(route);
    // console.log(routeName);
    if (routeName === "Conversation" || routeName === "Group") {
      return false;
    }
    return true;
  };

  useEffect(() => {
    socket.emit("identity", user?._id);
    socket.on("onConversation", (payload: Conversation) => {
      console.log("Received onConversation Event");
      console.log(payload);
      dispatch(addConversation(payload));
    });
    return () => {
      socket.off("onConversation");
      // socket.off("connected");
    };
  }, []);

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "#2e64e5",
      }}
    >
      <Tab.Screen
        name="Messages"
        component={MessageStack}
        options={({ route }) => ({
          tabBarStyle: {
            display: getTabBarVisibility(route) ? "flex" : "none",
          },
          // Or Hide tabbar when push!
          // https://github.com/react-navigation/react-navigation/issues/7677
          // tabBarVisible: route.state && route.state.index === 0,
          // tabBarLabel: 'Home',
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="chatbox-ellipses-outline"
              color={color}
              size={size}
            />
          ),
        })}
      />
      <Tab.Screen
        name="Friends"
        component={FriendStack}
        options={{
          // tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingStack}
        options={{
          headerShown: false,
          // tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="setting" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default AppStack;
