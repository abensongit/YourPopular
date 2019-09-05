import React, { PureComponent } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, PixelRatio
} from 'react-native';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

const color = {
  theme: '#06C1AE',
  border: '#e0e0e0',
  background: '#f3f3f3'
};

export default class HomeListCell extends PureComponent {
  render() {
    const { info } = this.props;
    return (
      <TouchableOpacity style={styles.container} onPress={this.props.onPress}>
        <View style={styles.content}>
          <Text style={styles.h1}>{info.title}</Text>
          <Text style={[styles.p, { marginTop: 10 }]} numberOfLines={0}>{info.subtitle}</Text>
        </View>
        <SimpleLineIcons
          name={info.arrowurl}
          size={20}
          style={styles.arrow}
        />
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
    paddingTop: 15,
    paddingLeft: 15,
    paddingRight: 5,
    paddingBottom: 15,
    borderBottomWidth: 1 / PixelRatio.get(),
    borderColor: color.border,
    backgroundColor: '#ffffff',
  },
  content: {
    flex: 1,
    paddingRight: 15,
  },
  arrow: {
    width: 20,
    height: 20,
    color: '#cccccc',
  },
  h1: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#222222',
  },
  p: {
    fontSize: 15,
    color: '#777777',
  },
});
