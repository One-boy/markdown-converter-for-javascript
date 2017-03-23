# markdown-converter-for-javascript
瞎折腾，一个md解析器，功能是把md格式文本解析为html。
## 用法：
- 1.引入js文件
- 2.传入待转换的md格式文本，如下：
```
if(typeof window.JSWidgets.markdown == "object"){
    var md = new JSWidgets.markdown.convert();
    //样式可以引入自定义的样式类，使用
    //md.setHTMLClass({h1:"my-class-h1",h2:"my-class-h2"})
    var result = md.buildToHTML(mdText);
}
```
- 3.可引入的类样式类已加默认值如下：
```
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
            //大段代码中的每一行。
            highLight:"md-high-light",

            //大段代码
            pre: "md-pre",
            //待办事项
            backlog: "md-backlog",
            //已办
            completed: "md-completed"

```
---
## 目前所实现的功能：
#### 一、md格式文本转换成html结构。
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
