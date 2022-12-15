import React from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Animated,
//   Dimensions,
} from "react-native";

type TabBarProps = {
  navigationState: any;
  position: any;
  setIndex: any;
};

const TabBar = ({ navigationState, position, setIndex }: TabBarProps) => {
  const inputRange = navigationState.routes.map((x: any, i: any) => i);
  return (
    <View style={styles.container}>
      {navigationState.routes.map((route: any, index: any) => {
        const opacity = position.interpolate({
          inputRange,
          outputRange: inputRange.map((inputIndex: any) =>
            inputIndex === index ? 1 : 0.5
          ),
        });
        return (
          <TouchableOpacity
            key={index}
            style={styles.tab}
            onPress={() => setIndex(index)}
          >
            <Animated.Text style={{ opacity, fontSize: 18 }}>
              {route.title}
            </Animated.Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 50,
    flexDirection: "row",
    justifyContent: "space-around",
    borderWidth: 1,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderColor: "#ccc",
  },
  tab: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 5,
  },
});

export default TabBar;
