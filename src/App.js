import React, {Component} from "react";
import {PanResponderDemo} from "./panresponder/PanResponder";

export class App extends Component {
  render() {
    console.disableYellowBox = true;
    return <PanResponderDemo/>
  }
}