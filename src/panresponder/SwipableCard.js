import React, {Component} from "react";
import {Animated, PanResponder, Dimensions} from 'react-native';
import {Body, Card, CardItem, Container, Content, Header, Text, Title, View} from "native-base";

export class SwipableCard extends Component {
  translateX = new Animated.Value(0);
  _panResponder = PanResponder.create({
    onMoveShouldSetResponderCapture: () => true,
    onMoveShouldSetPanResponderCapture: () => true,
    onPanResponderMove: Animated.event([null, {dx: this.translateX}]),
    onPanResponderRelease: (e, {vx, dx}) => {
      const screenWidth = Dimensions.get("window").width;
      if (Math.abs(vx) >= 1 || Math.abs(dx) >= 0.5 * screenWidth) {
        Animated.timing(this.translateX, {
          toValue: vx > 0 ? screenWidth + 200 : -screenWidth - 200,
          duration: 200
        }).start(() => {
          this.props.onDismiss();
        });
      } else {
        Animated.spring(this.translateX, {
          toValue: 0
        }).start();
      }
    }
  });

  render() {
    return (
        <View>
          <Animated.View style={{transform: [{translateX: this.translateX}], height:50}} {...this._panResponder.panHandlers}>
            <Card>
              <CardItem>
                <Body>
                <Text>
                  {this.props.title}
                </Text>
                </Body>
              </CardItem>
            </Card>
          </Animated.View>
        </View>

    );
  }

}
