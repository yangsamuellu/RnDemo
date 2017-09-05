import React, {Component} from "react";
import {LayoutAnimation, UIManager} from 'react-native';
import {Body, Container, Header, Title, View} from "native-base";
import {SwipableCard} from "./SwipableCard";

export class PanResponderDemo extends Component {
  titles = new Array(10).fill(null).map((_, i) => `Card #${i}`);
  state = {
    closedIndices: []
  };

  constructor(props) {
    super(props);
    UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
  }

  shouldRender(index) {
    return this.state.closedIndices.indexOf(index) === -1
  }

  render() {
    return (
      <Container>
        <Header>
          <Body>
          <Title>
            Pan Responder Demo
          </Title>
          </Body>
        </Header>
        {this.titles.map((title, i) => this.shouldRender(i) &&
          <View key={i}><SwipableCard title={title} onDismiss={() => {
            if (this.titles.map((_, i) => this.shouldRender(i)).slice(i + 1, this.titles.length).some((x) => x)) {
              LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
            }
            this.setState({
              closedIndices: [...this.state.closedIndices, i]
            })
          }}/></View>)}
      </Container>
    );
  }

}
