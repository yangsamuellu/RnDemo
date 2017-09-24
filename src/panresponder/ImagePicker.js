import React, {Component} from "react";
import {Animated, Dimensions, Easing, PanResponder, StyleSheet, View} from "react-native";
import {Card} from "./Card";

const {width: screenWidth, height: screenHeight} = Dimensions.get("window");

export class Sliding extends Component {
  data = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
  colors = ["#ff5252", "#e040fb", "#7c4dff", "#448aff", "#64ffda", "#ff6e40"];
  translateY = new Animated.Value(-10);
  bottoms = this.data.map((_, i) => Animated.add(Animated.multiply(this.translateY, -1), i * screenHeight / 8));

  _panResponder = PanResponder.create({
    onMoveShouldSetResponderCapture: () => true,
    onMoveShouldSetPanResponderCapture: () => true,
    onPanResponderMove: Animated.event([null, {dy: this.translateY}]),
    onPanResponderRelease: (_, {vy, dy}) => {
      this.translateY.extractOffset();
      console.log(vy * 250);
      Animated.timing(this.translateY, {
        toValue: vy * 1000,
        duration: 1000,
        easing: Easing.poly(0.5)
      }).start(() => {
        const yOffset = this.bottoms.reduce((prevVal, x) => {
          return Math.abs(x.__getValue()) < Math.abs(prevVal) ? x.__getValue() : prevVal;
        }, Infinity);
        this.translateY.extractOffset();
        Animated.spring(this.translateY, {
          toValue: yOffset - 10,
          duration: 100,
          friction: 5
        }).start(() => {
          this.translateY.extractOffset();
        });
      })
    }
  });

  getBottom(i) {
    return this.bottoms[i].interpolate({
      inputRange: [0, screenHeight - 200, screenHeight - 200],
      outputRange: [0, screenHeight - 200, screenHeight - 201]
    });
  }

  render() {
    return <View
      style={{width: screenWidth, height: screenHeight, backgroundColor: "black"}} {...this._panResponder.panHandlers}>
      {this.data.slice().reverse().map((x, index) => {
          const i = this.data.length - index - 1;
          const bottom = this.getBottom(i);
          const pullDown = bottom.interpolate({
            inputRange: [9, 10, 11],
            outputRange: [-4, 0, 0],
            extrapolateLeft: "extend"
          });
          const scale = Animated.multiply(Animated.add(Animated.divide(bottom, screenHeight), -1), -1).interpolate({
            inputRange: [0.1, 1, 1.1],
            outputRange: [0.1, 1, 1],
            extrapolate: "clamp"
          });
          const perspective = new Animated.Value(0);
          perspective.__getValue = () => {
            const x = bottom.__getValue();
            return x > 0 ? 13 * Math.pow(x, 0.6) : x;
          };
          const opacity = bottom.interpolate({
            inputRange: [10, screenHeight - 200],
            outputRange: [0, 0.3],
            extrapolate: "clamp"
          });
          return <Animated.View key={i}
                                style={{
                                  position: "absolute",
                                  transform: [{scale}],
                                  bottom: Animated.add(perspective, pullDown)
                                }}>
            <Card color={this.colors[i % this.colors.length]}/>
            <Animated.View style={{
              ...StyleSheet.absoluteFillObject,
              width: "100%",
              height: "100%",
              backgroundColor: "#4c4c4c",
              opacity
            }}/>
          </Animated.View>
        }
      )}
    </View>
  }
}
