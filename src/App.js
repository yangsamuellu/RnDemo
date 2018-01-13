import React, { Component } from 'react'
import Navigator from './navigation'

export class App extends Component {
  render () {
    console.disableYellowBox = true
    return <Navigator/>
  }
}
