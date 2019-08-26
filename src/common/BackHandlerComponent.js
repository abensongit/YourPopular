import { BackHandler } from 'react-native';

/**
 * Android 中的物理返回键处理
 */
export default class BackHandlerComponent {
  constructor(props) {
    this.hardwareBackPressListener = this.onhardwareBackPressAction.bind(this);
    this.props = props;
  }

  componentDidMount() {
    /**
     * 处理 Android 中的物理返回键
     */
    if (Platform.OS === 'android') {
      if (this.props.hardwareBackPressAction) {
        BackHandler.addEventListener('hardwareBackPress', this.hardwareBackPressListener);
      }
    }
  }

  componentWillUnmount() {
    /**
     * 处理 Android 中的物理返回键
     */
    if (Platform.OS === 'android') {
      if (this.props.hardwareBackPressAction) {
        BackHandler.removeEventListener('hardwareBackPress', this.hardwareBackPressListener);
      }
    }
  }

  onhardwareBackPressAction(event) {
    return this.props.hardwareBackPressAction(event);
  }
}
