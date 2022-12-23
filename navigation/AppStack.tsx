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
import GroupSettings from "../screens/Group/GroupSettings";
import { LightTheme } from "../utils/themes";
import HeaderRight from "../components/header/HeaderRight";

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
        title: "Friends",
        statusBarColor: LightTheme.colors.notch,
        statusBarStyle: "light",
        headerTitleAlign: "left",
      }}
    />
  </Stack.Navigator>
);

const MessageStack = ({ navigation }: Props) => (
  <Stack.Navigator>
    <Stack.Screen
      name="ChatScreen"
      component={ChatScreen}
      options={{
        headerShown: false,
        statusBarColor: LightTheme.colors.notch,
        statusBarStyle: "light",
      }}
    />
    <Stack.Screen
      name="Conversation"
      component={ConversationChannelScreen}
      options={({ route }: any) => ({
        // title: "hehe",
        headerTitle: (props) => <ConversationTitle {...props} />,
        headerTitleAlign: "left",
        headerBackTitleVisible: false,
        animationTypeForReplace: "push",
        animation: "slide_from_right",
        statusBarColor: LightTheme.colors.notch,
        statusBarStyle: "light",
      })}
    />
    <Stack.Screen
      name="Group"
      component={GroupChannelScreen}
      options={({ route }: any) => ({
        headerTitle: () => <ConversationTitle />,
        headerRight: () => <HeaderRight />,
        headerTitleAlign: "left",
        headerBackTitleVisible: false,
        animationTypeForReplace: "push",
        animation: "slide_from_right",
        statusBarColor: LightTheme.colors.notch,
        statusBarStyle: "light",
      })}
    />
    <Stack.Screen
      name="ForwardMessage"
      component={ForwardMessageScreen}
      options={({ route }: any) => ({
        title: "Forward Message",
        headerTitleAlign: "left",
        headerBackTitleVisible: false,
        statusBarColor: LightTheme.colors.notch,
        statusBarStyle: "light",
      })}
    />
    <Stack.Screen
      name="GroupSettings"
      component={GroupSettings}
      options={({ route }: any) => ({
        title: "Group Settings",
        headerTitleAlign: "left",
        headerBackTitleVisible: false,
        animationTypeForReplace: "push",
        animation: "slide_from_right",
        statusBarColor: LightTheme.colors.notch,
        statusBarStyle: "light",
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
        headerTitleAlign: "left",
        statusBarColor: LightTheme.colors.notch,
        statusBarStyle: "light",
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
        animationTypeForReplace: "push",
        animation: "slide_from_right",
        statusBarColor: LightTheme.colors.notch,
        statusBarStyle: "light",
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
    if (
      routeName === "Conversation" ||
      routeName === "Group" ||
      routeName === "ForwardMessage" ||
      routeName === "GroupSettings"
    ) {
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
        tabBarActiveTintColor: "black",
        tabBarInactiveTintColor: "#acb3b9",
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
          headerShown: false,
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
