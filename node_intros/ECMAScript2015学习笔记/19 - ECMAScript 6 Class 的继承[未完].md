# ECMAScript 6 Class 的继承

----


- [1] - 简介
- [2] - Object.getPrototypeOf()
- [3] - super 关键字
- [4] - 类的 prototype 属性和 \_\_proto\_\_ 性性
- [5] - 原生构造函数的继承
- [6] - Mixin 模式的实现


### 1、简介

`Class`可以通过`extends`关键字实现继承，这比`ES5`的通过修改原型链实现继承，要清晰和方便很多。子类必须在`constructor`方法中调用`super`方法，否则新建实例时会报错。这是因为子类自己的`this`对象，必须先通过父类的构造函数完成塑造，得到与父类同样的实例属性和方法。

`ES5`的继承，实质是先创造子类的实例对象`this`，然后再将父类的方法添加到`this`上面（Parent.apply(this)）。`ES6`的继承机制完全不同，实质是先将父类实例对象的属性和方法，加到`this`上面（所以必须先调用`super`方法），然后再用子类的构造函数修改`this`。

```
// 下面ColorPoint继承了父类Point，但是它的构造函数没有调用super方法，导致新建实例时报错。
class Point { /* ... */ }

class ColorPoint extends Point {
  constructor() {
  }
}

let cp = new ColorPoint(); // ReferenceError
```

如果子类没有定义`constructor`方法，这个方法会被默认添加，代码如下。也就是说，不管有没有显式定义，任何一个子类都有`constructor`方法。

```
class ColorPoint extends Point {
	// ...
}

// 等同于
class ColorPoint extends Point {
  constructor(...args) {
    super(...args);
  }
}
```

另一个需要注意的地方是，在子类的构造函数中，只有调用`super`之后，才可以使用`this`关键字，否则会报错。这是因为子类实例的构建，基于父类实例，只有`super`方法才能调用父类实例。

```
class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

class ColorPoint extends Point {
  constructor(x, y, color) {
    this.color = color; // ReferenceError
    super(x, y);
    this.color = color; // 正确
  }
}
```

最后，**父类的静态方法，也会被子类继承。**


### 2、Object.getPrototypeOf()

`Object.getPrototypeOf`方法可以用来从子类上获取父类。

```
Object.getPrototypeOf(ColorPoint) === Point
// true
```

因此，可以使用这个方法判断，一个类是否继承了另一个类。


### 3、super 关键字

`super`这个关键字，既可以当作函数使用，也可以当作对象使用。

















