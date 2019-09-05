### FlexBox 布局


```
// React Native 所支持的 Flex 属性

属性1 => flexDirection enum(‘row’, ‘column’,’row-reverse’,’column-reverse’)
属性2 => flexWrap enum(‘wrap’, ‘nowrap’)
属性3 => justifyContent enum(‘flex-start’, ‘flex-end’, ‘center’, ‘space-between’, ‘space-around’)
属性4 => alignItems enum(‘flex-start’, ‘flex-end’, ‘center’, ‘stretch’)
属性5 => alignSelf enum('auto', 'flex-start', 'flex-end', 'center', 'stretch')
属性6 => position enum(‘absolute’, ‘relative’)属性设置元素的定位方式，为将要定位的元素定义定位规则。

// 1.属性 flexDirection
flexDirection enum('row', 'column','row-reverse','column-reverse')
row: 从左向右依次排列
row-reverse: 从右向左依次排列
column(default): 默认的排列方式，从上向下排列
column-reverse: 从下向上排列

// 2.属性 flexWrap
flexWrap enum('wrap', 'nowrap')
nowrap flex的元素只排列在一行上，可能导致溢出。
wrap flex的元素在一行排列不下时，就进行多行排列。

// 3.属性 justifyContent
justifyContent enum('flex-start', 'flex-end', 'center', 'space-between', 'space-around')
flex-start(default) 从行首开始排列。每行第一个弹性元素与行首对齐，同时所有后续的弹性元素与前一个对齐。
flex-end 从行尾开始排列。每行最后一个弹性元素与行尾对齐，其他元素将与后一个对齐。
center 伸缩元素向每行中点排列。每行第一个元素到行首的距离将与每行最后一个元素到行尾的距离相同。
space-between 在每行上均匀分配弹性元素。相邻元素间距离相同。每行第一个元素与行首对齐，每行最后一个元素与行尾对齐。
space-around 在每行上均匀分配弹性元素。相邻元素间距离相同。每行第一个元素到行首的距离和每行最后一个元素到行尾的距离将会是相邻元素之间距离的一半。

// 4.属性 alignItems
alignItems enum('flex-start', 'flex-end', 'center', 'stretch')
flex-start 元素向侧轴起点对齐。
flex-end 元素向侧轴终点对齐。
center 元素在侧轴居中。如果元素在侧轴上的高度高于其容器，那么在两个方向上溢出距离相同。
stretch 弹性元素被在侧轴方向被拉伸到与容器相同的高度或宽度。

// 5.属性 alignSelf
alignSelf enum('auto', 'flex-start', 'flex-end', 'center', 'stretch')
auto(default) 元素继承了它的父容器的 align-items 属性。如果没有父容器则为 “stretch”。
stretch	元素被拉伸以适应容器。
center	元素位于容器的中心。
flex-start	元素位于容器的开头。
flex-end	元素位于容器的结尾。

// 6.属性 position
position enum(‘absolute’, ‘relative’)属性设置元素的定位方式，为将要定位的元素定义定位规则。
absolute：生成绝对定位的元素，元素的位置通过 “left”, “top”, “right” 以及 “bottom” 属性进行规定。
relative：生成相对定位的元素，相对于其正常位置进行定位。因此，”left:20” 会向元素的 LEFT 位置添加 20 像素。
```
