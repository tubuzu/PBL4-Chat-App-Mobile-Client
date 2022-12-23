import React, { useState } from "react";
import { Text, View } from "react-native";
import {
  FormContainer,
  FormInput,
  FormSubmitButton,
} from "../../components/forms";
import { updateError } from "../../utils/methods/methods";
import Toast from "react-native-simple-toast";
import { changePassword } from "./queries";

function ChangePasswordScreen() {
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleReset = () => {
    setPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setError("");
    setLoading(false);
  }

  const isValidForm = () => {
    if (!password || !newPassword || !confirmPassword) {
      updateError("Required all fields!", setError);
      setLoading(false);
      return;
    }
    if (newPassword !== confirmPassword) {
      updateError("Confirm password is not match new password!", setError);
      setLoading(false);
      return;
    }
    if (password === confirmPassword) {
      updateError("New password is the same as old password!", setError);
      setLoading(false);
      return;
    }
    return true;
  };

  const submitHandler = async () => {
    if (isValidForm()) {
      setLoading(true);
      await changePassword({
        password: password,
        newPassword: confirmPassword,
      })
        .then(() => {
          handleReset();
          Toast.show("Successfully change password!", 1000);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    }
  };
  return (
    <View style={{marginTop: 20}}>
      <FormContainer widthScale={1}>
        {error ? (
          <Text style={{ color: "red", fontSize: 18, textAlign: "center" }}>
            {error}
          </Text>
        ) : null}
        <FormInput
          value={password}
          onChangeText={(value: any) => setPassword(value)}
          label="Password"
          placeholder="********"
          autoCapitalize="none"
          secureTextEntry
        />
        <FormInput
          value={newPassword}
          onChangeText={(value: any) => setNewPassword(value)}
          label="New Password"
          placeholder="********"
          autoCapitalize="none"
          secureTextEntry
        />
        <FormInput
          value={confirmPassword}
          onChangeText={(value: any) => setConfirmPassword(value)}
          label="Confirm Password"
          placeholder="********"
          autoCapitalize="none"
          secureTextEntry
        />
        <FormSubmitButton loading={loading} onPress={submitHandler} title="Submit" />
      </FormContainer>
    </View>
  );
}

export default ChangePasswordScreen;
