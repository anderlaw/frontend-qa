---
title: "如何使用Css变量"
date: 2024-01-10T09:21:51+08:00
draft: false
image: banner.jpeg
summary: 借助css变量，可以让我们更佳轻松地配置、修改页面的样式。早期组织css需借助预编译语言如less、sass等，而如今css变量则赋予了css原生的能力，本文介绍如何使用css变量.
---



## 定义css变量

使用变量之前，开发者需要先定义一个自定义属性：
- 选择器。声明变量规则的应用范围，可以是使用该变量的元素本身，也可以是使用变量的上层元素（父元素、祖父元素、...）。
- 属性名。以两个减号`--`开始
- 属性值。任何有效的 CSS 值

```css
element {
  --main-bg-color: brown;
}
#content {
    --secondary-bg-color:white;
}
```

## 使用css变量
在css属性值里通过`var(--main-bg-color)`来使用变量。
如：
```css
.article{
    background-color:var(--main-bg-color);
}
```
*注意：`.article`元素要在定义的变量范围以内。*

## 继承性

上文已经暗示过，自定义元素具有继承性了。因此，通常情况下，我们把css变量定义在`:root`节点下，这样整个文档都可以使用css变量了，当然也要考虑到项目的具体情况咯。

```css
:root{
    --text-main-color:white;
    --text-secondary-color:grey;
}

p{
    color:var(--text-main-color);
}
.subtitle{
    color:var(--text-secondary-color);
}
```
## css变量的备用值

所谓的备用值，就是设置了**回退方案**。

虽然开发者很小心，仍然存在各种变数导致变量值没有被顺利应用，这样样式的设置是无效的，结果就是元素会使用默认的（或继承的）样式，会产生预料之外的结果。

于是，设置合适的**备用值**就很重要：

```css
.article {
  color: var(--my-var, red); /* Red if --my-var is not defined */
}
```
当`--my-var`不生效时会使用`red`这个值。

## js操作css变量

跟操作css属性基本一样，只是要借助`getPropertyValue`与`setProperty`。

不过，一般情况下需要修改多条变量，会比较繁琐，一般不会采用这种方式。而是将变量与类名绑定，通过切换类名来修改css变量，比如`切换主题`就是这样做的。

```javascript
// 获取一个 Dom 节点上的 CSS 变量
element.style.getPropertyValue("--my-var");

// 获取任意 Dom 节点上的 CSS 变量
getComputedStyle(element).getPropertyValue("--my-var");

// 修改一个 Dom 节点上的 CSS 变量
element.style.setProperty("--my-var", jsVar + 4);
```