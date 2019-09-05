import React, { Component } from 'react';
import {
  Button, StyleSheet, Text, View,
} from 'react-native';
import ActionSheet, { ActionSheetCustom } from 'react-native-actionsheet';
import { System } from '../../../../../common';


type Props = {}
export default class ReactNativeAcionSheet extends Component<Props> {
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

  constructor(props) {
    super(props);
    this.state = {
      selectIndex: -1
    };
  }

  showActionSheet = () => {
    this.ActionSheet.show();
  };

  showActionSheetCustom = () => {
    this.ActionSheetCustom.show();
  };

  render() {
    const CANCEL_INDEX = 0;
    const DESTRUCTIVE_INDEX = 4;
    const options = ['Cancel', 'Apple', 'Banana', 'Watermelon', 'Durian'];
    const title = 'Which one do you like ?';
    const message = 'In botany, a fruit is the seed-bearing structure in flowering plants (also known as angiosperms) formed from the ovary after flowering.';
    const content = this.state.selectIndex > 0 ? options[this.state.selectIndex] : '';
    return (
      <View style={styles.container}>
        <Text style={styles.p}>{content}</Text>
        <Button
          title="打开弹出框(系统)"
          onPress={this.showActionSheet}
        />
        <Button
          title="打开弹出框(自定义)"
          onPress={this.showActionSheetCustom}
        />
        <ActionSheet
          ref={(view) => { this.ActionSheet = view; }}
          title={title}
          message={message}
          options={options}
          cancelButtonIndex={CANCEL_INDEX}
          destructiveButtonIndex={DESTRUCTIVE_INDEX}
          onPress={(index) => {
            this.setState({
              selectIndex: index
            });
          }}
        />
        <ActionSheetCustom
          ref={(view) => { this.ActionSheetCustom = view; }}
          title={title}
          message={message}
          options={options}
          cancelButtonIndex={CANCEL_INDEX}
          destructiveButtonIndex={DESTRUCTIVE_INDEX}
          onPress={(index) => {
            this.setState({
              selectIndex: index
            });
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  p: {
    margin: 100,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#222222',
  },
});
