# ECMAScript 6 Proxy 代理器

----

- [1] - 概述
- [2] - Proxy 实例的方法
- [3] - Proxy.revocable
- [4] - this 问题
- [5] - 实例：Web 服务的客户端


### 1、概述

ES6 原生提供 `Proxy` 构造函数，用来生成 `Proxy` 实例。

```
var proxy = new Proxy(target, handler);

```

`Proxy` 对象的所有用法，都是上面这种形式，不同的只是`handler`参数的写法。其中，`new Proxy()`表示生成一个`Proxy`实例，`target`参数表示所要拦截的目标对象，`handler`参数也是一个对象，用来定制拦截行为。


**下面是 Proxy 支持的拦截操作一览，一共 13 种。**

```
[01] get(target, propKey, receiver)：拦截对象属性的读取。

[02] set(target, propKey, value, receiver)：拦截对象属性的设置，返回一个布尔值。

[03] has(target, propKey)：拦截propKey in proxy的操作，返回一个布尔值。

[04] deleteProperty(target, propKey)：拦截delete proxy[propKey]的操作，返回一个布尔值。

[05] ownKeys(target)：拦截 Object.getOwnPropertyNames(proxy)、Object.getOwnPropertySymbols(proxy)、Object.keys(proxy)、for...in循环，返回一个数组。该方法返回目标对象所有自身的属性的属性名，而Object.keys()的返回结果仅包括目标对象自身的可遍历属性。

[06] getOwnPropertyDescriptor(target, propKey)：拦截Object.getOwnPropertyDescriptor(proxy, propKey)，返回属性的描述对象。

[07] defineProperty(target, propKey, propDesc)：拦截Object.defineProperty(proxy, propKey, propDesc）、Object.defineProperties(proxy, propDescs)，返回一个布尔值。

[08] preventExtensions(target)：拦截Object.preventExtensions(proxy)，返回一个布尔值。

[09] getPrototypeOf(target)：拦截Object.getPrototypeOf(proxy)，返回一个对象。

[10] isExtensible(target)：拦截Object.isExtensible(proxy)，返回一个布尔值。

[11] setPrototypeOf(target, proto)：拦截Object.setPrototypeOf(proxy, proto)，返回一个布尔值。如果目标对象是函数，那么还有两种额外操作可以拦截。

[12] apply(target, object, args)：拦截 Proxy 实例作为函数调用的操作，比如proxy(...args)、proxy.call(object, ...args)、proxy.apply(...)。

[13] construct(target, args)：拦截 Proxy 实例作为构造函数调用的操作，比如new proxy(...args)。
```

### 2、Proxy 实例的方法

下面是上面这些拦截方法的详细介绍。

#### 2.1