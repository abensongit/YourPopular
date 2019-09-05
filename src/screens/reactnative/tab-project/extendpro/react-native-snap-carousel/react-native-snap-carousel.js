import React, { Component } from 'react';
import {
  Platform, View, ScrollView, Text, StatusBar
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import SliderEntry from './SliderEntry';
import styles, { colors } from './index.style';
import { ENTRIES1, ENTRIES2 } from './entries';
import { sliderWidth, itemWidth } from './SliderEntry.style';
import { scrollInterpolators, animatedStyles } from './animations';
import { System } from '../../../../../common';

const IS_ANDROID = Platform.OS === 'android';
const SLIDER_1_FIRST_ITEM = 1;


type Props = {}
export default class ReactNativeSnapCarouselScreen extends Component<Props> {
  /**
   * 配置导航栏
   * @param navigation
   * @returns {{*:*}}
   */
  static navigationOptions = ({ navigation, navigationOptions }) => {
    const title = navigation.getParam('title', '标题');
    const theme = navigation.getParam('theme', System.theme);
    return {
      title,
      headerStyle: {
        backgroundColor: theme.navBar.backgroundColor,
      },
      headerTintColor: theme.navBar.titleColor,
      headerTitleStyle: {
        flex: 1,
        textAlign: 'center',
        fontSize: theme.navBar.titleFontSize,
        fontWeight: theme.navBar.titleFontWeight,
      },
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      slider1ActiveSlide: SLIDER_1_FIRST_ITEM
    };
  }

  get gradient() {
    return (
      <LinearGradient
        colors={[colors.background1, colors.background2]}
        startPoint={{ x: 1, y: 0 }}
        endPoint={{ x: 0, y: 1 }}
        style={styles.gradient}
      />
    );
  }

  mainExample(number, title) {
    const { slider1ActiveSlide } = this.state;

    return (
      <View style={styles.exampleContainer}>
        <Text style={styles.title}>{`Example ${number}`}</Text>
        <Text style={styles.subtitle}>{title}</Text>
        <Carousel
          ref={(c) => { this.slider1Ref = c; }}
          data={ENTRIES1}
          renderItem={this.renderItemWithParallax}
          sliderWidth={sliderWidth}
          itemWidth={itemWidth}
          hasParallaxImages
          firstItem={SLIDER_1_FIRST_ITEM}
          inactiveSlideScale={0.9}
          inactiveSlideOpacity={0.7}
          // inactiveSlideShift={10}
          containerCustomStyle={styles.slider}
          contentContainerCustomStyle={styles.sliderContentContainer}
          loop
          loopClonesPerSide={2}
          autoplay
          autoplayDelay={500}
          autoplayInterval={3000}
          onSnapToItem={index => this.setState({ slider1ActiveSlide: index })}
        />
        <Pagination
          dotsLength={ENTRIES1.length}
          activeDotIndex={slider1ActiveSlide}
          containerStyle={styles.paginationContainer}
          dotColor="rgba(255, 255, 255, 0.92)"
          dotStyle={styles.paginationDot}
          inactiveDotColor={colors.black}
          inactiveDotOpacity={0.4}
          inactiveDotScale={0.6}
          carouselRef={this.slider1Ref}
          tappableDots={!!this.slider1Ref}
        />
      </View>
    );
  }

  momentumExample(number, title) {
    return (
      <View style={styles.exampleContainer}>
        <Text style={styles.title}>{`Example ${number}`}</Text>
        <Text style={styles.subtitle}>{title}</Text>
        <Carousel
          data={ENTRIES2}
          renderItem={this.renderItem}
          sliderWidth={sliderWidth}
          itemWidth={itemWidth}
          inactiveSlideScale={0.95}
          inactiveSlideOpacity={1}
          enableMomentum
          activeSlideAlignment="start"
          containerCustomStyle={styles.slider}
          contentContainerCustomStyle={styles.sliderContentContainer}
          activeAnimationType="spring"
          activeAnimationOptions={{
            friction: 4,
            tension: 40
          }}
        />
      </View>
    );
  }

  layoutExample(number, title, type) {
    const isTinder = type === 'tinder';
    return (
      <View style={[styles.exampleContainer, isTinder ? styles.exampleContainerDark : styles.exampleContainerLight]}>
        <Text style={[styles.title, isTinder ? {} : styles.titleDark]}>{`Example ${number}`}</Text>
        <Text style={[styles.subtitle, isTinder ? {} : styles.titleDark]}>{title}</Text>
        <Carousel
          data={isTinder ? ENTRIES2 : ENTRIES1}
          renderItem={isTinder ? this.renderLightItem : this.renderItem}
          sliderWidth={sliderWidth}
          itemWidth={itemWidth}
          containerCustomStyle={styles.slider}
          contentContainerCustomStyle={styles.sliderContentContainer}
          layout={type}
          loop
        />
      </View>
    );
  }

  customExample(number, title, refNumber, renderItemFunc) {
    const isEven = refNumber % 2 === 0;

    // Do not render examples on Android; because of the zIndex bug, they won't work as is
    return !IS_ANDROID ? (
      <View style={[styles.exampleContainer, isEven ? styles.exampleContainerDark : styles.exampleContainerLight]}>
        <Text style={[styles.title, isEven ? {} : styles.titleDark]}>{`Example ${number}`}</Text>
        <Text style={[styles.subtitle, isEven ? {} : styles.titleDark]}>{title}</Text>
        <Carousel
          data={isEven ? ENTRIES2 : ENTRIES1}
          renderItem={renderItemFunc}
          sliderWidth={sliderWidth}
          itemWidth={itemWidth}
          containerCustomStyle={styles.slider}
          contentContainerCustomStyle={styles.sliderContentContainer}
          scrollInterpolator={scrollInterpolators[`scrollInterpolator${refNumber}`]}
          slideInterpolatedStyle={animatedStyles[`animatedStyles${refNumber}`]}
          useScrollView
        />
      </View>
    ) : false;
  }

  renderItem({ item, index }) {
    return <SliderEntry data={item} even={(index + 1) % 2 === 0} />;
  }

  renderItemWithParallax({ item, index }, parallaxProps) {
    return (
      <SliderEntry
        data={item}
        even={(index + 1) % 2 === 0}
        parallax
        parallaxProps={parallaxProps}
      />
    );
  }

  renderLightItem({ item, index }) {
    return <SliderEntry data={item} even={false} />;
  }

  renderDarkItem({ item, index }) {
    return <SliderEntry data={item} even />;
  }

  render() {
    const example1 = this.mainExample(1, 'Default layout | Loop | Autoplay | Parallax | Scale | Opacity | Pagination with tappable dots');
    const example2 = this.momentumExample(2, 'Momentum | Left-aligned | Active animation');
    const example3 = this.layoutExample(3, '"Stack of cards" layout | Loop', 'stack');
    const example4 = this.layoutExample(4, '"Tinder-like" layout | Loop', 'tinder');
    const example5 = this.customExample(5, 'Custom animation 1', 1, this.renderItem);
    const example6 = this.customExample(6, 'Custom animation 2', 2, this.renderLightItem);
    const example7 = this.customExample(7, 'Custom animation 3', 3, this.renderDarkItem);
    const example8 = this.customExample(8, 'Custom animation 4', 4, this.renderLightItem);

    return (
      <View style={styles.container}>
        <StatusBar
          translucent
          backgroundColor="rgba(0, 0, 0, 0.3)"
          barStyle="light-content"
        />
        { this.gradient }
        <ScrollView
          style={styles.scrollview}
          scrollEventThrottle={200}
          directionalLockEnabled
        >
          { example1 }
          { example2 }
          { example3 }
          { example4 }
          { example5 }
          { example6 }
          { example7 }
          { example8 }
        </ScrollView>
      </View>
    );
  }
}
