import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AuthPage from "../screens/Authentication/AuthPage";

const Stack = createNativeStackNavigator();

function AuthStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="AuthPage"
        component={AuthPage}
        options={{ headerShown: false }}
      />
      {/* <Stack.Screen
            name="Chat"
            component={Chat}
            options={{
              title: "Chats",
              headerShown: false,
            }}
          />
          <Stack.Screen name="Messaging" component={Messaging} /> */}
    </Stack.Navigator>
  );
}

export default AuthStack;
