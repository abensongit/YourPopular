# ECMAScript 6 数组的扩展

----


- [1] - 属性的简洁表示法
- [2] - 属性名表达式
- [3] - 方法的 name 属性
- [4] - 属性的可枚举性和遍历
- [5] - super 关键字
- [6] - 对象的扩展运算符


### 1、属性的简洁表示法

```
ES6 允许直接写入变量和函数，作为对象的属性和方法。

// 属性简写，例子01
const foo = 'bar';
const baz = {foo};
baz // {foo: "bar"}
// 等同于
const baz = {foo: foo};


// 属性简写，例子02
function f(x, y) {
  return {x, y};
}
// 等同于
function f(x, y) {
  return {x: x, y: y};
}
f(1, 2) // Object {x: 1, y: 2}


// 方法简写，例子03
const o = {
  method() {
    return "Hello!";
  }
};
// 等同于
const o = {
  method: function() {
    return "Hello!";
  }
};


// 实际例子04
let birth = '2000/01/01';
const Person = {
  name: '张三',
  // 等同于birth: birth
  birth,
  // 等同于hello: function ()...
  hello() { console.log('我的名字是', this.name); }
};


// 属性的赋值器（setter）和取值器（getter），也是采用这种写法。
const cart = {
  _wheels: 4,

  get wheels () {
    return this._wheels;
  },

  set wheels (value) {
    if (value < this._wheels) {
      throw new Error('数值太小了！');
    }
    this._wheels = value;
  }
}


// 方法是一个 Generator 函数，前面需要加上星号。
const obj = {
  * m() {
    yield 'hello world';
  }
};
```


### 2、属性名表达式

```
// 方法一
obj.foo = true;

// 方法二
obj['a' + 'bc'] = 123;

// （表达式）作为对象的属性名，即把表达式放在方括号内。
let lastWord = 'last word';
const a = {
  'first word': 'hello',
  [lastWord]: 'world'
};
a['first word'] // "hello"
a[lastWord] // "world"
a['last word'] // "world"

// 属性名表达式如果是一个对象，默认情况下会自动将对象转为字符串[object Object]
// 下面代码中，[keyA]和[keyB]得到的都是[object Object]，所以[keyB]会把[keyA]覆盖掉，而myObject最后只有一个[object Object]属性。
const keyA = {a: 1};
const keyB = {b: 2};
const myObject = {
  [keyA]: 'valueA',
  [keyB]: 'valueB'
};
myObject // Object {[object Object]: "valueB"}

```


### 3、方法的 name 属性

```
// 对象的方法使用了取值函数（getter）和存值函数（setter），则name属性不是在该方法上面，而是该方法的属性的描述对象的get和set属性上面，返回值是方法名前加上get和set。
const obj = {
  get foo() {},
  set foo(x) {}
};
obj.foo.name
// TypeError: Cannot read property 'name' of undefined

const descriptor = Object.getOwnPropertyDescriptor(obj, 'foo');
descriptor.get.name // "get foo"
descriptor.set.name // "set foo"

// 有两种特殊情况：bind方法创造的函数，name属性返回bound加上原函数的名字；Function构造函数创造的函数，name属性返回anonymous。
(new Function()).name // "anonymous"
var doSomething = function() {
  // ...
};
doSomething.bind().name // "bound doSomething"

// 对象的方法是一个 Symbol 值，那么name属性返回的是这个 Symbol 值的描述。
const key1 = Symbol('description');
const key2 = Symbol();
let obj = {
  [key1]() {},
  [key2]() {},
};
obj[key1].name // "[description]"
obj[key2].name // ""

```


### 4、属性的可枚举性和遍历

#### 4.1 可枚举性

对象的每个属性都有一个描述对象（`Descriptor`），用来控制该属性的行为。`Object.getOwnPropertyDescriptor`方法可以获取该属性的描述对象。

```
let obj = { foo: 123 };
Object.getOwnPropertyDescriptor(obj, 'foo')
//  {
//    value: 123,
//    writable: true,
//    enumerable: true, // ”可枚举性“，如果该属性为false，就表示某些操作会忽略当前属性
//    configurable: true
//  }

有四个操作会忽略enumerable为false的属性。
for...in循环：ES5就有，只遍历对象自身的和继承的可枚举的属性。
Object.keys()：ES5就有，返回对象自身的所有可枚举的属性的键名。
JSON.stringify()：ES5就有，只串行化对象自身的可枚举的属性。
Object.assign()：ES6新增，忽略enumerable为false的属性，只拷贝对象自身的可枚举的属性。

只有for...in会返回继承的属性，其他三个方法都会忽略继承的属性，只处理对象自身的属性。

// 下面代码，toString和length属性的enumerable都是false，因此for...in不会遍历到这两个继承自原型的属性。
Object.getOwnPropertyDescriptor(Object.prototype, 'toString').enumerable
// false
Object.getOwnPropertyDescriptor([], 'length').enumerable
// false

```

