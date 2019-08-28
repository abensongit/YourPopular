import React from 'react';
import {
  ActivityIndicator, Image, StyleSheet, View, ViewPropTypes
} from 'react-native';
import PropTypes from 'prop-types';

export default class ImageView extends React.PureComponent {
  static propTypes = {
    source: PropTypes.string,
    style: ViewPropTypes.style,
    indicatorColor: PropTypes.string,
  };

  state: {
    loading: boolean;
  };

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
  }

  render() {
    return (
      <View style={[this.props.style]}>
        <Image
          style={[this.props.style, styles.imageStyle]}
          source={this.props.source}
          onLoad={() => this.setState({ loading: false })}
        />
        {
          this.state.loading
            ? (
              <View style={[this.props.style, styles.imageStyle]}>
                <ActivityIndicator size="large" color={this.props.indicatorColor} />
              </View>
            ) : null
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  imageStyle: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
