import React, { Component } from 'react';
import {
 ScrollView, StyleSheet, Text, View
} from 'react-native';
import { NavigationActions } from 'react-navigation';
import PropTypes from 'prop-types';
import RouterConst from './RouterConst';


type Props = {}
class NavDrawerSideMenu extends Component<Props> {
  /**
   * 路由导航
   * @param route
   * @returns {Function}
   */
  navigateToScreen = route => () => {
    const navigateAction = NavigationActions.navigate({
      routeName: route
    });
    this.props.navigation.dispatch(navigateAction);
    this.props.navigation.closeDrawer();
  };

  /**
   * 渲染页面
   * @returns {*}
   */
  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <View>
            <Text style={styles.sectionHeadingStyle}>
              Section 1
            </Text>
            <View style={styles.navSectionStyle}>
              <Text
                style={styles.navItemStyle}
                onPress={this.navigateToScreen(RouterConst.RouterDrawerPopularNavigator)}
              >
                Page1
              </Text>
            </View>
          </View>
          <View>
            <Text style={styles.sectionHeadingStyle}>
              Section 2
            </Text>
            <View style={styles.navSectionStyle}>
              <Text style={styles.navItemStyle} onPress={this.navigateToScreen(RouterConst.RouterDrawerMeiTuanNavigator)}>
                Page2
              </Text>
              <Text style={styles.navItemStyle} onPress={this.navigateToScreen(RouterConst.RouterDrawerOtherNavigator)}>
                Page3
              </Text>
            </View>
          </View>
        </ScrollView>
        <View style={styles.footerContainer}>
          <Text>This is my fixed footer</Text>
        </View>
      </View>
    );
  }
}

NavDrawerSideMenu.propTypes = {
  navigation: PropTypes.object
};

export default NavDrawerSideMenu;


const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    flex: 1
  },
  navItemStyle: {
    padding: 10
  },
  navSectionStyle: {
    backgroundColor: 'lightgrey'
  },
  sectionHeadingStyle: {
    paddingVertical: 10,
    paddingHorizontal: 5
  },
  footerContainer: {
    padding: 20,
    backgroundColor: 'lightgrey'
  }
});
