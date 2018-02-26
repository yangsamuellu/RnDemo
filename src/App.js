import React, { Component } from 'react'
import Navigator from './navigation'
import ParallaxMap from './ParallaxMap'

export class App extends Component {
  render () {
    console.disableYellowBox = true
    return <ParallaxMap/>
  }
}
