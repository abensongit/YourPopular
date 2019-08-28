import React, { Component } from 'react';
import {
  Modal, Text, TouchableOpacity, StyleSheet, View
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {
  TimeSpanModel
} from '../../general';
import { System } from '../../common';

export const TimeSpanModels = [
  new TimeSpanModel('今天', 'since=daily'),
  new TimeSpanModel('本周', 'since=weekly'),
  new TimeSpanModel('本月', 'since=monthly')
];

type Props = {};
export default class TrendingDialog extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
  }

  show() {
    this.setState({
      visible: true,
    });
  }

  dismiss() {
    this.setState({
      visible: false,
    });
  }

  render() {
    const { onClose, onSelect } = this.props;
    return (
      <Modal
        transparent
        visible={this.state.visible}
        onRequestClose={() => onClose}
      >
        <TouchableOpacity
          style={styles.container}
          onPress={() => this.dismiss()}
        >
          <MaterialIcons name="arrow-drop-up" size={36} style={styles.arrow} />
          <View style={styles.content}>
            {TimeSpanModels.map((result, index, arr) => (
              <TouchableOpacity
                key={index.toString()}
                onPress={() => onSelect(arr[index])}
                underlayColor="transparent"
              >
                <View style={styles.text_container}>
                  <Text style={styles.text}>
                    {arr[index].showText}
                  </Text>
                </View>
                {
                  index !== TimeSpanModels.length - 1 ? (
                    <View
                      style={styles.line}
                    />
                  ) : null
                }
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingTop: System.window.statusBarHeight + System.window.navigationBarHeight * 0.5,
  },
  arrow: {
    color: 'white',
    padding: 0,
    marginBottom: -15,
  },
  content: {
    backgroundColor: 'white',
    borderRadius: 3,
    paddingTop: 3,
    paddingBottom: 3,
    marginRight: 3,
  },
  text_container: {
    alignItems: 'center',
    flexDirection: 'row'
  },
  text: {
    fontSize: 16,
    color: 'black',
    fontWeight: '400',
    padding: 8,
    paddingLeft: 26,
    paddingRight: 26
  },
  line: {
    height: 0.3,
    backgroundColor: 'darkgray',
  },
});
