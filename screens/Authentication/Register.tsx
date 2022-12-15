import React, { useState, useContext } from "react";
import { Text } from "react-native";

import {
  FormContainer,
  FormInput,
  FormSubmitButton,
} from "../../components/forms";
import { isValidEmail, updateError } from "../../utils/methods/methods";
import { AuthContext } from "../../navigation/AuthProvider";

type Props = {
  navigation: any;
  setLoading: any;
};

const Register = ({ setLoading }: Props) => {
  const { register } = useContext(AuthContext);
  const [username, setUsername] = useState<string>("");
  const [firstname, setFirstname] = useState<string>("");
  const [lastname, setLastname] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmpassword, setConfirmpassword] = useState<string>("");
  const [error, setError] = useState("");

  const isValidForm = () => {
    if (
      !username ||
      !firstname ||
      !lastname ||
      !email ||
      !password ||
      !confirmpassword
    ) {
      updateError("Required all fields!", setError);
      setLoading(false);
      return;
    }

    if (!isValidEmail(email)) return updateError("Invalid email!", setError);

    if (password !== confirmpassword) {
      updateError("Confirm Password Do Not Match!", setError);
      setLoading(false);
      return;
    }

    return true;
  };

  const submitHandler = async () => {
    if (isValidForm()) {
      register({ username, firstname, lastname, email, password })
        .then(() => {
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });
    }
  };

  return (
    <FormContainer widthScale={1}>
      {error ? (
        <Text style={{ color: "red", fontSize: 18, textAlign: "center" }}>
          {error}
        </Text>
      ) : null}
      <FormInput
        value={username}
        onChangeText={(value: any) => setUsername(value)}
        label="Username"
        placeholder="username"
        autoCapitalize="none"
      />
      <FormInput
        value={firstname}
        onChangeText={(value: any) => setFirstname(value)}
        label="First Name"
        placeholder="first name"
        autoCapitalize="none"
      />
      <FormInput
        value={lastname}
        onChangeText={(value: any) => setLastname(value)}
        label="Last Name"
        placeholder="last name"
        autoCapitalize="none"
      />
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
      <FormInput
        value={confirmpassword}
        onChangeText={(value: any) => setConfirmpassword(value)}
        label="Confirm Password"
        placeholder="********"
        autoCapitalize="none"
        secureTextEntry
      />
      <FormSubmitButton onPress={submitHandler} title="Register" />
    </FormContainer>
  );
};

export default Register;
