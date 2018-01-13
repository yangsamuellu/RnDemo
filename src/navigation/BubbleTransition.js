import React, { Component } from 'react'
import { Animated, Dimensions, Easing, StyleSheet, View } from 'react-native'
import { Transitioner } from 'react-navigation'

const {width: screenWidth, height: screenHeight} = Dimensions.get('window')
export default class BubbleTransition extends Component {
  renderScene = ({position}, {index, key, route}) => {
    const Page = this.props.router.getComponentForRouteName(route.routeName)
    return <View style={StyleSheet.absoluteFill} key={key}>
      <Page navigation={this.props.navigation}/>
      <Animated.View pointerEvents="none"
                     style={{
                       ...StyleSheet.absoluteFillObject,
                       width: screenWidth,
                       height: screenHeight,
                       alignItems: 'center',
                       backgroundColor: '#e8e8e8',
                       opacity: position.interpolate({
                         inputRange: [index - 1, index - 0.2, index],
                         outputRange: [1, 1, 0]
                       }),
                       justifyContent: 'center'
                     }}>
        <Animated.View style={{
          width: screenHeight * 2,
          height: screenHeight * 2,
          borderRadius: screenHeight,
          transform: [{
            scale: position.interpolate({
              inputRange: [index - 1, index],
              outputRange: [0, 1]
            })
          }],
          opacity: position.interpolate({
            inputRange: [index - 1, index - 0.5, index],
            outputRange: [0, 1, 0]
          }),
          backgroundColor: '#88d9ff'
        }}/>
      </Animated.View>
    </View>
  }

  render () {
    return (
      <Transitioner configureTransition={() => ({
        timing: Animated.timing,
        duration: 1000,
        easing: Easing.linear(),
        useNativeDriver: true
      })}
                    navigation={this.props.navigation}
                    render={(transitionProps) => <View style={{flex: 1}}>
                      {transitionProps.scenes.map(scene => this.renderScene(transitionProps, scene))}
                    </View>}
      />
    )
  }
}
