import React, { Component } from 'react'
import { View } from 'react-native'
import { createNavigationContainer, createNavigator, StackRouter } from 'react-navigation'
import BubbleTransition from './BubbleTransition'
import { Template } from './Screens'

const r = StackRouter({
  A: {
    screen: Template
  }, B: {
    screen: Template
  }
}, {
  headerMode: 'none',
  initialRouteName: 'A'
})

const Navigator = createNavigationContainer(createNavigator(r)(BubbleTransition))

export default class AppWithNavigationState extends Component {
  render () {
    return (
      <View style={{flex: 1}}>
        <Navigator/>
      </View>
    )
  }
}
