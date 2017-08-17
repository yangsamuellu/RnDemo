import React, {Component} from "react";
import {Animated, Dimensions, StatusBar, Text, View} from 'react-native';
import {Body, Header, List, ListItem as Item, ScrollableTab, Tab, Tabs, Title} from "native-base";

const NAVBAR_HEIGHT = 56;
const {width: SCREEN_WIDTH} = Dimensions.get("window");
const COLOR = "rgb(45,181,102)";
const TAB_PROPS = {
  tabStyle: {width: SCREEN_WIDTH / 2, backgroundColor: COLOR},
  activeTabStyle: {width: SCREEN_WIDTH / 2, backgroundColor: COLOR},
  textStyle: {color: "white"},
  activeTextColor: {color: "white"}
};

export class CollapsingNav extends Component {
  scrollAnim = new Animated.Value(0);
  clampedScroll;

  constructor(props) {
    super(props);
    this.clampedScroll = Animated.multiply(Animated.diffClamp(this.scrollAnim, 0, NAVBAR_HEIGHT), -1);
  }

  render() {
    const tabContent = (
      <List>{new Array(20).fill(null).map((_, i) => <Item
        key={i}><Text>Item {i}</Text></Item>)}</List>);
    const tabY = Animated.add(this.scrollAnim, this.clampedScroll);
    setTimeout(() => {StatusBar.setBackgroundColor("rgb(40,151,85)")});
    return (
      <View>
        <Animated.View style={{
          width: "100%",
          position: "absolute",
          transform: [{
            translateY: this.clampedScroll
          }],
          elevation: 0,
          flex:1,
          zIndex:1,
          backgroundColor: COLOR
        }}>
          <Header style={{backgroundColor: "transparent"}} hasTabs>
            <Body>
            <Title>
              <Text>
                Collapsing Navbar
              </Text>
            </Title>
            </Body>
          </Header>
        </Animated.View>
        <Animated.ScrollView
          scrollEventThrottle={1}
          style={{zIndex: 0, height:"100%", elevation: -1}}
          contentContainerStyle={{paddingTop: NAVBAR_HEIGHT}}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {y: this.scrollAnim}}}],
            {useNativeDriver: true},
          )}
          overScrollMode="never">
            <Tabs renderTabBar={(props) => <Animated.View
              style={{transform: [{translateY: tabY}], zIndex: 1, width: "100%"}}>
              <ScrollableTab {...props} underlineStyle={{backgroundColor: "white"}}/>
            </Animated.View>
            }>
              <Tab heading="Tab 1" {...TAB_PROPS}>
                {tabContent}
              </Tab>
              <Tab heading="Tab 2" {...TAB_PROPS}>
                {tabContent}
              </Tab>
            </Tabs>
        </Animated.ScrollView>
      </View>
    );
  }
}