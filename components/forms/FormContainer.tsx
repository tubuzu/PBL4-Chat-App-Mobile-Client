import React from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

type Props = {
  children: any;
  widthScale: number;
};

const FormContainer = ({ children, widthScale }: Props) => {
  return (
    <KeyboardAvoidingView
      enabled
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={{
        width: Dimensions.get("window").width * widthScale,
        paddingHorizontal: 20,
      }}
    >
      {children}
    </KeyboardAvoidingView>
  );
};

export default FormContainer;
