import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Alert, Text, TouchableOpacity, View
} from 'react-native';
import SortableListView from 'react-native-sortable-listview';
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
import SortedTableCell from './langus-sorted-cell';
import * as actions from './langus-actions';
import styles from './langus-sorted-styles';


type Props = {};
class LangusSortedScreen extends Component<Props> {
  /**
   * 获取state
   * @param nextProps
   * @param prevState
   * @returns {*}
   */
  static getDerivedStateFromProps(nextProps, prevState) {
    // 在 getDerivedStateFromProps 中进行 state 的改变
    // 当传入 checkedArray 发生变化时，更新 state
    if (prevState.checkedArray !== LangusSortedScreen.getCheckedMarks(nextProps, prevState)) {
      return {
        checkedArray: LangusSortedScreen.getCheckedMarks(nextProps, prevState),
      };
    }
    // 否则，对于 state 不进行任何操作
    return null;
  }

  /**
   * 获取显示标签
   * @param props
   * @param state
   * @returns {*}
   * @private
   */
  static getCheckedMarks(props, state) {
    // 如果 state 中有 checkedArray，则使用 state 中的 checkedArray
    if (state && state.checkedArray && state.checkedArray.length) {
      return state.checkedArray;
    }
    // 否则，从原始数据中获取 checkedArray
    const dataArray = props.languages || [];
    const marks = [];
    for (let i = 0, len = dataArray.length; i < len; i++) {
      const data = dataArray[i];
      if (data.checked) {
        marks.push(data);
      }
    }
    return marks;
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
    this.state = {
      checkedArray: LangusSortedScreen.getCheckedMarks(this.props),
    };
  }

  /**
   * 组件渲染完成
   */
  componentDidMount() {
    // 处理 Android 中的物理返回键
    this.backPressComponent.componentDidMount();
    // 如果 props 中标签为空，则从本地存储中获取标签
    if (LangusSortedScreen.getCheckedMarks(this.props).length === 0) {
      const { onLoadLanguages } = this.props;
      onLoadLanguages();
    }
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
    if (!ArrayUtil.isEqual(LangusSortedScreen.getCheckedMarks(this.props), this.state.checkedArray)) {
      Alert.alert('提示', '要保存修改吗？',
        [
          {
            text: '否',
            onPress: () => {
              NavigationService.goBack(this.props.navigation);
            }
          }, {
          text: '是',
          onPress: () => {
            this.doSave(true);
          }
        }
        ]);
    } else {
      NavigationService.goBack(this.props.navigation);
    }
  }

  /**
   * 获取排序后的标签结果
   * @returns {Array}
   */
  getSortedResult() {
    // 从原始数据中复制一份数据出来，以便对这份数据进行进行排序，包括未显示的数据
    const sortResultArray = ArrayUtil.clone(this.props.languages);
    // 获取排序之前的排列顺序，只包括显示的数据
    const originalCheckedArray = LangusSortedScreen.getCheckedMarks(this.props);
    // 遍历排序之前的数据，用排序后的数据 checkedArray 进行替换
    for (let i = 0, len = originalCheckedArray.length; i < len; i++) {
      const item = originalCheckedArray[i];
      // 找到要替换的元素所在位置
      const index = this.props.languages.indexOf(item);
      // 进行替换
      sortResultArray.splice(index, 1, this.state.checkedArray[i]);
    }
    return sortResultArray;
  }

  /**
   * 退出保存
   */
  doSave(hasChecked) {
    if (!hasChecked) {
      // 如果没有排序则直接返回
      if (ArrayUtil.isEqual(LangusSortedScreen.getCheckedMarks(this.props), this.state.checkedArray)) {
        NavigationService.goBack(this.props.navigation);
        return;
      }
    }
    // 保存排序后的数据
    this.langusDao.save(this.getSortedResult());

    // 重新加载排序后的标签，以便其他页面能够及时更新
    const { onLoadLanguages } = this.props;
    onLoadLanguages();
    // 返回上级页面
    NavigationService.goBack(this.props.navigation);
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
        <Text style={{ fontSize: 16, color: '#ffffff', marginRight: 10 }}>{title}</Text>
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
    const title = '语言排序';
    return (
      <NavigationBar
        title={title}
        statusBar={statusBar}
        style={navBar}
        titleStyle={titleStyle}
        returnBackHandle={() => this.onNaviBackPressAction()}
        rightButton={this.renderNavBarRightButton('保存', () => this.doSave())}
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
        <SortableListView
          data={this.state.checkedArray}
          order={Object.keys(this.state.checkedArray)}
          onRowMoved={(args) => {
            this.state.checkedArray.splice(args.to, 0, this.state.checkedArray.splice(args.from, 1)[0]);
            this.forceUpdate();
          }}
          renderRow={row => <SortedTableCell data={row} {...this.params} />}
        />
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

export default connect(AppMapStateToProps, AppMapDispatchToProps)(LangusSortedScreen);
