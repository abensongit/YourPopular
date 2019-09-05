# ECMAScript 6 变量命名原则

----

JavaScript 在 1997 年被标准化时，就有 6 种数据类型，直到 ES6 出现之前，程序中的变量一定是以下 6 种数据类型之一：

```
Undefined
Null
Boolean
Number
String
Object
```

### 匈牙利命名法

```
变量名 ＝ 数据类型 + 对象描述
```

- **数据类型：**指的是`JavaScript`中六种数据类型之一，`undefined`、`null`、`boolean`、`number`、`string`和`Object`。

- **对象描述：**指对象名字全称或名字的一部分，而且要有明确含义，易记而且还要好理解。


```
a: 表示数组Array
b: 表示布尔Boolean
s: 表示字符串String
i: 表示整型Int(它是Number中的整数类型)
fl: 表示浮点Float(它是Number中的小数类型)
o: 表示对象Object
fn: 不示函数Function
re: 表示正则Regular Expression

// 匈牙利命名法例子
var aPerson = []; // Array数组 
var sName = "W3CPlus"; // string 字符串
var fnName = function () {}; // function函数 
var oButton = document.getElementById('btn'); // Object对象 
```




