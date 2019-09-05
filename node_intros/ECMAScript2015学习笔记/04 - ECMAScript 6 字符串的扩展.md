# ECMAScript 6 字符串的扩展

----



### 1、codePointAt()

`JavaScript`内部，字符以 UTF-16 的格式储存，每个字符固定为2个字节。对于那些需要4个字节储存的字符（Unicode 码点大于0xFFFF的字符），`JavaScript`会认为它们是两个字符。


```
var s = "𠮷";
s.length // 2
s.charAt(0) // ''
s.charAt(1) // ''
s.charCodeAt(0) // 55362
s.charCodeAt(1) // 57271
```

ES6 提供了`codePointAt`方法，能够正确处理 4 个字节储存的字符，返回一个字符的码点。
`codePointAt`方法返回的是码点的十进制值，如果想要十六进制的值，可以使用`toString`方法转换一下。

```
let s = '𠮷a';
s.codePointAt(0).toString(16) // "20bb7"
s.codePointAt(2).toString(16) // "61"

// 字符a在字符串s的正确位置序号应该是 1，但是必须向codePointAt方法传入 2。
// 解决这个问题的一个办法是使用for...of循环，因为它会正确识别 32 位的 UTF-16 字符。
let s = '𠮷a';
for (let ch of s) {
  console.log(ch.codePointAt(0).toString(16));
}
// 20bb7
// 61
```


### 2、String.fromCodePoint()

ES5 提供`String.fromCharCode`方法，用于从码点返回对应字符，但是这个方法不能识别 32 位的 UTF-16 字符（Unicode 编号大于0xFFFF）。

ES6 提供了`String.fromCodePoint`方法，可以识别大于0xFFFF的字符，弥补了`String.fromCharCode`方法的不足。在作用上，正好与`codePointAt`方法相反。

```
String.fromCodePoint(0x20BB7)
// "𠮷"
String.fromCodePoint(0x78, 0x1f680, 0x79) === 'x\uD83D\uDE80y'
// true
// 如果String.fromCodePoint方法有多个参数，则它们会被合并成一个字符串返回。
```

**注意，`fromCodePoint`方法定义在`String`对象上，而`codePointAt`方法定义在字符串的实例对象上。**


### 3、字符串的遍历器接口

ES6 为字符串添加了遍历器接口，使得字符串可以被`for...of`循环遍历。除了遍历字符串，这个遍历器最大的优点是可以识别大于`0xFFFF`的码点，传统的`for循环`无法识别这样的码点。

```
for (let codePoint of 'foo') {
  console.log(codePoint)
}
// "f"
// "o"
// "o"
```


### 4、includes(), startsWith(), endsWith()

`JavaScript`只有`indexOf`方法，可以用来确定一个字符串是否包含在另一个字符串中。ES6 又提供了三种新方法。

```
includes()：返回布尔值，表示是否找到了参数字符串。
startsWith()：返回布尔值，表示参数字符串是否在原字符串的头部。
endsWith()：返回布尔值，表示参数字符串是否在原字符串的尾部。
```

```
let s = 'Hello world!';

s.startsWith('Hello') // true
s.endsWith('!') // true
s.includes('o') // true

s.startsWith('world', 6) // true
s.endsWith('Hello', 5) // true
s.includes('Hello', 6) // false
```


### 5、repeat()

`repeat`方法返回一个新字符串，表示将原字符串重复`n`次。参数如果是小数，会被取整。

```
'x'.repeat(3) // "xxx"
'hello'.repeat(2) // "hellohello"
'na'.repeat(0) // ""

'na'.repeat(2.9) // "nana"
```


### 6、padStart()，padEnd()

`ES2017` 引入了字符串补全长度的功能。如果某个字符串不够指定长度，会在头部或尾部补全。`padStart()`用于头部补全，`padEnd()`用于尾部补全。

```
'x'.padStart(5, 'ab') // 'ababx'
'x'.padStart(4, 'ab') // 'abax'
'x'.padEnd(5, 'ab') // 'xabab'
'x'.padEnd(4, 'ab') // 'xaba'

// 如果原字符串的长度，等于或大于最大长度，则字符串补全不生效，返回原字符串。
'xxx'.padStart(2, 'ab') // 'xxx'
'xxx'.padEnd(2, 'ab') // 'xxx'

// 如果用来补全的字符串与原字符串，两者的长度之和超过了最大长度，则会截去超出位数的补全字符串。
'abc'.padStart(10, '0123456789') // '0123456abc'

```


### 7、matchAll() 

`matchAll`方法返回一个正则表达式在当前字符串的所有匹配。





