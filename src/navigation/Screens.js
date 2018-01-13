import React, { Component } from 'react'
import {
  Body, Button, Container, Content, Footer, FooterTab, Header, Icon, Left, Right, Text,
  Title,
} from 'native-base'

export class Template extends Component {
  render () {
    const onA = this.props.navigation.state.routes[this.props.navigation.state.index].params.onA
    return <Container>
      <Header>
        <Body>
        <Title>{onA ? 'Screen A' : 'Screen B'}</Title>
        </Body>
      </Header>
      <Content style={{backgroundColor: onA ? 'green' : 'red'}}>
        <Button onPress={() => {this.props.navigation.navigate(onA ? 'B' : 'A', {onA: !onA})}}>
          <Text>Go to {onA ? 'Screen B' : 'Screen A'}</Text></Button>
      </Content>
    </Container>
  }
}
