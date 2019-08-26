
import React, { Component } from 'react';
import {
  ActivityIndicator, AsyncStorage, View
} from 'react-native';
import {
  NavigationService, RouterConst
} from '../../common';
import styles from './authorize.styles';

type Props = {};
export default class AuthorizeScreen extends Component<Props> {
  constructor() {
    super();
    console.disableYellowBox = true;
  }

  componentDidMount() {
    this.bootstrapAsync();
  }

  componentWillUnmount() {
    this.timer && clearTimeout(this.timer);
  }

  bootstrapAsync = async () => {
    const userToken = await AsyncStorage.getItem('userToken');
    this.timer = setTimeout(() => {
      NavigationService.navigate(userToken ? RouterConst.RouterMainStackNavigator : RouterConst.RouterWelcomeScreen, this.props);
    }, 1000);
  };

  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#f4511e" />
      </View>
    );
  }
}
