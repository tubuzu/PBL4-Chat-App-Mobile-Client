import React from "react";
import { StyleSheet, Text, TouchableHighlight } from "react-native";
import { palette } from "../../utils/themes";

type Props = {
  content: string;
  disabled?: boolean;
  onPress?: any;
};

function ForwardSubmitBtn({ content, onPress, disabled = false }: Props) {
  return (
    <TouchableHighlight
      underlayColor={disabled ? palette.gray : palette.green}
      onPress={onPress ? onPress : () => {}}
      disabled={disabled}
      style={[
        styles.button,
        { backgroundColor: disabled ? "#ccc" : palette.lightGreen },
        disabled && { opacity: 0.8 },
      ]}
    >
      <Text style={[{textAlign: "center"}, styles.content]}>{content}</Text>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    width: 70,
    justifyContent: 'center',
    borderRadius: 15,
  },
  content: {
    fontSize: 16,
    fontWeight: "900",
    color: "#fff",
  },
});

export default ForwardSubmitBtn;
