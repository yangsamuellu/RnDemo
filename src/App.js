import React, {Component} from "react";
import {Sliding} from "./panresponder/ImagePicker";

export class App extends Component {
  render() {
    console.disableYellowBox = true;
    return <Sliding/>
  }
}