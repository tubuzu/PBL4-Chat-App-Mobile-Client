import { createContext } from "react";
import { io } from "socket.io-client";

// export const socket = io(process.env.REACT_NATIVE_APP_WEBSOCKET_URL!, {
export const socket = io("https://bkzalo-server.onrender.com", {
  withCredentials: true,
});
export const SocketContext = createContext(socket);
