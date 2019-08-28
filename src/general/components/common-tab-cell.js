import React, { Component } from 'react';
import {
  TouchableOpacity
} from 'react-native';
import PropTypes from 'prop-types';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

type Props = {};
export default class CommonTabCell extends Component<Props> {
  static propTypes = {
    onSelect: PropTypes.func,
    onFavourite: PropTypes.func,
    projectModel: PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.state = {
      isFavourite: this.props.projectModel.isFavourite,
    };
  }

  /**
   * 牢记：https://github.com/reactjs/rfcs/blob/master/text/0006-static-lifecycle-methods.md
   *
   * componentWillReceiveProps 在新版 React 中废弃
   * @param nextProps
   * @param prevState
   * @returns {*}
   */
  static getDerivedStateFromProps(nextProps, prevState) {
    const { isFavourite } = nextProps.projectModel;
    if (prevState.isFavourite !== isFavourite) {
      return {
        isFavourite,
      };
    }
    return null;
  }

  onSelectProp() {
    this.props.onSelect((isFavourite) => {
      this.setFavouriteState(isFavourite);
    });
  }

  onPressFavourite() {
    this.setFavouriteState(!this.state.isFavourite);
    this.props.onFavourite(this.props.projectModel.item, !this.state.isFavourite);
  }

  setFavouriteState(isFavourite) {
    this.props.projectModel.isFavourite = isFavourite;
    this.setState({
      isFavourite,
    });
  }

  /**
   * 创建收藏按钮
   * @returns {*}
   */
  favouriteIcon() {
    return (
      <TouchableOpacity
        style={{ padding: 6 }}
        underlayColor="transparent"
        onPress={() => this.onPressFavourite()}
      >
        <FontAwesome
          name={this.state.isFavourite ? 'star' : 'star-o'}
          size={22}
          style={{ color: '#212121' }}
        />
      </TouchableOpacity>
    );
  }
}
