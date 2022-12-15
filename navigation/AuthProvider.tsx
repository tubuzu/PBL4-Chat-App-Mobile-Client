import React, { createContext } from "react";
import {
  postLoginUser,
  postRegisterUser,
} from "../screens/Authentication/queries";
import { removeStorage, saveStorage } from "../utils/helpers";
import { CreateUserParams, User, UserCredentialsParams } from "../utils/types";

export interface AuthContextState {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<any>>;
  login: (data: UserCredentialsParams) => Promise<void>;
  register: (data: CreateUserParams) => Promise<void>;
  logout: () => Promise<void>;
}

const initialState: AuthContextState = {
  user: null,
  setUser: () => {},
  login: async () => {},
  register: async () => {},
  logout: async () => {},
};

export const AuthContext = createContext<AuthContextState>(initialState);

type Props = {
  children: any;
  user: User;
  setUser: any;
};

export const AuthProvider = ({ children, user, setUser }: Props) => {
  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login: async (data: UserCredentialsParams) => {
          try {
            await postLoginUser(data).then(async (res) => {
              await saveStorage(res.data.userData, res.data.token);
              setUser(JSON.parse(JSON.stringify(res.data.userData)));
              console.log("login success");
            });
          } catch (e) {
            console.log(e);
          }
        },
        register: async (data: CreateUserParams) => {
          try {
            await postRegisterUser(data)
              .then(async (res) => {
                await saveStorage(res.data.userData, res.data.token);
                setUser(JSON.parse(JSON.stringify(res.data.userData)));
                console.log(res.data);
                console.log("register success");
              })
              .catch((error: any) => {
                console.log("Something went wrong with sign up: ", error);
              });
          } catch (e) {
            console.log(e);
          }
        },
        logout: async () => {
          try {
            await removeStorage();
            setUser(null);
            console.log("logout");
          } catch (e) {
            console.log(e);
          }
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
