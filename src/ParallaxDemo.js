import React, {Component} from "react";
import {Animated, Dimensions} from "react-native";
import {Body, Button, Container, Header, Icon, Left, Right, ScrollableTab, Tab, Tabs, Text, Title, View} from "native-base";
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
        this.nativeScroll.addListener(Animated.event([{value: this.scroll}], {useNativeDriver: false}));
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
            extrapolateRight: "clamp"
        });
        return (
            <Container>
                <Animated.View
                    style={{
                        position: "absolute",
                        width: "100%",
                        height: HEADER_HEIGHT,
                        backgroundColor: headerColor,
                        zIndex: 1,
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
                            colors={["rgba(255,255,255,0.8)", "rgba(255,255,255,0.3)", "rgba(255,255,255,0)"]}
                            locations={[0, 0.3, 1]}
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
                                zIndex: 1,
                                width: "100%", backgroundColor: "white"
                            }}>
                            <ScrollableTab {...props}/>
                        </Animated.View>
                    }}>
                        <Tab heading="Tab 1" {...tabProps}>
                            <View style={{minHeight: MIN_TAB_VIEW_HEIGHT}}>
                                <Text>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin et nibh sem. Maecenas
                                    et lectus sodales, egestas justo eu, mattis neque. Suspendisse id ex risus. In sed
                                    pretium ipsum, tempor iaculis velit. Nulla tristique convallis auctor. Etiam aliquam
                                    sodales velit, non porta arcu ultricies eu. Suspendisse accumsan ante a est vehicula
                                    convallis. Phasellus eget orci laoreet, fringilla libero sit amet, maximus massa. In
                                    at blandit quam, vitae volutpat dui. Integer semper interdum sem a feugiat. In vel
                                    lectus sed mi efficitur suscipit. Nam molestie sapien sem, vitae luctus massa
                                    rhoncus nec. Curabitur viverra tristique sem, eu lobortis augue pellentesque sed.
                                    Sed eget tortor ut odio finibus sodales et in ante. Aenean eu felis sapien.
                                    Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis
                                    egestas. Nulla id nunc lectus. Ut in fermentum justo. Mauris aliquam ultrices
                                    mauris, id ullamcorper ipsum porta non. Mauris eleifend nunc quis erat hendrerit,
                                    vitae tincidunt justo tristique. Etiam ultrices ac lorem id pretium.
                                    Aenean fermentum eget velit eget aliquet. Sed ut cursus leo, quis finibus neque.
                                    Integer at nisi viverra arcu euismod aliquam. Aliquam a fermentum felis. Phasellus
                                    tristique a mi non accumsan. Morbi porttitor metus in diam lobortis suscipit. Ut
                                    molestie, ante quis rutrum tristique, nisi tortor consectetur est, ut rhoncus nibh
                                    nisi ac sem. Cras ultricies condimentum neque a pellentesque. Vivamus quis sapien
                                    faucibus nisi suscipit aliquet eget tempus ex. Mauris nec erat eros. Sed hendrerit
                                    rutrum eros, et tempus neque. Duis nisl velit, feugiat et dui eu, condimentum
                                    consectetur metus. Quisque sed tellus nulla. Donec eget ante feugiat, luctus risus
                                    non, aliquam tortor. Curabitur maximus condimentum metus, aliquam viverra lectus
                                    interdum at.
                                    Nunc sollicitudin est eget ullamcorper imperdiet. Aliquam cursus dapibus tempus.
                                    Donec ultricies egestas egestas. Mauris id lacus accumsan arcu dignissim ullamcorper
                                    nec vitae purus. Morbi finibus scelerisque scelerisque. Praesent at velit nec eros
                                    porta luctus. Donec tincidunt iaculis scelerisque.
                                    Sed id vehicula odio, non condimentum mi. Cras lectus mauris, auctor vitae sem ut,
                                    imperdiet venenatis mi. Mauris rutrum id sem vitae vehicula. Donec sed malesuada
                                    metus, in accumsan tortor. Praesent vehicula diam at odio sagittis bibendum. Sed
                                    condimentum volutpat tempor. Nullam non eros sed libero finibus blandit eget eu
                                    tortor. Maecenas hendrerit elit et massa blandit tincidunt. Sed iaculis commodo
                                    laoreet. Vivamus id consectetur tortor. Aliquam a sem elit. Curabitur nec
                                    condimentum mi. Etiam auctor commodo libero vitae volutpat. In dictum lobortis odio
                                    et volutpat.
                                </Text>
                            </View>
                        </Tab>
                        <Tab heading="Tab 2" {...tabProps}>
                            <View style={{minHeight: MIN_TAB_VIEW_HEIGHT}}>
                                <Text>
                                    Tab 2
                                </Text>
                            </View>
                        </Tab>
                    </Tabs>
                </Animated.ScrollView>
            </Container>
        )
    }
}
