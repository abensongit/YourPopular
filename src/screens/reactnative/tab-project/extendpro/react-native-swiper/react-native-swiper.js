import React, { Component } from 'react';
import {
  StyleSheet, View, Text, ScrollView, Image
} from 'react-native';
import Swiper from 'react-native-swiper';
import { System } from '../../../../../common';
import { Images } from '../../../../../resources';


const SwiperSlide = props => (
  <View style={styles.slide}>
    <Image onLoad={props.loadHandle.bind(null, props.i)} style={styles.image} source={{ uri: props.uri }} />
    {
      !props.loaded && (
        <View style={styles.loadingView}>
          <Image style={styles.loadingImage} source={Images.swiper.ic_swiper_loading} />
        </View>
      )
    }
  </View>
);


type Props = {}
export default class ReactNativeSwiperScreen extends Component<Props> {
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
      imgList: [
        'http://128.14.157.84/images/banners/1.jpg',
        'http://128.14.157.84/images/banners/2.jpg',
        'http://128.14.157.84/images/banners/3.jpg',
        'http://128.14.157.84/images/banners/4.jpg'
      ],
      loadQueue: [0, 0, 0, 0]
    };
    this.loadHandle = this.loadHandle.bind(this);
  }

  loadHandle(i) {
    const { loadQueue } = this.state;
    loadQueue[i] = 1;
    this.setState({
      loadQueue
    });
  }

  renderPagination = (index, total, context) => (
    <View style={styles.paginationStyle}>
      <Text style={{ color: '#000' }}>
        <Text style={styles.paginationText}>{index + 1}</Text>
        /
        {total}
      </Text>
    </View>
  );

  render() {
    return (
      <ScrollView style={styles.container} contentContainerStyle={{ alignItems: 'stretch' }}>

        {/* 轮播1 */}
        <Swiper
          style={styles.wrapper}
          height={200}
          horizontal={false}
          paginationStyle={{ right: 5 }}
          autoplay
        >
          <View style={styles.slide1}>
            <Text style={styles.text}>Hello Swiper</Text>
          </View>
          <View style={styles.slide2}>
            <Text style={styles.text}>Beautiful</Text>
          </View>
          <View style={styles.slide3}>
            <Text style={styles.text}>And simple</Text>
          </View>
        </Swiper>

        {/* 轮播2 */}
        <Swiper
          style={styles.wrapper}
          height={200}
          onMomentumScrollEnd={(e, state, context) => console.log('index:', state.index)}
          dot={(<View style={styles.dot} />)}
          activeDot={(<View style={styles.activeDot} />)}
          paginationStyle={{ bottom: -22, left: null, right: 10 }}
          loop
          autoplay
        >
          <View style={styles.slide} title={<Text numberOfLines={1}>Aussie tourist dies at Bali hotel</Text>}>
            <Image resizeMode="stretch" style={styles.image} source={Images.swiper.ic_swiper_1} />
          </View>
          <View style={styles.slide} title={<Text numberOfLines={1}>Big lie behind Nine’s new show</Text>}>
            <Image resizeMode="stretch" style={styles.image} source={Images.swiper.ic_swiper_2} />
          </View>
          <View style={styles.slide} title={<Text numberOfLines={1}>Why Stone split from Garfield</Text>}>
            <Image resizeMode="stretch" style={styles.image} source={Images.swiper.ic_swiper_3} />
          </View>
          <View style={styles.slide} title={<Text numberOfLines={1}>Learn from Kim K to land that job</Text>}>
            <Image resizeMode="stretch" style={styles.image} source={Images.swiper.ic_swiper_4} />
          </View>
        </Swiper>

        {/* 轮播3 */}
        <Swiper
          style={[styles.wrapper, { marginTop: 30 }]}
          height={200}
          renderPagination={this.renderPagination}
          loop={false}
        >
          <View style={styles.slide} title={<Text numberOfLines={1}>Aussie tourist dies at Bali hotel</Text>}>
            <Image style={styles.image} source={Images.swiper.ic_swiper_1} />
          </View>
          <View style={styles.slide} title={<Text numberOfLines={1}>Big lie behind Nine’s new show</Text>}>
            <Image style={styles.image} source={Images.swiper.ic_swiper_2} />
          </View>
          <View style={styles.slide} title={<Text numberOfLines={1}>Why Stone split from Garfield</Text>}>
            <Image style={styles.image} source={Images.swiper.ic_swiper_3} />
          </View>
          <View style={styles.slide} title={<Text numberOfLines={1}>Learn from Kim K to land that job</Text>}>
            <Image style={styles.image} source={Images.swiper.ic_swiper_4} />
          </View>
        </Swiper>

        {/* 轮播4 */}
        <View style={{ height: 200, marginTop: 30 }}>
          <Swiper loadMinimal loadMinimalSize={1} style={styles.wrapper} loop={false}>
            {
              this.state.imgList.map((item, idx) => (
                <SwiperSlide
                  loadHandle={this.loadHandle}
                  loaded={this.state.loadQueue[idx]}
                  uri={item}
                  i={idx}
                  key={`key${item}`}
                />
              ))
            }
          </Swiper>
        </View>

      </ScrollView>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  wrapper: {

  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'transparent'
  },
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB'
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#97CAE5'
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#92BBD9'
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold'
  },
  image: {
    flex: 1,
    width: System.window.width,
  },
  paginationStyle: {
    position: 'absolute',
    bottom: -25,
    right: 10,
    fontSize: 25
  },
  paginationText: {
    color: '#3D83F7',
    fontSize: 20
  },
  loadingView: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,.5)'
  },
  loadingImage: {
    width: 60,
    height: 60
  },
  dot: {
    backgroundColor: 'rgba(0,0,0,.4)',
    width: 8,
    height: 8,
    borderRadius: 4,
    marginLeft: 3,
    marginRight: 3,
    marginTop: 3,
    marginBottom: 3
  },
  activeDot: {
    backgroundColor: '#000',
    width: 8,
    height: 8,
    borderRadius: 4,
    marginLeft: 3,
    marginRight: 3,
    marginTop: 3,
    marginBottom: 3
  }
});
