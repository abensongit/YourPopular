# ECMAScript 6 数组的扩展

----

### 1、二进制和八进制表示法

ES6 提供了二进制和八进制数值的新的写法，分别用前缀`0b`（或`0B`）和`0o`（或`0O`）表示。

```
0b111110111 === 503 // true
0o767 === 503 // true

// 如果要将0b和0o前缀的字符串数值转为十进制，要使用Number方法。
Number('0b111')  // 7
Number('0o10')  // 8
```


### 2、Number.isFinite(), Number.isNaN()

ES6 在`Number`对象上，新提供了`Number.isFinite()`和`Number.isNaN()`两个方法。

`Number.isFinite()`用来检查一个数值是否为有限的（`finite`），即不是`Infinity`。

注意，如果参数类型不是数值，`Number.isFinite`一律返回`false`。

```
Number.isFinite(15); // true
Number.isFinite(0.8); // true
Number.isFinite(NaN); // false
Number.isFinite(Infinity); // false
Number.isFinite(-Infinity); // false
Number.isFinite('foo'); // false
Number.isFinite('15'); // false
Number.isFinite(true); // false
```

`Number.isNaN()`用来检查一个值是否为`NaN`。

如果参数类型不是`NaN`，`Number.isNaN`一律返回`false`。

```
Number.isNaN(NaN) // true
Number.isNaN(15) // false
Number.isNaN('15') // false
Number.isNaN(true) // false
Number.isNaN(9/NaN) // true
Number.isNaN('true' / 0) // true
Number.isNaN('true' / 'true') // true
```


### 3、Number.parseInt(), Number.parseFloat()

ES6 将全局方法`parseInt()`和`parseFloat()`，移植到`Number`对象上面，行为完全保持不变。这样做的目的，是逐步减少全局性方法，使得语言逐步模块化。

```
// ES5的写法
parseInt('12.34') // 12
parseFloat('123.45#') // 123.45

// ES6的写法
Number.parseInt('12.34') // 12
Number.parseFloat('123.45#') // 123.45
```


### 4、Number.isInteger()

`Number.isInteger()`用来判断一个数值是否为整数。如果参数不是数值，`Number.isInteger`返回`false`。

```
Number.isInteger(25) // true
Number.isInteger(25.1) // false

Number.isInteger(25) // true
Number.isInteger(25.0) // true

Number.isInteger() // false
Number.isInteger(null) // false
Number.isInteger('15') // false
Number.isInteger(true) // false

// 注意，由于 JavaScript 采用 IEEE 754 标准，数值存储为64位双精度格式，
// 数值精度最多可以达到 53 个二进制位（1 个隐藏位与 52 个有效位）。
// 如果数值的精度超过这个限度，第54位及后面的位就会被丢弃，这种情况下，
// Number.isInteger可能会误判。
// 下面小数的精度达到了小数点后16个十进制位，转成二进制位超过了53个二进制位
Number.isInteger(3.0000000000000002) // true

// 如果一个数值的绝对值小于Number.MIN_VALUE（5E-324），即小于 JavaScript 能够分辨的最小值，会被自动转为 0。
// 这时，Number.isInteger也会误判。
// 下面 5E-325 由于值太小，会被自动转为0，因此返回true。
Number.isInteger(5E-324) // false
Number.isInteger(5E-325) // true

```

总之，如果对数据精度的要求较高，不建议使用Number.isInteger()判断一个数值是否为整数。



### 5、Number.EPSILON

ES6 在`Number`对象上面，新增一个极小的常量`Number.EPSILON`。**根据规格，它表示 1 与大于 1 的最小浮点数之间的差。**

对于 64 位浮点数来说，大于 1 的最小浮点数相当于二进制的1.00..001，小数点后面有连续 51 个零。这个值减去 1 之后，就等于 2 的 -52 次方。

```
Number.EPSILON === Math.pow(2, -52)
// true
Number.EPSILON
// 2.220446049250313e-16
Number.EPSILON.toFixed(20)
// "0.00000000000000022204"
```

`Number.EPSILON`实际上是`JavaScript`能够表示的最小精度。误差如果小于这个值，就可以认为已经没有意义了，即不存在误差了。

`Number.EPSILON`可以用来设置“能够接受的误差范围”。比如，误差范围设为 `2` 的 `-50` 次方（即`Number.EPSILON * Math.pow(2, 2)`），即如果两个浮点数的差小于这个值，我们就认为这两个浮点数相等。

```
function withinErrorMargin (left, right) {
  return Math.abs(left - right) < Number.EPSILON * Math.pow(2, 2);
}

0.1 + 0.2 === 0.3 // false
withinErrorMargin(0.1 + 0.2, 0.3) // true

1.1 + 1.3 === 2.4 // false
withinErrorMargin(1.1 + 1.3, 2.4) // true
```


