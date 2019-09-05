# ECMAScript 6 对象的新增方法

----


- [1] - Object.is()
- [2] - Object.assign()
- [3] - Object.getOwnPropertyDescriptors()
- [4] - _proto__属性，Object.setPrototypeOf()，Object.getPrototypeOf()
- [5] - Object.keys()，Object.values()，Object.entries()
- [6] - Object.fromEntries()


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


### 2、Object.assign()

`Object.assign`方法用于对象的合并，将源对象（`source`）的所有可枚举属性，复制到目标对象（`target`）。

```
// 如果目标对象与源对象有同名属性，或多个源对象有同名属性，则后面的属性会覆盖前面的属性。
const target = { a: 1, b: 1 };
const source1 = { b: 2, c: 2 };
const source2 = { c: 3 };
Object.assign(target, source1, source2);
target // {a:1, b:2, c:3}

// 如果只有一个参数，Object.assign会直接返回该参数。
// 如果该参数不是对象，则会先转成对象，然后返回。
const obj = {a: 1};
Object.assign(obj) === obj // true
typeof Object.assign(2) // "object"

// 参数无法转成对象就会跳过，说明如果undefined和null不在首参数，就不会报错。
Object.assign(undefined) // 报错
Object.assign(null) // 报错
let obj = {a: 1};
Object.assign(obj, undefined) === obj // true
Object.assign(obj, null) === obj // true
```

`Object.assign`拷贝的属性是有限制的，只拷贝源对象的自身属性（不拷贝继承属性），也不拷贝不可枚举的属性（`enumerable: false`）。

```
// 下面字符串、布尔值和数值，只有字符串合入目标对象（以字符数组的形式），数值和布尔值都会被忽略。
// 这是因为只有字符串的包装对象，会产生可枚举属性。
const v1 = 'abc';
const v2 = true;
const v3 = 10;
const obj = Object.assign({}, v1, v2, v3);
console.log(obj); // { "0": "a", "1": "b", "2": "c" }

// 拷贝的对象只有一个不可枚举属性invisible，这个属性并没有被拷贝进去。
Object.assign({b: 'c'},
  Object.defineProperty({}, 'invisible', {
    enumerable: false,
    value: 'hello'
  })
)
// { b: 'c' }
```

**注意**

- 浅拷贝。Object.assign方法实行的是浅拷贝，而不是深拷贝。

- 同名属性的替换。一旦遇到同名属性，Object.assign的处理方法是替换，而不是添加。

- 数组的处理。Object.assign可以用来处理数组，但是会把数组视为对象。

```
Object.assign([1, 2, 3], [4, 5])
// [4, 5, 3]
```

- 取值函数的处理。

**常见用途**

```
1、为对象添加属性
class Point {
  constructor(x, y) {
    Object.assign(this, {x, y});
  }
}

2、为对象添加方法
Object.assign(SomeClass.prototype, {
  someMethod(arg1, arg2) {
    ···
  },
  anotherMethod() {
    ···
  }
});
// 等同于下面的写法
SomeClass.prototype.someMethod = function (arg1, arg2) {
  ···
};
SomeClass.prototype.anotherMethod = function () {
  ···
};

3、克隆对象
function clone(origin) {
  return Object.assign({}, origin);
}
// 这种方法克隆，只能克隆原始对象自身的值，不能克隆它继承的值。
// 如果想要保持继承链，可以采用下面的代码。
function clone(origin) {
  let originProto = Object.getPrototypeOf(origin);
  return Object.assign(Object.create(originProto), origin);
}

4、合并多个对象
// 将多个对象合并到某个对象。
const merge = (target, ...sources) => Object.assign(target, ...sources);
// 如果希望合并后返回一个新对象，可以改写上面函数，对一个空对象合并。
const merge = (...sources) => Object.assign({}, ...sources);

5、为属性指定默认值
const DEFAULTS = {
  logLevel: 0,
  outputFormat: 'html'
};

function processContent(options) {
  options = Object.assign({}, DEFAULTS, options);
  console.log(options);
  // ...
}

// DEFAULTS对象是默认值，options对象是用户提供的参数。
// Object.assign方法将DEFAULTS和options合并成一个新对象，如果两者有同名属性，
// 则option的属性值会覆盖DEFAULTS的属性值。
```


### 3、Object.getOwnPropertyDescriptors()

```
// 1.解决Object.assign()无法正确拷贝get属性和set属性的问题。
function getOwnPropertyDescriptors(obj) {
	const result = {};
	for (let key of Reflect.ownKeys(obj)) {
		result[key] = Object.getOwnPropertyDescriptor(obj, key);
	}
	return result;
}
const shallowMerge = (target, source) => Object.defineProperties(
	target,
	Object.getOwnPropertyDescriptors(source)
);   
const source = {
	set foo(value) {
		console.log(value);
	}
};
const target = {};
// Object.assign(target, source);  // 无法正确拷贝get属性和set属性
shallowMerge(target,source);  // 解决无法正确拷贝get属性和set属性
let obj = Object.getOwnPropertyDescriptor(target, 'foo')
console.log(obj);


// 2.是配合Object.create()方法，将对象属性克隆到一个新对象。这属于浅拷贝。
const clone = Object.create(Object.getPrototypeOf(obj),
  Object.getOwnPropertyDescriptors(obj));
// 或者
const shallowClone = (obj) => Object.create(
  Object.getPrototypeOf(obj),
  Object.getOwnPropertyDescriptors(obj)
);
```


