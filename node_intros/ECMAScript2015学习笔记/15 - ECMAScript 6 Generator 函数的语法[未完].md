# Generator 函数的语法 

----

- [1] - XXXXX
- [2] - XXXXX


### 1、Object.is

ES6 提出“`Same-value equality`”（同值相等）算法，用来解决这个问题。`Object.is`就是部署这个算法的新方法。它用来比较两个值是否严格相等，与严格比较运算符（`===`）的行为基本一致。

```
Object.is('foo', 'foo')
// true
Object.is({}, {})
// false

Object.is(+0, -0) // false
Object.is(NaN, NaN) // true

// ES5 可以通过下面的代码，部署Object.is。
Object.defineProperty(Object, 'is', {
  value: function(x, y) {
    if (x === y) {
      // 针对+0 不等于 -0的情况
      return x !== 0 || 1 / x === 1 / y;
    }
    // 针对NaN的情况
    return x !== x && y !== y;
  },
  configurable: true,
  enumerable: false,
  writable: true
});
```
