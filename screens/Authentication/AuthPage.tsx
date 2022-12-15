import React, { useRef, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  Animated,
  Dimensions,
} from "react-native";

import Register from "./Register";
import Login from "./Login";
import FormSelectorBtn from "../../components/forms/FormSelectorBtn";
import FormHeader from "../../components/forms/FormHeader";
import Loading from "../../components/loading/Loading";

const { width } = Dimensions.get("window");

type Props = {
  navigation: any;
};

export default function AuthPage({ navigation } : Props) {
  const animation = useRef(new Animated.Value(0)).current;
  const scrollView = useRef() as any;
  const [loading, setLoading] = useState(false);

  const leftHeaderOpacity = animation.interpolate({
    inputRange: [0, width],
    outputRange: [1, 0],
  });

  const rightHeaderOpacity = animation.interpolate({
    inputRange: [0, width],
    outputRange: [0, 1],
  });

  const leftHeaderTranslateY = animation.interpolate({
    inputRange: [0, width],
    outputRange: [0, -20],
  });
  const rightHeaderTranslateY = animation.interpolate({
    inputRange: [0, width],
    outputRange: [20, 0],
  });
  const loginColorInterpolate = animation.interpolate({
    inputRange: [0, width],
    outputRange: ["rgba(27,27,51,1)", "rgba(27,27,51,0.4)"],
  });
  const signupColorInterpolate = animation.interpolate({
    inputRange: [0, width],
    outputRange: ["rgba(27,27,51,0.4)", "rgba(27,27,51,1)"],
  });

  return (
    <View style={{ flex: 1, paddingTop: 120 }}>
      <View style={{ height: 80 }}>
        <FormHeader
          leftHeading="BK ZALO"
          rightHeading="WELCOME"
          subHeading=""
          rightHeaderOpacity={rightHeaderOpacity}
          leftHeaderOpacity={leftHeaderOpacity}
          leftHeaderTranslateY={leftHeaderTranslateY}
          rightHeaderTranslateY={rightHeaderTranslateY}
        />
      </View>
      <View
        style={{
          flexDirection: "row",
          paddingHorizontal: 20,
          marginBottom: 20,
        }}
      >
        <FormSelectorBtn
          style={styles.borderLeft}
          backgroundColor={loginColorInterpolate}
          title="Login"
          onPress={() => scrollView?.current?.scrollTo({ x: 0 })}
        />
        <FormSelectorBtn
          style={styles.borderRight}
          backgroundColor={signupColorInterpolate}
          title="Sign up"
          onPress={() => scrollView?.current?.scrollTo({ x: width })}
        />
      </View>
      <ScrollView
        ref={scrollView}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: animation } } }],
          { useNativeDriver: false }
        )}
      >
        <Login setLoading={setLoading} navigation={navigation} />
        <ScrollView>
          <Register setLoading={setLoading} navigation={navigation} />
        </ScrollView>
      </ScrollView>
      {
        loading && (
            <Loading />
        )
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  borderLeft: {
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  borderRight: {
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
  },
});
