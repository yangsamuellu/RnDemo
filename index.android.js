import React, {Component} from 'react';
import {AppRegistry} from 'react-native';
import {ParallaxDemo} from "./src/ParallaxDemo";
import {Colours} from "./src/Colours";
import {App} from "./src/App";

export default class RnDemo extends Component {
    render() {
        return (
            <App/>
        );
    }
}

AppRegistry.registerComponent('RnDemo', () => RnDemo);