`Object.getOwnPropertyDescriptors()`方法的另一个用处，是配合`Object.create()`方法，将对象属性克隆到一个新对象。这属于浅拷贝。

```
// 方法一：继承另一个对象，常常写成下面这样
const obj = {
  __proto__: prot,  // __proto__只有浏览器要部署，其他环境不用部署。
  foo: 123,
};

// 方法二：如果去除__proto__，上面代码就要改成下面这样。
const obj = Object.create(prot);
obj.foo = 123;

// 方法三：
const obj = Object.assign(
  Object.create(prot),
  {
    foo: 123,
  }
);

// 方法四：
const obj = Object.create(
  prot,
  Object.getOwnPropertyDescriptors({
    foo: 123,
  })
);
```


### 4、__proto__属性，Object.setPrototypeOf()，Object.getPrototypeOf()


#### 4.1 __proto__属性

`__proto__`属性（前后各两个下划线），用来读取或设置当前对象的`prototype`对象。该属性没有写入 ES6 的正文，而是写入了附录，原因是`__proto__`前后的双下划线，说明它本质上是一个内部属性，而不是一个正式的对外的 API，只是由于浏览器广泛支持，才被加入了 ES6。标准明确规定，只有浏览器必须部署这个属性，其他运行环境不一定需要部署。因此，无论从语义的角度，还是从兼容性的角度，都不要使用这个属性，而是使用下面的`Object.setPrototypeOf()`（写操作）、`Object.getPrototypeOf()`（读操作）、`Object.create()`（生成操作）代替。

如果一个对象本身部署了`__proto__`属性，该属性的值就是对象的原型。

```
Object.getPrototypeOf({ __proto__: null })
// null
```


#### 4.2 Object.setPrototypeOf()

```
// 格式
Object.setPrototypeOf(object, prototype);
// 用法
const o = Object.setPrototypeOf({}, null);

// 下面代码将proto对象设为obj对象的原型，所以从obj对象可以读取proto对象的属性。
let proto = {};
let obj = { x: 10 };
Object.setPrototypeOf(obj, proto);
proto.y = 20;
proto.z = 40;
obj.x // 10
obj.y // 20
obj.z // 40

// undefined和null无法转为对象，如果第一个参数是undefined或null，就会报错。
Object.setPrototypeOf(undefined, {})
// TypeError: Object.setPrototypeOf called on null or undefined
Object.setPrototypeOf(null, {})
// TypeError: Object.setPrototypeOf called on null or undefined
```


#### 4.3 Object.getPrototypeOf()

该方法与`Object.setPrototypeOf()`方法配套，用于读取一个对象的原型对象。

```
function Rectangle() {
  // ...
}
const rec = new Rectangle();
Object.getPrototypeOf(rec) === Rectangle.prototype
// true
Object.setPrototypeOf(rec, Object.prototype);
Object.getPrototypeOf(rec) === Rectangle.prototype
// false


// 等同于 Object.getPrototypeOf(Number(1))
Object.getPrototypeOf(1)
// Number {[[PrimitiveValue]]: 0}
// 等同于 Object.getPrototypeOf(String('foo'))
Object.getPrototypeOf('foo')
// String {length: 0, [[PrimitiveValue]]: ""}
// 等同于 Object.getPrototypeOf(Boolean(true))
Object.getPrototypeOf(true)
// Boolean {[[PrimitiveValue]]: false}
Object.getPrototypeOf(1) === Number.prototype // true
Object.getPrototypeOf('foo') === String.prototype // true
Object.getPrototypeOf(true) === Boolean.prototype // true


Object.getPrototypeOf(null)
// TypeError: Cannot convert undefined or null to object
Object.getPrototypeOf(undefined)
// TypeError: Cannot convert undefined or null to object
```


### 5、Object.keys()，Object.values()，Object.entries()

`ES5`引入了`Object.keys`方法，返回一个数组，成员是参数对象自身的（不含继承的）所有可遍历（`enumerable`）属性的键名。

`ES2017`引入了跟`Object.keys`配套的`Object.values`和`Object.entries`，作为遍历一个对象的补充手段，供`for...of`循环使用。

```
let {keys, values, entries} = Object;
let obj = { a: 1, b: 2, c: 3 };

for (let key of keys(obj)) {
  console.log(key); // 'a', 'b', 'c'
}

for (let value of values(obj)) {
  console.log(value); // 1, 2, 3
}

for (let [key, value] of entries(obj)) {
  console.log([key, value]); // ['a', 1], ['b', 2], ['c', 3]
}
```


### 6、Object.fromEntries()

`Object.fromEntries()`方法是`Object.entries()`的逆操作，用于将一个键值对数组转为对象。

```
Object.fromEntries([
  ['foo', 'bar'],
  ['baz', 42]
])
// { foo: "bar", baz: 42 }
```

该方法的主要目的，是将键值对的数据结构还原为对象，因此特别适合将 Map 结构转为对象。

```
// 例一
const entries = new Map([
  ['foo', 'bar'],
  ['baz', 42]
]);

Object.fromEntries(entries)
// { foo: "bar", baz: 42 }

// 例二
const map = new Map().set('foo', true).set('bar', false);
Object.fromEntries(map)
// { foo: true, bar: false }

// 配合URLSearchParams对象，将查询字符串转为对象。
Object.fromEntries(new URLSearchParams('foo=bar&baz=qux'))
// { foo: "bar", baz: "qux" }
```
