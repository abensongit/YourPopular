import React, { Component } from 'react';
import {
  ScrollView, StyleSheet, Text, View, TouchableOpacity
} from 'react-native';
import { NavigationActions } from 'react-navigation';
import { COLOR_BACKGROUND_WHITE } from './Variables';


type Props = {}
class NavDrawerSideMenu extends Component<Props> {
  /**
   * 构造函数
   * @param props
   */
  constructor(props) {
    super(props);
    console.disableYellowBox = true;
    this.state = {
      routeIndex: 0,
    };
  }

  /**
   * 路由导航
   * @param route
   * @param index
   * @returns {Function}
   */
  navigateToScreen = (route, index) => () => {
    this.setState({
      routeIndex: index
    });
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
    const { items, theme } = this.props;
    return (
      <View style={styles.container}>
        <ScrollView>
          {items.map((item, index) => {
            const focused = this.state.routeIndex === index;
            return (
              <View
                key={index.toString()}
                style={{ backgroundColor: focused ? '#E0DBDB' : COLOR_BACKGROUND_WHITE }}
              >
                <TouchableOpacity
                  style={styles.item}
                  onPress={this.navigateToScreen(item.route, index)}
                >
                  <item.iconType
                    size={28}
                    name={item.iconName}
                    style={[styles.icon, { color: focused ? theme.tintColor : '#767676' }]}
                  />
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: focused ? 'bold' : 'normal',
                      color: focused ? theme.tintColor : '#262626',
                    }}
                  >
                    {item.title}
                  </Text>
                </TouchableOpacity>
                <View style={styles.line} />
              </View>
            );
          })}
        </ScrollView>
      </View>
    );
  }
}

export default NavDrawerSideMenu;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR_BACKGROUND_WHITE,
  },
  item: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 13,
  },
  icon: {
    marginLeft: 20,
    marginRight: 20,
  },
  line: {
    height: 0.5,
    opacity: 0.5,
    backgroundColor: 'darkgray',
  },
});
