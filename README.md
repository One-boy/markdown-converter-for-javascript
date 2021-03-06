# markdown-converter-for-javascript
## 一、介绍
- 一个markdown文本的javascript解析器，功能是把md格式文本解析为html
- 主要用于我自己编写笔记或博客时的转换
- 目录介绍
    - src/md.js -- 解析库js源文件
    - dest/md.min.js -- 压缩后的js库
    - src/_markdown.scss -- 匹配的markdown样式库scss源文件
    - dest/md.css -- 编译后的样式库
    - demo/* -- 一个demo，点开可以看到效果

- 演示地址：
[点我看效果](https://one-boy.github.io/markdown/index.html)

## 二、用法(usage)：
#### 1.引入dest/md.min.js文件
#### 2.使用，如下
```
if(typeof window.JSWidgets.markdown == "object"){
    var md = new JSWidgets.markdown.convert();
    var mdText = "# 标题1\n ##标题2";
    var result = md.buildToHTML(mdText);
    console.log(result);
}
```
#### 3.转换后的HTML文档没有样式，比较难看，`dest/md.css`是一份简洁的样式库，可使界面更美观
#### 4.每个标签（如h1、em），默认都一个css类
- css类，也是可以自定义的，使用setHTMLClass()方法，如下：
> md.setHTMLClass({h1:"my-class-h1",h2:"my-class-h2"}); //这里只改变了h1和h2的css类，其它还是默认。
- 可以传入的全部css类如下，引号中为默认值：
```
{
            h1:"md-h1",
            h2:"md-h2",
            h3:"md-h3",
            h4:"md-h4",
            h5:"md-h5",
            h6:"md-h6",
            hr:"md-hr",
            mark:"md-mark",
            underline: "md-underline",
            //引用
            blockquote: "md-blockquote",
            //斜体
            em: "md-em",
            hr: "md-hr",
            image: "md-image",
            link: "md-link",
            code: "md-code",
            strong: "md-strong",
            bold: "md-bold",
            table: "md-table",
            ul: "md-ul",
            line:"md-line",
            //大段代码中的每一行。
            highLight:"md-high-light",

            //大段代码
            pre: "md-pre",
            //待办事项
            backlog: "md-backlog",
            //已办
            completed: "md-completed"
}

```
---
## 三、目前所实现的功能：
#### 1.md格式文本转换成html结构。
- 1.标题1-6，
```
#-######
```
- 2.加粗，
```
**加粗内容**
```
- 3.斜体，
```
*斜体内容*
```
- 4.标记，
```
==标记内容==
```
- 5.下划线，
```
++下划线内容++
```
- 6.小段代码块，
```
`小段代码块。`
```
- 7.大段代码块，
```
```一大段代码```，无语法高亮。。不过可以自己加。
```
- 8.表格，语法如下：
```
标题1 | 标题2
---|---
行1列1 | 行1列2
行2列1 | 行2列2
```
- 9.列表，列表现在全转成无需列表，下面语法多种开头都行：
```
 - 行1 
 * 行2 
 + 行3
   1. 子列表 
```
- 10.分割线，
```
---
```
- 11.链接，
```
[链接名字](http://note.youdao.com/)
```
- 12.图片，
```
![图片title](http://note.youdao.com/favicon.ico)
```
- 13.引用，
```
> 我是引用的一段文字。
```
- 14.待办，
```
- [ ] 我是待办事项
```
- 15.已办，
```
- [x] 我是已办事项
```
> md语法还有：数学公式、图表和流程图，这个我几乎没用过，然后写起来需要大量时间，以后需要再看看。
