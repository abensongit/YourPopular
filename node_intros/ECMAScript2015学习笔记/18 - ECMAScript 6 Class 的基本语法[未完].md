# ECMAScript 6 Class 的基本语法

----


- [1] - 简介
- [2] - 静态方法
- [3] - 实例属性的新写法
- [4] - 静态属性
- [5] - 私有方法和私有属性
- [6] - new.target 属性


### 1、简介

`JavaScript` 语言中，生成实例对象的传统方法是通过`构造函数`。`ES6`提供了更接近传统语言的写法，引入了 `Class`（类）这个概念，作为对象的模板。通过`class`关键字，可以定义类。基本上，`ES6`的`class`可以看作只是一个**语法糖**，它的绝大部分功能，`ES5`都可以做到，新的`class`写法只是让对象原型的写法更加清晰、更像面向对象编程的语法而已。下面用ES5和ES6实现相同的功能。

```
// ES5 语法实现
function Point(x, y) {
  this.x = x;
  this.y = y;
}

Point.prototype.toString = function () {
  return '(' + this.x + ', ' + this.y + ')';
};
```

```
// ES6 语法实现
class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  toString() {
    return '(' + this.x + ', ' + this.y + ')';
  }
}
```

`Point`类除了`构造方法`，还定义了一个`toString`方法。**注意，定义“类”的方法的时候，前面不需要加上function这个关键字，直接把函数定义放进去了就可以了。另外，方法之间不需要逗号分隔，加了会报错**。

```
// 下面代码表明，类的数据类型就是函数，类本身就指向构造函数。
typeof Point // "function"
Point === Point.prototype.constructor // true
```

事实上，类的所有方法都定义在类的`prototype`属性上面。

```
class Point {
  constructor() {
    // ...
  }
  
  toString() {
    // ...
  }

  toValue() {
    // ...
  }
}

// 等同于

Point.prototype = {
  constructor() {},
  toString() {},
  toValue() {},
};
```

由于类的方法都定义在`prototype`对象上面，所以类的新方法可以添加在`prototype`对象上面。`Object.assign`方法可以很方便地一次向类添加多个方法。

```
// Object.assign 可以一次向类添加多个方法。
class Point {
  constructor(){
    // ...
  }
}

Object.assign(Point.prototype, {
  toString(){},
  toValue(){}
});
```

#### 1.1 constructor 方法

`constructor`方法是类的默认方法，通过`new`命令生成对象实例时，自动调用该方法。一个类必须有`constructor`方法，如果没有显式定义，一个空的`constructor`方法会被默认添加。**类必须使用`new`调用，否则会报错。这是它跟普通构造函数的一个主要区别，后者不用`new`也可以执行。**

```
// constructor函数返回一个全新的对象，结果导致实例对象不是Foo类的实例。
class Foo {
  constructor() {
    return Object.create(null);
  }
}

new Foo() instanceof Foo
// false
```

#### 1.2 类的实例

与 `ES5` 一样，实例的属性除非显式定义在其本身（即定义在`this`对象上），否则都是定义在原型上（即定义在`class上`）。

```
// 定义类
class Point {

  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  toString() {
    return '(' + this.x + ', ' + this.y + ')';
  }
}

var point = new Point(2, 3);
point.toString() // (2, 3)
point.hasOwnProperty('x') // true
point.hasOwnProperty('y') // true
point.hasOwnProperty('toString') // false
point.__proto__.hasOwnProperty('toString') // true
```

```
// 与 ES5 一样，类的所有实例共享一个原型对象。
var p1 = new Point(2,3);
var p2 = new Point(3,2);
p1.__proto__ === p2.__proto__
//true
```

上面代码中，`p1`和`p2`都是`Point`的实例，它们的原型都是`Point.prototype`，所以`__proto__`属性是相等的。

这也意味着，可以通过实例的`__proto__`属性为“类”添加方法。`__proto__`并不是语言本身的特性，这是各大厂商具体实现时添加的私有属性，虽然目前很多现代浏览器的 JS 引擎中都提供了这个私有属性，但依旧不建议在生产中使用该属性，避免对环境产生依赖。生产环境中，我们可以使用 `Object.getPrototypeOf`方法来获取实例对象的原型，然后再来为原型添加方法/属性。

```
var p1 = new Point(2,3);
var p2 = new Point(3,2);

p1.__proto__.printName = function () { return 'Oops' };

p1.printName() // "Oops"
p2.printName() // "Oops"

var p3 = new Point(4,2);
p3.printName() // "Oops"
```

