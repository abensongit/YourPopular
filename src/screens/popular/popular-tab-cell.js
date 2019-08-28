import React from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, PixelRatio, Image
} from 'react-native';
import {
  CommonTabCell
} from '../../general';

const color = {
  border: '#e9e9ee',
  background: '#f3f3f3'
};

export default class PopularTabCell extends CommonTabCell {
  render() {
    const { projectModel } = this.props;
    const { item } = projectModel;
    if (!item || !item.owner) return null;
    return (
      <TouchableOpacity
        style={styles.container}
        onPress={() => this.onSelectProp()}
      >
        <View style={styles.content}>
          <Text style={styles.title}>{item.full_name}</Text>
          <Text style={styles.description}>{item.description}</Text>
          <View style={styles.row}>
            <View style={styles.rowItem}>
              <Text>Author:</Text>
              <Image
                style={{ height: 19, width: 19 }}
                source={{ uri: item.owner.avatar_url }}
              />
            </View>
            <View style={styles.rowItem}>
              <Text>Start:</Text>
              <Text>{item.stargazers_count}</Text>
            </View>
            {this.favouriteIcon()}
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e9e9ee',
    borderColor: color.border,
    borderBottomWidth: 1 / PixelRatio.get(),
  },
  content: {
    flex: 1,
    marginTop: 4,
    marginBottom: 4,
    marginHorizontal: 7,
    backgroundColor: '#ffffff',
    padding: 10,
    borderRadius: 3,
  },
  title: {
    fontSize: 18,
    marginBottom: 2,
    color: '#212121',
  },
  description: {
    fontSize: 15,
    marginTop: 5,
    marginBottom: 10,
    color: '#757575',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rowItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
