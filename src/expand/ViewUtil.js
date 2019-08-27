
import React from 'react';
import {
  StyleSheet, TouchableOpacity, Text, View,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default class ViewUtil {
  /**
   * 获取导航栏分享按钮
   * @param onPressHandle
   * @returns {XML}
   */
  static renderNavShareButton(onPressHandle) {
    return (
      <TouchableOpacity
        style={{
          paddingTop: 2, paddingLeft: 5, paddingRight: 0, marginRight: 5
        }}
        onPress={onPressHandle}
      >
        <Feather
          name="share-2"
          size={22}
          style={{ alignSelf: 'center', color: 'white', }}
        />
      </TouchableOpacity>
    );
  }

  /**
   * 生成表格行
   * @param text
   * @param color
   * @param Icons
   * @param iconName
   * @param callback
   * @param expandableIconName
   * @returns {*}
   */
  static renderCellItem(text, color, Icons, iconName, callback, expandableIconName) {
    return (
      <TouchableOpacity
        onPress={callback}
        style={styles.menuItemContainer}
      >
        <View style={{ alignItems: 'center', flexDirection: 'row' }}>
          {Icons && iconName
            ? (
              <Icons
                name={iconName}
                size={24}
                style={{ color, marginRight: 10 }}
              />
            )
            : (
              <View style={{
                opacity: 1,
                width: 22,
                height: 22,
                marginRight: 10,
              }}
              />
            )
          }
          <Text style={{ marginLeft: 34, position: 'absolute' }}>{text}</Text>
        </View>
        <Ionicons
          name={expandableIconName || 'ios-arrow-forward'}
          size={22}
          style={{
            alignSelf: 'center',
            color: color || 'black',
          }}
        />
      </TouchableOpacity>
    );
  }

  /**
   * 生成菜单表格
   * @param itemMenu
   * @param color
   * @param callBack
   * @returns {*}
   */
  static renderMenuItem(itemMenu, color, callBack) {
    return this.renderCellItem(itemMenu.name, color, itemMenu.Icons, itemMenu.icon, callBack);
  }
}


const styles = StyleSheet.create({
  menuItemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    height: 50,
    padding: 10,
  },
});
