/**
 * React Native App
 * https://github.com/facebook/react-native
 */

import React, { Component } from 'react';
import { Provider } from 'react-redux';
import AppNavigator from './src/navigations/AppNavigator';
import store from './src/redux';

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <AppNavigator />
      </Provider>
    );
  }
}