### 6、安全整数和 Number.isSafeInteger()

JavaScript 能够准确表示的整数范围在`-2^53`到`2^53`之间（不含两个端点），超过这个范围，无法精确表示这个值。

ES6 引入了`Number.MAX_SAFE_INTEGER`和`Number.MIN_SAFE_INTEGER`这两个常量，用来表示这个范围的上下限。

```
Number.MAX_SAFE_INTEGER === Math.pow(2, 53) - 1
// true
Number.MAX_SAFE_INTEGER === 9007199254740991
// true

Number.MIN_SAFE_INTEGER === -Number.MAX_SAFE_INTEGER
// true
Number.MIN_SAFE_INTEGER === -9007199254740991
// true
```

`Number.isSafeInteger()`则是用来判断一个整数是否落在这个范围之内。

```
Number.isSafeInteger('a') // false
Number.isSafeInteger(null) // false
Number.isSafeInteger(NaN) // false
Number.isSafeInteger(Infinity) // false
Number.isSafeInteger(-Infinity) // false

Number.isSafeInteger(3) // true
Number.isSafeInteger(1.2) // false
Number.isSafeInteger(9007199254740990) // true
Number.isSafeInteger(9007199254740992) // false

Number.isSafeInteger(Number.MIN_SAFE_INTEGER - 1) // false
Number.isSafeInteger(Number.MIN_SAFE_INTEGER) // true
Number.isSafeInteger(Number.MAX_SAFE_INTEGER) // true
Number.isSafeInteger(Number.MAX_SAFE_INTEGER + 1) // false
```

实际使用这个函数时，需要注意。验证运算结果是否落在安全整数的范围内，不要只验证运算结果，而要同时验证参与运算的每个值。

```
Number.isSafeInteger(9007199254740993)
// false
Number.isSafeInteger(990)
// true
Number.isSafeInteger(9007199254740993 - 990)
// true
9007199254740993 - 990
// 返回结果 9007199254740002
// 正确答案应该是 9007199254740003


// 下面的函数可以同时验证两个运算数和运算结果。
function trusty (left, right, result) {
  if (
    Number.isSafeInteger(left) &&
    Number.isSafeInteger(right) &&
    Number.isSafeInteger(result)
  ) {
    return result;
  }
  throw new RangeError('Operation cannot be trusted!');
}

trusty(9007199254740993, 990, 9007199254740993 - 990)
// RangeError: Operation cannot be trusted!

trusty(1, 2, 3)
// 3
```


### 7、Math 对象的扩展

```
Math.trunc()  // 方法用于去除一个数的小数部分，返回整数部分。
Math.sign()  // 方法用来判断一个数到底是正数、负数、还是零。对于非数值，会先将其转换为数值。
Math.cbrt()  // 方法用于计算一个数的立方根。
Math.clz32()  // 方法将参数转为 32 位无符号整数的形式，然后这个 32 位值里面有多少个前导 0。
Math.imul()  // 方法返回两个数以 32 位带符号整数形式相乘的结果，返回的也是一个 32 位的带符号整数。
Math.fround()  // 方法返回一个数的32位单精度浮点数形式。
Math.hypot()  // 方法返回所有参数的平方和的平方根。

对数方法
Math.expm1()
Math.log1p()
Math.log10()
Math.log2()

双曲函数方法
Math.sinh(x) 返回x的双曲正弦（hyperbolic sine）
Math.cosh(x) 返回x的双曲余弦（hyperbolic cosine）
Math.tanh(x) 返回x的双曲正切（hyperbolic tangent）
Math.asinh(x) 返回x的反双曲正弦（inverse hyperbolic sine）
Math.acosh(x) 返回x的反双曲余弦（inverse hyperbolic cosine）
Math.atanh(x) 返回x的反双曲正切（inverse hyperbolic tangent）

```


### 8、指数运算符

ES2016 新增了一个指数运算符（`**`）。指数运算符可以与等号结合，形成一个新的赋值运算符（`**=`）。

```
// 相当于 2 ** (3 ** 2)
2 ** 3 ** 2
// 512

let a = 1.5;
a **= 2;
// 等同于 a = a * a;

// 注意，V8引擎的指数运算符与Math.pow的实现不相同，对于特别大的运算结果，两者会有细微的差异。
// 下面代码中，两个运算结果的最后一位有效数字是有差异的。
Math.pow(99, 99)
// 3.697296376497263e+197
99 ** 99
// 3.697296376497268e+197
```
