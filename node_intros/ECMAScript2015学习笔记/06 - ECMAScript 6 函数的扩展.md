# ECMAScript 6 函数的扩展

----


- [1] - 函数参数的默认值
- [2] - rest 参数
- [3] - 严格模式
- [4] - name 属性
- [5] - 箭头函数
- [6] - 双冒号运算符
- [7] - 尾调用优化
- [8] - 函数参数的尾逗号


### 1、函数参数的默认值

#### 1.1 基本用法

ES6 允许为函数的参数设置默认值，即直接写在参数定义的后面。

```
function log(x, y = 'World') {
  console.log(x, y);
}
log('Hello') // Hello World
log('Hello', 'China') // Hello China
log('Hello', '') // Hello


function Point(x = 0, y = 0) {
  this.x = x;
  this.y = y;
}
const p = new Point();
p // { x: 0, y: 0 }

```

参数变量是默认声明的，所以不能用`let`或`const`再次声明。

```
function foo(x = 5) {
  let x = 1; // error
  const x = 2; // error
}
```

使用参数默认值时，函数不能有同名参数。

```
// 不报错
function foo(x, x, y) {
  // ...
}

// 报错
function foo(x, x, y = 1) {
  // ...
}
// SyntaxError: Duplicate parameter name not allowed in this context

```

参数默认值不是传值的，而是每次都重新计算默认值表达式的值。也就是说，参数默认值是惰性求值的。

```
let x = 99;
function foo(p = x + 1) {
  console.log(p);
}
foo() // 100

x = 100;
foo() // 101
```

每次调用函数foo，都会重新计算x + 1，而不是默认p等于 100。


#### 1.2 与解构赋值默认值结合使用 

请问下面两种写法有什么差别？

```
// 写法一
function m1({x = 0, y = 0} = {}) {
  return [x, y];
}

// 写法二
function m2({x, y} = { x: 0, y: 0 }) {
  return [x, y];
}

```

上面两种写法都对函数的参数设定了默认值，**区别是写法一函数参数的默认值是空对象，但是设置了对象解构赋值的默认值；写法二函数参数的默认值是一个有具体属性的对象，但是没有设置对象解构赋值的默认值。**

```
// 函数没有参数的情况
m1() // [0, 0]
m2() // [0, 0]

// x 和 y 都有值的情况
m1({x: 3, y: 8}) // [3, 8]
m2({x: 3, y: 8}) // [3, 8]

// x 有值，y 无值的情况
m1({x: 3}) // [3, 0]
m2({x: 3}) // [3, undefined]

// x 和 y 都无值的情况
m1({}) // [0, 0];
m2({}) // [undefined, undefined]

m1({z: 3}) // [0, 0]
m2({z: 3}) // [undefined, undefined]
```


#### 1.3 参数默认值的位置

**通常情况下，定义了默认值的参数，应该是函数的尾参数。**因为这样比较容易看出来，到底省略了哪些参数。**如果非尾部的参数设置默认值，实际上这个参数是没法省略的。**

```
// 例一
function f(x = 1, y) {
  return [x, y];
}

f() // [1, undefined]
f(2) // [2, undefined])
f(, 1) // 报错
f(undefined, 1) // [1, 1]

// 例二
function f(x, y = 5, z) {
  return [x, y, z];
}

f() // [undefined, 5, undefined]
f(1) // [1, 5, undefined]
f(1, ,2) // 报错
f(1, undefined, 2) // [1, 5, 2]
```

上面代码中，有默认值的参数都不是尾参数。这时，无法只省略该参数，而不省略它后面的参数，除非显式输入`undefined`。

如果传入`undefined`，将触发该参数等于默认值，`null`则没有这个效果。

```
function foo(x = 5, y = 6) {
  console.log(x, y);
}

foo(undefined, null)
// 5 null
```


#### 1.4 函数的 length 属性

指定了默认值以后，函数的`length`属性，将返回没有指定默认值的参数个数。

```
(function (a) {}).length // 1
(function (a = 5) {}).length // 0
(function (a, b, c = 5) {}).length // 2
```

函数的`length`属性的含义是，该函数预期传入的参数个数。某个参数指定默认值以后，预期传入的参数个数就不包括这个参数了。同理，后文的`rest`参数也不会计入length属性。

```
(function(...args) {}).length // 0
```

**如果设置了默认值的参数不是尾参数，那么`length`属性也不再计入后面的参数了。**

```
(function (a = 0, b, c) {}).length // 0
(function (a, b = 1, c) {}).length // 1
```


#### 1.5 作用域

**一旦设置了参数的默认值，函数进行声明初始化时，参数会形成一个单独的作用域（context）**。等到初始化结束，这个作用域就会消失。这种语法行为，**在不设置参数默认值时，是不会出现的。**

