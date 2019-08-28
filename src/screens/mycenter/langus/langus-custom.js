import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Alert, ScrollView, Text, TouchableOpacity, View
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CheckBox from 'react-native-check-box';
import {
  BackHandlerComponent, NavigationService
} from '../../../common';
import {
  NavigationBar
} from '../../../components';
import {
  ArrayUtil
} from '../../../expand';
import LangusDao from './langus-dao';
import * as actions from './langus-actions';
import styles from './langus-custom-styles';


type Props = {};
class LangusCustomScreen extends Component<Props> {
  /**
   * 获取state
   * @param nextProps
   * @param prevState
   * @returns {*}
   */
  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.ckeckkeys !== LangusCustomScreen.getLanguages(nextProps, null, prevState)) {
      return {
        ckeckkeys: LangusCustomScreen.getLanguages(nextProps, null, prevState),
      };
    }
    return null;
  }

  /**
   * 获取语言
   * @param props
   * @param original 移除语言时使用，是否从props获取原始对的语言
   * @param state 移除语言时使用
   * @returns {*}
   * @private
   */
  static getLanguages(props, original, state) {
    const { isRemoveKey } = props.navigation.state.params;
    if (isRemoveKey && !original) {
      // 如果 state 中的 languages 为空则从 props 中取
      return state && state.ckeckkeys && state.ckeckkeys.length !== 0 && state.ckeckkeys || props.languages.map(val => ({
        // 注意：不直接修改props，copy一份
        ...val,
        checked: false
      }));
    }
    return props.languages;
  }

  /**
   * 构造函数
   * @param props
   */
  constructor(props) {
    super(props);
    this.params = this.props.navigation.state.params;
    this.backPressComponent = new BackHandlerComponent({ hardwareBackPressAction: this.onHardwareBackPressAction });
    this.langusDao = new LangusDao();
    this.isRemoveKey = this.params.isRemoveKey;
    this.changeValues = [];
    this.state = {
      ckeckkeys: []
    };
  }

  /**
   * 组件渲染完成
   */
  componentDidMount() {
    // 处理 Android 中的物理返回键
    this.backPressComponent.componentDidMount();
    // 如果 props 中标签为空，则从本地存储中获取标签
    if (LangusCustomScreen.getLanguages(this.props).length === 0) {
      const { onLoadLanguages } = this.props;
      onLoadLanguages();
    }
    this.setState({
      ckeckkeys: LangusCustomScreen.getLanguages(this.props),
    });
  }

  /**
   * 组件将要销毁
   */
  componentWillUnmount() {
    // 处理 Android 中的物理返回键
    this.backPressComponent.componentWillUnmount();
  }

  /**
   * 处理 Android 中的物理返回键
   */
  onHardwareBackPressAction = () => {
    this.onNaviBackPressAction();
    return true;
  };

  /**
   * 导航返回按钮
   */
  onNaviBackPressAction() {
    if (this.changeValues.length > 0) {
      Alert.alert('提示', '要保存修改吗？',
        [
          {
            text: '否',
            onPress: () => {
              // 还原 store 状态
              const { ckeckkeys } = this.state;
              this.changeValues.forEach((value, index) => {
                for (let i = 0, l = ckeckkeys.length; i < l; i++) {
                  const val = ckeckkeys[i];
                  if (value === val || val && val.name && val.name === value.name) {
                    val.checked = !val.checked;
                    ckeckkeys[i] = val;
                  }
                }
              });
              this.setState({
                ckeckkeys
              });
              // 返回上一个页面
              NavigationService.goBack(this.props.navigation);
            }
          }, {
          text: '是',
          onPress: () => {
            this.doSave();
          }
        }
        ]);
    } else {
      NavigationService.goBack(this.props.navigation);
    }
  }

  /**
   * 点击CheckBox事件
   * @param data
   * @param index
   */
  onClickCheckBox(data, index) {
    data.checked = !data.checked;
    ArrayUtil.updateArray(this.changeValues, data);
    const { ckeckkeys } = this.state;
    ckeckkeys[index] = data; // 更新state以便显示选中状态
    this.setState({
      ckeckkeys
    });
  }

  /**
   * 退出保存
   */
  doSave() {
    if (this.changeValues.length === 0) {
      NavigationService.goBack(this.props.navigation);
      return;
    }
    let ckeckkeys;
    if (this.isRemoveKey) {
      // 移除语言的特殊处理
      for (let i = 0, l = this.changeValues.length; i < l; i++) {
        ArrayUtil.remove(ckeckkeys = LangusCustomScreen.getLanguages(this.props, true), this.changeValues[i], 'name');
      }
    }
    // 更新本地数据
    this.langusDao.save(ckeckkeys || this.state.ckeckkeys);
    const { onLoadLanguages } = this.props;
    // 更新store
    onLoadLanguages();
    NavigationService.goBack(this.props.navigation);
  }

  /**
   *  组件 CheckBox 图标
   * @param checked
   * @returns {*}
   */
  checkedImage(checked) {
    const { theme } = this.params;
    return (
      <Ionicons
        name={checked ? 'ios-checkbox' : 'md-square-outline'}
        size={20}
        style={{
          color: theme.themeColor,
        }}
      />
    );
  }

  /**
   * 组件 CheckBox
   * @param data
   * @param index
   * @returns {*}
   */
  renderCheckBox(data, index) {
    return (
      <CheckBox
        style={{ flex: 1, paddingHorizontal: 15, paddingVertical: 12, }}
        leftText={data.name}
        isChecked={data.checked}
        onClick={() => this.onClickCheckBox(data, index)}
        checkedImage={this.checkedImage(true)}
        unCheckedImage={this.checkedImage(false)}
      />
    );
  }

  /**
   * 列表内容
   * @returns {*}
   */
  renderView() {
    const dataArray = this.state.ckeckkeys;
    if (!dataArray || dataArray.length === 0) {
      return null;
    }
    const len = dataArray.length;
    const views = [];
    for (let i = 0, l = len; i < l; i += 2) {
      views.push(
        <View key={i}>
          <View style={styles.item}>
            {this.renderCheckBox(dataArray[i], i)}
            {i + 1 < len && this.renderCheckBox(dataArray[i + 1], i + 1)}
          </View>
          <View style={styles.spearatorLine} />
        </View>
      );
    }
    return views;
  }

  /**
   * 创建导航条按钮（右侧）
   * @returns {*}
   */
  renderNavBarRightButton(title, callBack) {
    return (
      <TouchableOpacity
        style={{ alignItems: 'center', }}
        onPress={callBack}
      >
        <Text style={{ fontSize: 16, color: '#FFFFFF', marginRight: 10 }}>{title}</Text>
      </TouchableOpacity>
    );
  }

  /**
   * 创建导航条控件
   * @returns {*}
   */
  renderNavigationBar() {
    // 状态栏
    const statusBar = {
      barStyle: 'light-content',
      backgroundColor: this.props.theme.themeColor,
    };
    // 导航条
    const navBar = {
      backgroundColor: this.props.theme.themeColor,
    };
    // 标题头
    const titleStyle = {
      color: 'white',
    };
    const title = this.isRemoveKey ? '语言移除' : '语言配置';
    const rightButtonTitle = this.isRemoveKey ? '移除' : '保存';
    return (
      <NavigationBar
        title={title}
        statusBar={statusBar}
        style={navBar}
        titleStyle={titleStyle}
        returnBackHandle={() => this.onNaviBackPressAction()}
        rightButton={this.renderNavBarRightButton(rightButtonTitle, () => this.doSave())}
      />
    );
  }

  /**
   * 渲染界面
   * @returns {*}
   */
  render() {
    const navigationBar = this.renderNavigationBar();
    return (
      <View style={styles.container}>
        {navigationBar}
        <ScrollView>
          {this.renderView()}
        </ScrollView>
      </View>
    );
  }
}

const AppMapStateToProps = state => ({
  theme: state.theme.theme,
  languages: state.langus.languages,
});

const AppMapDispatchToProps = dispatch => ({
  onLoadLanguages: () => dispatch(actions.onLoadLanguages()),
});

export default connect(AppMapStateToProps, AppMapDispatchToProps)(LangusCustomScreen);
