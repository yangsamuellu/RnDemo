import React, {Component} from 'react';
import {AppRegistry} from 'react-native';
import {App} from "./src/ParallaxDemo";
import {Colours} from "./src/Colours";

export default class RnDemo extends Component {
    render() {
        return (
            <Colours/>
        );
    }
}

AppRegistry.registerComponent('RnDemo', () => RnDemo);
