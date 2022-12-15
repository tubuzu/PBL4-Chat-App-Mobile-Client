import React, { PropsWithChildren, useState, useEffect } from "react";

//👇🏻 React Navigation configurations
import { NavigationContainer } from "@react-navigation/native";
import { Socket } from "socket.io-client";
import { socket, SocketContext } from "./utils/context/SocketContext";
import { store } from "./store";
import { Provider as ReduxProvider } from "react-redux";
import { LogBox } from "react-native";
import { getUserData } from "./utils/helpers";
import AuthStack from "./navigation/AuthStack";
import AppStack from "./navigation/AppStack";
import { AuthProvider } from "./navigation/AuthProvider";
import { User } from "./utils/types";
import { SafeAreaProvider } from "react-native-safe-area-context";
// import AsyncStorage from "@react-native-async-storage/async-storage";

type Props = {
  socket: Socket;
  user: User;
  setUser: any;
};

function AppWithProviders({
  children,
  user,
  setUser,
}: PropsWithChildren & Props) {
  return (
    <ReduxProvider store={store}>
      <AuthProvider user={user} setUser={setUser}>
        <SocketContext.Provider value={socket}>
          {children}
        </SocketContext.Provider>
      </AuthProvider>
    </ReduxProvider>
  );
}

export default function App() {
  LogBox.ignoreLogs(["Remote debugger"]);

  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const reloadUser = async () => {
      // await AsyncStorage.removeItem("userData");
      // await AsyncStorage.removeItem("token");
      const data = await getUserData();
      setUser(data ? data : null);
    };
    reloadUser();
  }, []);

  return (
    <AppWithProviders socket={socket} user={user} setUser={setUser}>
      <SafeAreaProvider>
        <NavigationContainer>
          {user === null ? <AuthStack /> : <AppStack />}
        </NavigationContainer>
      </SafeAreaProvider>
    </AppWithProviders>
  );
}
