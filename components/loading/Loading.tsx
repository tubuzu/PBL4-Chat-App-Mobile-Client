import React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";

function Loading() {
  return (
    <View style={styles.loading}>
      <ActivityIndicator size="large" color="#1b1b33" />
    </View>
  );
}

const styles = StyleSheet.create({
  loading: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
    backgroundColor: "rgba(0,0,0,0.4)"
  },
});

export default Loading;