总的来说，操作中引入继承的属性会让问题复杂化，大多数时候，我们只关心对象自身的属性。所以，尽量不要用`for...in`循环，而用`Object.keys()`代替。


#### 4.2 属性的遍历

ES6 一共有 5 种方法可以遍历对象的属性。

```
（1）for...in
 
 for...in循环遍历对象自身的和继承的可枚举属性（不含 Symbol 属性）。

（2）Object.keys(obj)

 Object.keys返回一个数组，包括对象自身的（不含继承的）所有可枚举属性（不含 Symbol 属性）的键名。

（3）Object.getOwnPropertyNames(obj)

 Object.getOwnPropertyNames返回一个数组，包含对象自身的所有属性（不含 Symbol 属性，但是包括不可枚举属性）的键名。

（4）Object.getOwnPropertySymbols(obj)

 Object.getOwnPropertySymbols返回一个数组，包含对象自身的所有 Symbol 属性的键名。

（5）Reflect.ownKeys(obj)

 Reflect.ownKeys返回一个数组，包含对象自身的所有键名，不管键名是 Symbol 或字符串，也不管是否可枚举。

```

以上的 5 种方法遍历对象的键名，都遵守同样的属性遍历的次序规则。

```
// 1.首先遍历所有数值键，按照数值升序排列。
// 2.其次遍历所有字符串键，按照加入时间升序排列。
// 3.最后遍历所有 Symbol 键，按照加入时间升序排列。

Reflect.ownKeys({ [Symbol()]:0, b:0, 10:0, 2:0, a:0 })
// ['2', '10', 'b', 'a', Symbol()]
```


### 5、super 关键字

**注意，`super`关键字表示原型对象时，只能用在对象的方法之中，用在其他地方都会报错。**

```
// 报错，此处super用在属性里面
const obj = {
  foo: super.foo
}

// 报错，此处super用在一个函数里面，然后赋值给foo属性
const obj = {
  foo: () => super.foo
}

// 报错，此处super用在一个函数里面，然后赋值给foo属性
const obj = {
  foo: function () {
    return super.foo
  }
}
```

`JavaScript`引擎内部，`super.foo`等同于`Object.getPrototypeOf(this).foo`（属性）或`Object.getPrototypeOf(this).foo.call(this)`（方法）。

```
const proto = {
  x: 'hello',
  foo() {
    console.log(this.x);
  },
};
const obj = {
  x: 'world',
  foo() {
    super.foo();
  }
}
Object.setPrototypeOf(obj, proto);
obj.foo() // "world"
```

`super.foo`指向原型对象`proto`的`foo`方法，但是绑定的`this`却还是当前对象`obj`，因此输出的就是`world`。


### 6、对象的扩展运算符

```
let z = { a: 3, b: 4 };
let n = { ...z };
n // { a: 3, b: 4 }

// 由于数组是特殊的对象，所以对象的扩展运算符也可以用于数组。
let foo = { ...['a', 'b', 'c'] };
foo
// {0: "a", 1: "b", 2: "c"}

// 如果扩展运算符后面是一个空对象，则没有任何效果。
{...{}, a: 1}
// { a: 1 }

// 如果扩展运算符后面不是对象，则会自动将其转为对象。
// 等同于 {...Object(1)}
{...1} // {}

// 如果扩展运算符后面是字符串，它会自动转成一个类似数组的对象
{...'hello'}
// {0: "h", 1: "e", 2: "l", 3: "l", 4: "o"}

// 对象的扩展运算符等同于使用Object.assign()方法。
let aClone = { ...a };
// 等同于
let aClone = Object.assign({}, a);
```

上面的例子只是拷贝了对象实例的属性，如果想完整克隆一个对象，还拷贝对象原型的属性，可以采用下面的写法。


```
// 写法一
const clone1 = {
  __proto__: Object.getPrototypeOf(obj),
  ...obj
};

// 写法二
const clone2 = Object.assign(
  Object.create(Object.getPrototypeOf(obj)),
  obj
);

// 写法三
const clone3 = Object.create(
  Object.getPrototypeOf(obj),
  Object.getOwnP
}
```

扩展运算符可以用于合并两个对象。

```
let ab = { ...a, ...b };
// 等同于
let ab = Object.assign({}, a, b);
```
