import React, { useContext, useEffect, useState } from "react";
import { Text } from "react-native";

//👇🏻 Import the app styles
import { SocketContext } from "../../utils/context/SocketContext";
import { isValidEmail, updateError } from "../../utils/methods/methods";
import {
  FormContainer,
  FormInput,
  FormSubmitButton,
} from "../../components/forms";
import { AuthContext } from "../../navigation/AuthProvider";

type Props = {
  navigation: any;
  setLoading: any;
};

const Login = ({ navigation, setLoading }: Props) => {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const isValidForm = () => {
    if (!email || !password) {
      updateError("Required all fields!", setError);
      setLoading(false);
      return;
    }

    if (!isValidEmail(email)) return updateError("Invalid email!", setError);

    // if (!password.trim() || password.length < 8)
    //   return updateError("Password is too short!", setError);

    return true;
  };

  const submitHandler = async () => {
    if (isValidForm()) {
      setLoading(true);

      login({ email, password })
        .then(() => {
          setLoading(false);
        })
        .catch((err: any) => {
          console.log(err);
          setLoading(false);
        });
    }
  };
  const socket = useContext(SocketContext);

  useEffect(() => {
    socket.emit("identity", "hehehe");
    return () => {
      socket.off("connected");
    };
  }, []);

  return (
    <FormContainer widthScale={1}>
      {error ? (
        <Text style={{ color: "red", fontSize: 18, textAlign: "center" }}>
          {error}
        </Text>
      ) : null}
      <FormInput
        value={email}
        onChangeText={(value: any) => setEmail(value)}
        label="Email"
        placeholder="example@email.com"
        autoCapitalize="none"
      />
      <FormInput
        value={password}
        onChangeText={(value: any) => setPassword(value)}
        label="Password"
        placeholder="********"
        autoCapitalize="none"
        secureTextEntry
      />
      <FormSubmitButton onPress={submitHandler} title="Login" />
    </FormContainer>
  );
};

export default Login;
