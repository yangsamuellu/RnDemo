import React, { Component } from 'react'
import { View } from 'react-native'
import Navigator from './Navigator'

export default class AppWithNavigationState extends Component {
  render () {
    return (
      <View style={{flex: 1}}>
        <Navigator/>
      </View>
    )
  }
}
