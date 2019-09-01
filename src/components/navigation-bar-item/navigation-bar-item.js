import React, { Component } from 'react';
import {
  Text, StyleSheet, TouchableOpacity, Image, ViewPropTypes, View,
} from 'react-native';

type Props = {
  icon?: any,
  iconType?: any,
  iconName?: string,
  iconSize?: number,
  iconStyle?: ViewPropTypes.style,
  titleStyle?: ViewPropTypes.style,
  title?: string,
  onPress?: Function,
}

export default class NavigationBarItem extends Component<Props> {
  render() {
    const icon = this.props.icon
      && <Image style={[styles.icon, this.props.iconStyle]} source={this.props.icon} />;

    const iconSize = this.props.iconSize || styles.icon.width;
    const iconVector = this.props.iconType && this.props.iconName
      && (
        <this.props.iconType
          name={this.props.iconName}
          size={iconSize}
          style={[styles.icon, this.props.iconStyle]}
        />
      );

    const title = this.props.title
      && <Text style={[styles.title, this.props.titleStyle]}>{this.props.title}</Text>;

    return (
      <TouchableOpacity style={styles.container} onPress={this.props.onPress}>
        {icon}
        {iconVector}
        {title}
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 26,
    height: 26,
    margin: 8,
  },
  title: {
    fontSize: 14,
    color: '#000',
    margin: 8,
  }
});
