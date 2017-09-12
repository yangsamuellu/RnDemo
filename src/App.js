import React, {Component} from "react";
import {ParallaxDemo} from "./ParallaxDemo";
export class App extends Component {
  render() {
    console.disableYellowBox = true;
    return <ParallaxDemo/>
  }
}