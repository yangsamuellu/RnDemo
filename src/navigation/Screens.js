import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import { Button, Text } from 'native-base'

export class Template extends Component {
  render () {
    const onA = this.props.navigation.state.routes[this.props.navigation.state.index].routeName === 'A'
    return <View style={{
      backgroundColor: onA ? '#4CAF50' : '#FF7043',
      alignItems: 'center',
      justifyContent: 'center',
      ...StyleSheet.absoluteFillObject,
    }}>
      <Button full onPress={() => {this.props.navigation.navigate(onA ? 'B' : 'A')}}>
        <Text>Go to {onA ? 'Screen B' : 'Screen A'}</Text></Button>
    </View>
  }
}