```
var x = 1;
function f(x, y = x) {
  console.log(y);
}
f(2) // 2
```

上面代码中，参数y的默认值等于变量x。调用函数f时，参数形成一个单独的作用域。在这个作用域里面，默认值变量x指向第一个参数x，而不是全局变量x，所以输出是2。

```
var x = 1;
function foo(x, y = function() { x = 2; }) {
  var x = 3;
  y();
  console.log(x);
}

foo() // 3
x // 1
```

上面代码中，函数`foo`的参数形成一个单独作用域。这个作用域里面，首先声明了变量`x`，然后声明了变量`y`，`y`的默认值是一个匿名函数。这个匿名函数内部的变量x，指向同一个作用域的第一个参数x。函数`foo`内部又声明了一个内部变量`x`，该变量与第一个参数`x`由于不是同一个作用域，所以不是同一个变量，因此执行y后，内部变量`x`和外部全局变量x的值都没变。

如果将`var x = 3`的`var`去除，函数`foo`的内部变量`x`就指向第一个参数x，与匿名函数内部的`x`是一致的，所以最后输出的就是`2`，而外层的全局变量`x`依然不受影响。

```
var x = 1;
function foo(x, y = function() { x = 2; }) {
  x = 3;
  y();
  console.log(x);
}

foo() // 2
x // 1
```

#### 1.6 应用

利用参数默认值，可以指定某一个参数不得省略，如果省略就抛出一个错误。

```
function throwIfMissing() {
  throw new Error('Missing parameter');
}

function foo(mustBeProvided = throwIfMissing()) {
  return mustBeProvided;
}

foo()
// Error: Missing parameter
```

可以将参数默认值设为`undefined`，表明这个参数是可以省略的。

```
function foo(optional = undefined) { ··· }
```


### 2、rest 参数

ES6 引`rest`参数（形式为`...变量名`），用于获取函数的多余参数，这样就不需要使用`arguments`对象了。

```
// arguments 变量的写法
// arguments 对象不是数组，而是一个类似数组的对象。
// 所以为了使用数组的方法，必须使用Array.prototype.slice.call先将其转为数组。
function sortNumbers() {
  return Array.prototype.slice.call(arguments).sort();
}

// rest 参数的写法
// rest 它就是一个真正的数组，数组特有的方法都可以使用。
const sortNumbers = (...numbers) => numbers.sort();
```

注意，`rest`参数之后不能再有其他参数（即只能是最后一个参数），否则会报错。函数的length属性，不包括 rest 参数。

```
// 报错
function f(a, ...b, c) {
  // ...
}

(function(a) {}).length  // 1
(function(...a) {}).length  // 0
(function(a, ...b) {}).length  // 1
```


### 3、严格模式

从 ES5 开始，函数内部可以设定为严格模式。**ES2016 做了一点修改，规定只要函数参数使用了默认值、解构赋值、或者扩展运算符，那么函数内部就不能显式设定为严格模式，否则会报错。**

```
// 报错
function doSomething(a, b = a) {
  'use strict';
  // code
}

// 报错
const doSomething = function ({a, b}) {
  'use strict';
  // code
};

// 报错
const doSomething = (...a) => {
  'use strict';
  // code
};

const obj = {
  // 报错
  doSomething({a, b}) {
    'use strict';
    // code
  }
};
```

这样规定的原因是，函数内部的严格模式，同时适用于函数体和函数参数。但是，函数执行的时候，先执行函数参数，然后再执行函数体。这样就有一个不合理的地方，只有从函数体之中，才能知道参数是否应该以严格模式执行，但是参数却应该先于函数体执行。


### 4、name 属性

```
// 函数的`name`属性，返回该函数的函数名。
function foo() {}
foo.name // "foo"

// 将一个匿名函数赋值给一个变量，ES5 的name属性，会返回空字符串，而 ES6 的name属性会返回实际的函数名。
var f = function () {};
// ES5
f.name // ""
// ES6
f.name // "f"

// 将一个具名函数赋值给一个变量，则 ES5 和 ES6 的name属性都返回这个具名函数原本的名字。
const bar = function baz() {};
// ES5
bar.name // "baz"
// ES6
bar.name // "baz"

// Function构造函数返回的函数实例，name属性的值为anonymous。
(new Function).name // "anonymous"

// bind返回的函数，name属性值会加上bound前缀。
function foo() {};
foo.bind({}).name // "bound foo"
(function(){}).bind({}).name // "bound "
```


### 5、箭头函数


### 6、双冒号运算符


### 7、尾调用优化


### 8、函数参数的尾逗号



