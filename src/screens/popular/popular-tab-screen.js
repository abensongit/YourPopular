import React, { Component } from 'react';
import {
 Text, FlatList, TouchableOpacity
} from 'react-native';

class PopularTabScreen extends Component {
  static navigationOptions = {
    title: 'Child 1',
  };

  constructor(props) {
    super(props);

    const data = [];
    for (let i = 0; i < 60; i++) {
      data.push(i);
    }

    this.state = {
      data,
    };
  }

  renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => {

      }}
      style={{
        width: '100%',
        height: 50,
        borderBottomColor: '#0002',
        borderBottomWidth: 0.5,
        paddingHorizontal: 20,
        justifyContent: 'center',
      }}
    >
      <Text style={{ fontSize: 22 }}>{item}</Text>
    </TouchableOpacity>
  );

  render() {
    return (
      <FlatList
        style={{ flex: 1 }}
        data={this.state.data}
        renderItem={this.renderItem}
        keyExtractor={(item, index) => String(index)}
        // onScroll={onScroll}
        // _mustAddThis={animatedY}
      />
    );
  }
}

export default PopularTabScreen;
