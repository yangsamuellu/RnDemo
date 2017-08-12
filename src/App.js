import React, {Component} from "react";
import {Animated, Dimensions} from "react-native";
import {
    Body,
    Button,
    Container,
    Header,
    Icon,
    Left,
    Right,
    ScrollableTab,
    Tab,
    Tabs,
    Text,
    Title,
    View
} from "native-base";
import LinearGradient from "react-native-linear-gradient";

const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get("window");
const IMAGE_HEIGHT = 250;
const HEADER_HEIGHT = 64;
const MIN_TAB_VIEW_HEIGHT = SCREEN_HEIGHT - IMAGE_HEIGHT;
const tabProps = {
    tabStyle: {backgroundColor: "transparent", width: SCREEN_WIDTH / 2},
    activeTabStyle: {backgroundColor: "transparent", width: SCREEN_WIDTH / 2}
};

export class App extends Component {
    nativeScroll;
    scroll;

    constructor(props) {
        super(props);
        this.nativeScroll = new Animated.Value(0);
        this.scroll = new Animated.Value(0);
        this.nativeScroll.addListener((val) => {
            Animated.event([{value: this.scroll}], {useNativeDriver: false})(val);
        })
    }

    render() {
        const tabScroll = this.nativeScroll.interpolate({
            inputRange: [0, IMAGE_HEIGHT - HEADER_HEIGHT, IMAGE_HEIGHT - HEADER_HEIGHT + 1],
            outputRange: [0, 0, 1]
        });
        const headerColor = this.scroll.interpolate({
            inputRange: [0, IMAGE_HEIGHT - HEADER_HEIGHT],
            outputRange: ["rgba(255,255,255,0)", "rgba(255,255,255,1)"]
        });
        const imageScale = this.nativeScroll.interpolate({
            inputRange: [-25, 0],
            outputRange: [1.1, 1],
            extrapolateLeft: "extend",
            extrapolateRight: "clamp"
        });
        return (
            <Container>
                <Animated.View
                    style={{
                        position: "absolute",
                        width: "100%",
                        height: HEADER_HEIGHT,
                        zIndex: 1,
                        backgroundColor: headerColor
                    }}>
                    <Header style={{backgroundColor: "transparent"}} hasTabs>
                        <Left>
                            <Button transparent>
                                <Icon name='arrow-back'/>
                            </Button>
                        </Left>
                        <Body>
                        <Title>
                            Hello
                        </Title>
                        </Body>
                        <Right/>
                    </Header>
                </Animated.View>
                <Animated.ScrollView
                    scrollEventThrottle={5}
                    showsVerticalScrollIndicator={false}
                    onScroll={Animated.event([{
                        nativeEvent: {
                            contentOffset: {
                                y: this.nativeScroll
                            }
                        }
                    }], {useNativeDriver: true})} style={{zIndex: 0}}>
                    <Animated.Image source={{uri: "https://facebook.github.io/react-native/img/opengraph.png"}}
                                    style={{
                                        height: IMAGE_HEIGHT,
                                        width: "100%",
                                        transform: [{translateY: Animated.multiply(this.nativeScroll, 0.5)}, {scale: imageScale}]
                                    }}>
                        <LinearGradient
                            colors={["rgba(255,255,255,0.6)", "rgba(255,255,255,0.3)", "rgba(255,255,255,0)"]}
                            locations={[0, 0.2, 1]}
                            style={{
                                position: "absolute",
                                top: 0,
                                bottom: 0,
                                left: 0,
                                right: 0
                            }}/>
                    </Animated.Image>
                    <Tabs renderTabBar={(props) => {
                        return <Animated.View
                            style={{
                                transform: [{translateY: tabScroll}],
                                zIndex: 1
                            }}>
                            <Animated.View style={{width: "100%", backgroundColor: "white"}}>
                                <ScrollableTab {...props}/>
                            </Animated.View>
                        </Animated.View>
                    }}>
                        <Tab heading="Tab 1" {...tabProps}>
                            <View style={{minHeight: MIN_TAB_VIEW_HEIGHT}}>
                                <Text>
                                    Tab 1
                                </Text>
                            </View>
                        </Tab>
                        <Tab heading="Tab 2" {...tabProps}>
                            <View style={{minHeight: MIN_TAB_VIEW_HEIGHT}}>
                                <Text>
                                    Tab 1
                                </Text>
                            </View>
                        </Tab>
                    </Tabs>
                </Animated.ScrollView>
            </Container>
        )
    }
}
