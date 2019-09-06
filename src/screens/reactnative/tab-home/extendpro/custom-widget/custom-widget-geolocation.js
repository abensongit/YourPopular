import React, { Component } from 'react';
import {
  Linking,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native';
import RNLocation from 'react-native-location';
import { System } from '../../../../../common';

const repoUrl = 'https://github.com/timfpark/react-native-location';

type Props = {}
export default class MyCustomWidgetGeolocationScreen extends Component<Props> {
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
      headerRight: (
        <View />
      ),
    };
  };


  /**
   * 构造函数
   * @param props
   */
  constructor(props) {
    super(props);
    this.state = {
      location: null
    };
  }

  /**
   * 组件渲染完成
   */
  componentWillUnmount() {
    RNLocation.configure({
      distanceFilter: 5.0
    }).then(() => RNLocation.requestPermission({
      ios: 'whenInUse',
      android: {
        detail: 'fine',
        rationale: {
          title: 'Location permission',
          message: 'We use your location to demo the library',
          buttonPositive: 'OK',
          buttonNegative: 'Cancel'
        }
      }
    })).then((granted) => {
      if (granted) {
        this.startUpdatingLocation();
      }
    });
  }

  /**
   * 事件 - 点击按钮
   */
  startUpdatingLocation = () => {
    this.locationSubscription = RNLocation.subscribeToLocationUpdates(
      (locations) => {
        this.setState({ location: locations[0] });
      }
    );
  };

  stopUpdatingLocation = () => {
    this.locationSubscription && this.locationSubscription();
    this.setState({ location: null });
  };

  openRepoUrl = () => {
    Linking.openURL(repoUrl).catch(err => console.error('An error occurred', err));
  };

  /**
   * 渲染页面
   * @returns {*}
   */
  render() {
    const theme = this.props.navigation.getParam('theme', System.theme);
    const { location } = this.state;
    return (
      <ScrollView style={styles.container}>
        <SafeAreaView style={styles.innerContainer}>
          <View style={{ alignItems: 'center', marginTop: 30 }}>
            <Text style={styles.title}>react-native-location</Text>
            <TouchableHighlight
              onPress={this.openRepoUrl}
              underlayColor="#CCC"
              activeOpacity={0.8}
            >
              <Text style={styles.repoLink}>{repoUrl}</Text>
            </TouchableHighlight>
          </View>

          <View style={styles.row}>
            <TouchableHighlight
              onPress={this.startUpdatingLocation}
              style={[styles.button, { backgroundColor: theme.tintColor }]}
            >
              <Text style={styles.buttonText}>Start</Text>
            </TouchableHighlight>

            <TouchableHighlight
              onPress={this.stopUpdatingLocation}
              style={[styles.button, { backgroundColor: '#881717' }]}
            >
              <Text style={styles.buttonText}>Stop</Text>
            </TouchableHighlight>
          </View>

          {location && (
            <React.Fragment>
              <View style={styles.row}>
                <View style={[styles.detailBox, styles.third]}>
                  <Text style={styles.valueTitle}>Course</Text>
                  <Text style={[styles.detail, styles.largeDetail]}>
                    {location.course}
                  </Text>
                </View>

                <View style={[styles.detailBox, styles.third]}>
                  <Text style={styles.valueTitle}>Speed</Text>
                  <Text style={[styles.detail, styles.largeDetail]}>
                    {location.speed}
                  </Text>
                </View>

                <View style={[styles.detailBox, styles.third]}>
                  <Text style={styles.valueTitle}>Altitude</Text>
                  <Text style={[styles.detail, styles.largeDetail]}>
                    {location.altitude}
                  </Text>
                </View>
              </View>

              <View style={{ alignItems: 'flex-start' }}>
                <View style={styles.row}>
                  <View style={[styles.detailBox, styles.half]}>
                    <Text style={styles.valueTitle}>Latitude</Text>
                    <Text style={styles.detail}>{location.latitude}</Text>
                  </View>

                  <View style={[styles.detailBox, styles.half]}>
                    <Text style={styles.valueTitle}>Longitude</Text>
                    <Text style={styles.detail}>{location.longitude}</Text>
                  </View>
                </View>

                <View style={styles.row}>
                  <View style={[styles.detailBox, styles.half]}>
                    <Text style={styles.valueTitle}>Accuracy</Text>
                    <Text style={styles.detail}>{location.accuracy}</Text>
                  </View>

                  <View style={[styles.detailBox, styles.half]}>
                    <Text style={styles.valueTitle}>Altitude Accuracy</Text>
                    <Text style={styles.detail}>
                      {location.altitudeAccuracy}
                    </Text>
                  </View>
                </View>

                <View style={styles.row}>
                  <View style={[styles.detailBox, styles.half]}>
                    <Text style={styles.valueTitle}>Timestamp</Text>
                    <Text style={styles.detail}>{location.timestamp}</Text>
                  </View>

                  <View style={[styles.detailBox, styles.half]}>
                    <Text style={styles.valueTitle}>Date / Time</Text>
                    <Text style={styles.detail}>{location.timestamp}</Text>
                  </View>
                </View>

                <View style={styles.row}>
                  <View style={[styles.detailBox, styles.full]}>
                    <Text style={styles.json}>{JSON.stringify(location)}</Text>
                  </View>
                </View>
              </View>
            </React.Fragment>
          )}
        </SafeAreaView>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#CCCCCC'
  },
  innerContainer: {
    marginVertical: 30
  },
  title: {
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold'
  },
  repoLink: {
    textAlign: 'center',
    fontSize: 12,
    fontWeight: 'bold',
    color: '#0000CC',
    textDecorationLine: 'underline'
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginTop: 5,
    marginBottom: 5
  },
  detailBox: {
    padding: 15,
    justifyContent: 'center'
  },
  button: {
    flex: 1,
    marginHorizontal: 10,
    marginTop: 15,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10
  },
  buttonText: {
    fontSize: 30,
    color: '#FFFFFF'
  },
  valueTitle: {
    fontFamily: 'Futura',
    fontSize: 12
  },
  detail: {
    fontSize: 15,
    fontWeight: 'bold'
  },
  largeDetail: {
    fontSize: 20
  },
  json: {
    fontSize: 12,
    fontFamily: 'Courier',
    textAlign: 'center',
    fontWeight: 'bold'
  },
  full: {
    width: '100%'
  },
  half: {
    width: '50%'
  },
  third: {
    width: '33%'
  }
});
