import React, { Component } from 'react'
import { Dimensions, ScrollView, StyleSheet, View } from 'react-native'
import MapView from 'react-native-maps'

const {height: screenHeight, width: screenWidth} = Dimensions.get('window')

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    height: screenHeight * 0.8
  },
})

export default class MyApp extends Component {
  render () {
    const region = {
      latitude: 37.78825,
      longitude: -122.4324,
      latitudeDelta: 0.015,
      longitudeDelta: 0.0121,
    }
    return <View style={styles.container}>
      <ScrollView>
        <View style={{height: screenHeight * 0.8, width: '100%'}}>
          <MapView style={styles.map}
                   region={region}>
            <MapView.Marker title="Location" coordinate={region}/>
          </MapView>
        </View>
        <View style={{height: 500, width: screenWidth, backgroundColor: 'red'}}>

        </View>
      </ScrollView>
    </View>
  }
}
