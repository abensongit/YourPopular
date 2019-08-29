### React Native 数据存储之 AsyncStorage 讲解


#### 一、AsyncStorage 在iOS下存储分两种情况

- 如果存储的内容较小，那么AsyncStorage会将要存储的内容放在一个序列化的字典中；

- 如果存储的内容较大，那么AsyncStorage会将要存储的内容放在一个单独的文件中；

#### 二、AsyncStorage 在Android下存储分两种情况

- AsyncStorage会将数据存储在 RocksDB 或者 SQLite，具体存储在 RocksDB 中还是 SQLite 中，取决于设备支持哪一种存储方式；

#### 三、如何使用 AsyncStorage

``` 
static getItem(key: string, callback?: ?(error: ?Error, result: ?string) => void) 
// 读取key字段并将结果作为第二个参数传递给callback。如果有任何错误发生，则会传递一个Error对象作为第一个参数。返回一个Promise对象。

static setItem(key: string, value: string, callback?: ?(error: ?Error) => void) 
// 将key字段的值设置成value，并在完成后调用callback函数。如果有任何错误发生，则会传递一个Error对象作为第一个参数。返回一个Promise对象。

static removeItem(key: string, callback?: ?(error: ?Error) => void) 
// 删除一个字段。返回一个Promise对象。

static mergeItem(key: string, value: string, [callback]: ?(error: ?Error) => void)
// 假设已有的值和新的值都是字符串化的 JSON，则将两个值合并。返回一个Promise对象。

static clear([callback]: ?(error: ?Error) => void)
// 清空全部的AsyncStorage数据，不论来自什么库或调用者。

```

#### 四、如何使用 AsyncStorage

```
/**
 * 保存
 * @returns {Promise.<void>}
 */
async doSave(key, value, callback) {
  // 用法一
  AsyncStorage.setItem(key, JSON.stringify(value), (error) => {
    error && console.log(error.toString());
  });

  // 用法二
  AsyncStorage.setItem(key, JSON.stringify(value)).then((error) => {
    error && console.log(error.toString());
  });

  // 用法三
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    error && console.log(error.toString());
  }
}

/**
 * 获取
 * @returns {Promise.<void>}
 */
async doGet(key) {
  // 用法一
  AsyncStorage.getItem(key, (error, value) => {
    this.setSate({
      data: value
    });
    console.log(value);
    error && console.log(error.toString());
  });

  // 用法二
  AsyncStorage.getItem(key)
    .then((value) => {
      this.setSate({
        data: value
      });
      console.log(value);
    })
    .catch((error) => {
      error && console.log(error.toString());
    });

  // 用法三
  try {
    const value = await AsyncStorage.getItem(key);
    this.setSate({
      data: value
    });
    console.log(value);
  } catch (error) {
    error && console.log(error.toString());
  }
}

/**
 * 删除
 * @returns {Promise.<void>}
 */
async doRemove(key) {
  // 用法一
  AsyncStorage.removeItem(key, (error) => {
    error && console.log(error.toString());
  });

  // 用法二
  AsyncStorage.removeItem(key)
    .catch((error) => {
      error && console.log(error.toString());
    });

  // 用法三
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    error && console.log(error.toString());
  }
}
```
