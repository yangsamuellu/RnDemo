import React, { Component } from 'react'
import { ReactMotion } from './ReactMotion'

export class App extends Component {
  render () {
    console.disableYellowBox = true
    return <ReactMotion/>
  }
}
