import React from "react";
import { View, StyleSheet, Text, Animated } from "react-native";

type Props = {
  leftHeading: any;
  rightHeading: any;
  subHeading: any;
  leftHeaderTranslateY: any;
  rightHeaderTranslateY: any;
  leftHeaderOpacity: any;
  rightHeaderOpacity: any;
};

const FormHeader = ({
  leftHeading,
  rightHeading,
  subHeading,
  leftHeaderTranslateY = 40,
  rightHeaderTranslateY = -20,
  leftHeaderOpacity = 0,
  rightHeaderOpacity = 0,
}: Props) => {
  return (
    <>
      <View style={styles.container}>
        <Animated.Text
          style={[
            styles.heading,
            {
              opacity: leftHeaderOpacity,
              transform: [{ translateY: leftHeaderTranslateY }],
            },
          ]}
        >
          {leftHeading}
        </Animated.Text>
        <Animated.Text
          style={[
            styles.heading,
            {
              opacity: rightHeaderOpacity,
              transform: [{ translateY: rightHeaderTranslateY }],
            },
          ]}
        >
          {rightHeading}
        </Animated.Text>
      </View>
      <Text style={styles.subHeading}>{subHeading}</Text>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  heading: { fontSize: 30, fontWeight: "bold", color: "#1b1b33", position: "absolute", alignSelf: "center" },
  subHeading: { fontSize: 18, color: "#1b1b33", textAlign: "center" },
});

export default FormHeader;