#### 1.3 属性表达式

```
// 下面代码中，Square类的方法名getArea，是从表达式得到的。
let methodName = 'getArea';
class Square {
  constructor(length) {
    // ...
  }

  [methodName]() {
    // ...
  }
}
```

#### 1.4 Class 表达式

```
const MyClass = class Me {
  getClassName() {
    return Me.name;
  }
};

let inst = new MyClass();
inst.getClassName() // Me
Me.name // ReferenceError: Me is not defined

// 如果类的内部没用到的话，可以省略Me，也就是可以写成下面的形式。
const MyClass = class { /* ... */ };

```

采用 Class 表达式，可以写出立即执行的 Class。

```
let person = new class {
  constructor(name) {
    this.name = name;
  }

  sayName() {
    console.log(this.name);
  }
}('张三');

person.sayName(); // "张三"
```

### 2、静态方法

类相当于实例的原型，所有在类中定义的方法，都会被实例继承。如果在一个方法前，加上`static`关键字，就表示该方法不会被实例继承，而是直接通过类来调用，这就称为**“静态方法”**。

```
class Foo {
  static classMethod() {
    return 'hello';
  }
}

Foo.classMethod() // 'hello'
var foo = new Foo();
foo.classMethod()
// TypeError: foo.classMethod is not a function
```

上面代码中，`Foo`类的`classMethod`方法前有`static`关键字，表明该方法是一个静态方法，可以直接在`Foo`类上调用（`Foo.classMethod()`），而不是在`Foo`类的实例上调用。如果在实例上调用静态方法，会抛出一个错误，表示不存在该方法。

**注意，如果静态方法包含this关键字，这个this指的是类，而不是实例。**


### 3、实例属性的新写法

实例属性除了定义在`constructor()`方法里面的`this`上面，也可以定义在类的最顶层。

```
class IncreasingCounter {
  constructor() {
    this._count = 0;
  }
  get value() {
    console.log('Getting the current value!');
    return this._count;
  }
  increment() {
    this._count++;
  }
}

// 等价于

class IncreasingCounter {
  _count = 0;
  get value() {
    console.log('Getting the current value!');
    return this._count;
  }
  increment() {
    this._count++;
  }
}

// 下面的代码，一眼就能看出有两个实例属性，一目了然。另外，写起来也比较简洁。
class foo {
  bar = 'hello';
  baz = 'world';

  constructor() {
    // ...
  }
}
```


### 4、静态属性

静态属性指的是`Class`本身的属性，即`Class.propName`，而不是定义在实例对象（`this`）上的属性。

```
// 下面的写法为Foo类定义了一个静态属性prop。
// 目前，只有这种写法可行，因为 ES6 明确规定，Class 内部只有静态方法，没有静态属性。
class Foo { }
Foo.prop = 1;
Foo.prop // 1


// 现在有一个提案提供了类的静态属性，写法是在实例属性法的前面，加上static关键字。
// 老写法
class Foo {
  // ...
}
Foo.prop = 1;

// 新写法（提案）
class Foo {
  static prop = 1;
}
```


### 5、私有方法和私有属性



### 6、new.target 属性

`new`是从构造函数生成实例对象的命令。`ES6` 为`new`命令引入了一个`new.target`属性，该属性一般用在构造函数之中，返回`new`命令作用于的那个构造函数。如果构造函数不是通过`new`命令或`Reflect.construct()`调用的，`new.target`会返回`undefined`，因此这个属性可以用来确定构造函数是怎么调用的。

```
// 下面代码确保构造函数只能通过new命令调用。
function Person(name) {
  if (new.target !== undefined) {
    this.name = name;
  } else {
    throw new Error('必须使用 new 命令生成实例');
  }
}

// 另一种写法
function Person(name) {
  if (new.target === Person) {
    this.name = name;
  } else {
    throw new Error('必须使用 new 命令生成实例');
  }
}

var person = new Person('张三'); // 正确
var notAPerson = Person.call(person, '张三');  // 报错
```

需要注意的是，子类继承父类时，`new.target`会返回子类。

```
// 下面代码中，Shape类不能被实例化，只能用于继承。
class Shape {
  constructor() {
    if (new.target === Shape) {
      throw new Error('本类不能实例化');
    }
  }
}

class Rectangle extends Shape {
  constructor(length, width) {
    super();
    // ...
  }
}

var x = new Shape();  // 报错
var y = new Rectangle(3, 4);  // 正确
```

**注意，在函数外部，使用`new.target`会报错。**