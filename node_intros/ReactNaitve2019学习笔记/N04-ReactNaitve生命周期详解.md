
### React Native 生命周期详解

``` 
一、创建阶段
   getDefaultProps方法

二、实例阶段
    getInitialState
    componentWillMount // 注意：未来将废除
    render
    componentDidMount

三、更新阶段
    static getDerivedStateFromProps()
    componentWillReceiveProps // 注意：未来将废除
    shouldComponentUpdate // 如果返回值为false，则后面三个方法不执行
    componentWillUpdate // 注意：未来将废除
    render
    componentDidUpdate

四、销毁阶段
    componentWillUnmount
```
