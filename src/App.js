import React, {Component} from "react";
import {ParallaxDemo} from "./ParallaxDemo";
import {CollapsingNav} from "./CollapsingNav";

export class App extends Component {
  render() {
    console.disableYellowBox = true;
    return <CollapsingNav/>
  }
}