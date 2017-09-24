import React, {Component} from "react";
import {Animated, Dimensions, PanResponder, Text, View} from "react-native";

const {width: screenWidth, height: screenHeight} = Dimensions.get("window");

class CustomAnimated extends Animated.Node {
  _a;
  fn;

  constructor(a, fn) {
    super();
    this._a = typeof a === 'number' ? new Animated.Value(a) : a;
    this.fn = fn;
  }

  __makeNative() {
    this._a.__makeNative();
    super.__makeNative();
  }

  __getValue(): any {
    return this.fn(this._a.__getValue());
  }

  interpolate(config) {
    return new AnimatedInterpolation(this, config);
  }

  __attach(): void {
    this._a.__addChild(this);
  }

  __detach(): void {
    this._a.__removeChild(this);
    super.__detach();
  }

  __getNativeConfig(): any {
    return {
      type: 'interpolation',
      input: [this._a.__getNativeTag()],
    };
  }
}

export class Sliding extends Component {
  data = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
  translateY = new Animated.Value(0);
  bottoms = this.data.map((_, i) => Animated.add(Animated.multiply(this.translateY, -1), i * screenHeight / 8));

  _panResponder = PanResponder.create({
    onMoveShouldSetResponderCapture: () => true,
    onMoveShouldSetPanResponderCapture: () => true,
    onPanResponderMove: Animated.event([null, {dy: this.translateY}]),
    onPanResponderRelease: (e, {vx, dx}) => {
      this.translateY.extractOffset();

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
            inputRange: [-1, 0, 1],
            outputRange: [-2.5, 0, 0],
            extrapolateLeft: "extend"
          });
          const scale = Animated.multiply(Animated.add(Animated.divide(bottom, screenHeight), -1), -1).interpolate({
            inputRange: [0.1, 1, 1.1],
            outputRange: [0.1, 1, 1],
            extrapolate: "clamp"
          });
          const perspective = new CustomAnimated(bottom, (x) => x > 0 ? 13 * Math.pow(x, 0.6) : x);
          return <Animated.View key={i}
                                style={{
                                  position: "absolute",
                                  width: screenWidth,
                                  height: 200,
                                  borderWidth: 1,
                                  borderColor: "#591d93",
                                  backgroundColor: "white",
                                  transform: [{scale}],
                                  bottom: Animated.add(perspective, pullDown)
                                }}>
            <Text style={{fontSize: 100}}>{x}</Text>
          </Animated.View>
        }
      )}
    </View>
  }
}
