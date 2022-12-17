import React from "react";
import { View, StyleSheet, TouchableOpacity, Text, ActivityIndicator } from "react-native";

type Props = {
  loading?: boolean;
  title: string;
  submitting?: any;
  onPress: any;
};

const FormSubmitButton = ({ loading, title, submitting, onPress }: Props) => {
  const backgroundColor = submitting
    ? "rgba(27,27,51,0.4)"
    : "rgba(27,27,51,1)";

  return (
    <TouchableOpacity
      onPress={!submitting ? onPress : undefined}
      style={[styles.container, { backgroundColor }]}
    >
      {loading ? (
        <ActivityIndicator size="small" color="#fff" />
      ) : (
        <Text style={{ fontSize: 18, color: "#fff" }}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 45,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default FormSubmitButton;
