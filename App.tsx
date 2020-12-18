import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View, Dimensions, Platform } from "react-native";
import Animated, { Easing } from "react-native-reanimated";
import {
  TapGestureHandler,
  State,
  TextInput,
} from "react-native-gesture-handler";
import Svg, { Image, Circle, ClipPath } from "react-native-svg";
import { runTiming } from "./utils";



const { width, height } = Dimensions.get("window");
const {
  Value,
  event,
  block,
  cond,
  concat,
  eq,
  set,
  Clock,
  startClock,
  stopClock,
  debug,
  timing,
  clockRunning,
  interpolate,
  Extrapolate,
} = Animated;

export default function App() {
  const [buttonOpacity, setButtonOpacity] = React.useState(new Value(1));
  const buttonY = interpolate(buttonOpacity, {
    inputRange: [0, 1],
    outputRange: [100, 0],
    extrapolate: Extrapolate.CLAMP,
  });
  const bgY = interpolate(buttonOpacity, {
    inputRange: [0, 1],
    outputRange: [-height / 3 - 50, 0],
    extrapolate: Extrapolate.CLAMP,
  });
  const textInputZIndex = interpolate(buttonOpacity, {
    inputRange: [0, 1],
    outputRange: [1, -1],
    extrapolate: Extrapolate.CLAMP,
  });
  const textInputY = interpolate(buttonOpacity, {
    inputRange: [0, 1],
    outputRange: [0, 100],
    extrapolate: Extrapolate.CLAMP,
  });
  const textInputOpacity = interpolate(buttonOpacity, {
    inputRange: [0, 1],
    outputRange: [1, 0],
    extrapolate: Extrapolate.CLAMP,
  });
  const rotateCross = interpolate(buttonOpacity, {
    inputRange: [0, 1],
    outputRange: [180, 360],
    extrapolate: Extrapolate.CLAMP,
  });
  const onStateChange = event([
    {
      nativeEvent: ({ state }) =>
        block([
          cond(
            eq(state, State.END),
            set(buttonOpacity, runTiming(new Clock(), 1, 0))
          ),
        ]),
    },
  ]);

  const onCloseState = event([
    {
      nativeEvent: ({ state }) =>
        block([
          cond(
            eq(state, State.END),
            set(buttonOpacity, runTiming(new Clock(), 0, 1))
          ),
        ]),
    },
  ]);
  
  return (
    <View style={styles.container}>
      <Animated.View
        style={{
          ...StyleSheet.absoluteFill,
          transform: [{ translateY: bgY }],
        }}
      >
        <Svg height={height + 50} width={width}>
          <ClipPath id="bottomClip">
            <Circle r={height + 50} cx={width / 2} />
          </ClipPath>
          <Image
            href={require("./assets/splash.png")}
            width={width}
            height={height + 50}
            preserveAspectRatio="xMidYMid slice"
            clipPath="url(#bottomClip)"
          />
        </Svg>
      </Animated.View>
      <View
        style={{
          height: height / 3,
          justifyContent: "center",
          backgroundColor: "transparent",
        }}
      >
        <TapGestureHandler onHandlerStateChange={onStateChange}>
          <Animated.View
            style={{
              ...styles.button,
              opacity: buttonOpacity, marginTop: 150,
              transform: [{ translateY: buttonY }],
            }}
          >
            <Text style={{ fontSize: 20, fontWeight: "bold", color: "white" }}>
              Start 
            </Text>
          </Animated.View>
        </TapGestureHandler>
        <Animated.View
          style={{
            zIndex: textInputZIndex,
            opacity: textInputOpacity,
            transform: [{ translateY: textInputY }],
            height: height / 3,
            ...StyleSheet.absoluteFill,
            top: undefined,
            justifyContent: "center",
          }}
        >
          <TapGestureHandler onHandlerStateChange={onCloseState}>
            <Animated.View style={styles.closeButton}>
              <Animated.Text
                style={{
                  fontSize: 15,
                  transform: [{ rotate: concat(rotateCross, "deg") }],
                }}
              >
                X
              </Animated.Text>
            </Animated.View>
          </TapGestureHandler>

          <TextInput
            placeholder="Email or search ..."
            style={styles.textInput}
            placeholderTextColor="black"
          />
          <Animated.View style={{...styles.button, backgroundColor: '#9d8420'}}>
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>Some other CTA</Text>
          </Animated.View>
        </Animated.View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "white",
    justifyContent: "flex-end",
  },
  button: {
    backgroundColor: "#ffa737",
    height: 70,
    marginHorizontal: 30,
    borderRadius: 35,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 15,
    shadowOffset: { width: 2, height: 2 },
    shadowColor: "black",
    shadowOpacity: 0.2,
    elevation: 12,
    
  },
  closeButton: {
    height: 40,
    width: 40,
    backgroundColor: "white",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: -20,
    left: width / 2 - 20,
    shadowOffset: { width: 2, height: 2 },
    shadowColor: "black",
    shadowOpacity: 0.2,
    elevation: 12,
  },
  textInput: {
    height: 50,
    borderRadius: 25,
    borderWidth: 0.5,
    marginHorizontal: 20,
    paddingLeft: 10,
    marginVertical: 5,
    borderColor: "rgba(0,0,0,0.2)",
    elevation: 1,
  },
});
