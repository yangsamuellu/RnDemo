import React, { Component } from 'react'
import { Animated, View, Easing } from 'react-native'
import { Transitioner } from 'react-navigation'

export default class CrossFadeTransitioner extends Component {
  renderScene = ({position}, {index, key, route}) => {
    const Scene = this.props.router.getComponentForRouteName(route.routeName)
    return <Animated.View style={{
      opacity: position.interpolate({
        inputRange: [index - 1, index, index + 1],
        outputRange: [0, 1, 0]
      }),
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'white'
    }} key={key}>
      <Scene navigation={this.props.navigation}/>
    </Animated.View>
  }

  render () {
    return (
      <Transitioner
        configureTransition={() => ({
          timing: Animated.timing,
          duration: 500,
          easing: Easing.linear(),
          useNativeDriver: true
        })}
        navigation={this.props.navigation}
        render={(transitionProps) =>
          <View style={{flex: 1}}>
            {transitionProps.scenes.map(scene => this.renderScene(transitionProps, scene))}
          </View>}
        onTransitionStart={this.onTransitionStart}
        onTransitionEnd={this.onTransitionEnd}
      />
    )
  }
}
