'use strict';
/*
## 用法：
- 1.引入js
- 2.传入待转换的md格式文本，如下：
```
if(typeof window.JSWidgets.markdown == "object"){
    var md = new JSWidgets.markdown.convert();
    //样式可以引入自定义的样式类，使用
    //md.setHTMLClass({h1:"my-class-h1",h2:"my-class-h2"})
    var result = md.buildToHTML(mdText);
}
```
 */
//js工具集命名空间

var JSWidgets = window.JSWidgets || {};
//markdown命名空间
JSWidgets.markdown = JSWidgets.markdown || {};
//暴露md转换器
JSWidgets.markdown.converter = function () {
    //样式自定义配置
    var newHTMLClass = {};
    var HTMLClass = {};
    this.setHTMLClass = function (outHTMLClass) {
        if (typeof outHTMLClass == "object") {
            newHTMLClass = outHTMLClass;
        }
    }
    this.buildToHTML = function (text) {
        if(typeof text !== "string"){
            return ""
        }
        doSetConfig();
        //顺序不能乱。、
        //特殊字符转换，主要是HTML的标签。
        text = doConvertHTML(text);
        //tab转换成空格
        text = doTab(text);
        //大段代码格式化
        text = doPrecode(text);
        //内容格式化
        text = doMidHandler(text);
        //列表格式化
        text = doList(text);
        //开头格式化
        text = doBeginHandler(text);
        //表格处理
        text = doTable(text);
        return text;

    }
    //文本每一行开头正则匹配
    var textStartRegExp = [];
    //文本每一行内容正则匹配
    var textContentRegExp = [];
    //配置设置
    function doSetConfig(){
        HTMLClass = {
            h1: newHTMLClass.h1 || "md-h1",
            h2: newHTMLClass.h2 || "md-h2",
            h3: newHTMLClass.h3 || "md-h3",
            h4: newHTMLClass.h4 || "md-h4",
            h5: newHTMLClass.h5 || "md-h5",
            h6: newHTMLClass.h6 || "md-h6",
            hr: newHTMLClass.hr || "md-hr",
            mark: newHTMLClass.mark || "md-mark",
            underline: newHTMLClass.underline || "md-underline",
            //引用
            blockquote: newHTMLClass.blockquote || "md-blockquote",
            //斜体
            em: newHTMLClass.em || "md-em",
            hr: newHTMLClass.hr || "md-hr",
            image: newHTMLClass.image || "md-image",
            link: newHTMLClass.link || "md-link",
            code: newHTMLClass.code || "md-code",
            strong: newHTMLClass.strong || "md-strong",
            bold: newHTMLClass.bold || "md-bold",
            table: newHTMLClass.table || "md-table",
            ul: newHTMLClass.ul || "md-ul",
            //大段代码中的每一行。
            highLight: newHTMLClass.highLight || "md-high-light",

            //大段代码
            pre: newHTMLClass.pre || "md-pre",
            //待办事项
            backlog: newHTMLClass.backlog || "md-backlog",
            //已办
            completed: newHTMLClass.completed || "md-completed"

        }
    textStartRegExp = [
        {
            name: "h1",
            pattern: /^#{1} (.*)/gm,
            HTML: "<h1 class='" + HTMLClass.h1 + "'>$1</h1>"
        },
        {
            name: "h2",
            pattern: /^#{2} (.*)/gm,
            HTML: "<h2 class='" + HTMLClass.h2 + "'>$1</h2>"
        },
        {
            name: "h3",
            pattern: /^#{3} (.*)/gm,
            HTML: "<h3 class='" + HTMLClass.h3 + "'>$1</h3>"
        },
        {
            name: "h4",
            pattern: /^#{4} (.*)/gm,
            HTML: "<h4 class='" + HTMLClass.h4 + "'>$1</h4>"
        },
        {
            name: "h5",
            pattern: /^#{5} (.*)/gm,
            HTML: "<h5 class='" + HTMLClass.h5 + "'>$1</h5>"
        },
        {
            name: "h6",
            pattern: /^#{6} (.*)/gm,
            HTML: "<h6 class='" + HTMLClass.h6 + "'>$1</h6>"
        },
        {
            //引用
            name: "blockquote",
            pattern: /^>(.*)/gm,
            HTML: "<blockquote class='" + HTMLClass.blockquote + "'>$1</blockquote>"
        },
        {
            //分隔线
            name: "hr",
            pattern: /^---$/gm,
            HTML: "<hr class='" + HTMLClass.hr + "'>"
        }
    ]
    textContentRegExp = [
        {
            //图片
            name: "image",
            pattern: /\!\[(.*)\]\((.*)\)/g,
            HTML: "<img class='" + HTMLClass.image + "' src='$2' title='$1'>"
        },
        {
            //链接
            name: "link",
            pattern: /\[(.*)\]\((.*)\)/g,
            HTML: "<a href='$2' class='" + HTMLClass.link + "'>$1</a>"
        },
        {
            //加粗，中间内容除了*重复多次
            name: "bold",
            pattern: /\*{2}([^\*]*?)\*{2}/g,
            HTML: "<strong class='" + HTMLClass.bold + "'>$1</strong>"
        },
        {
            //斜体
            name: "italic",
            pattern: /\*{1}(.*)\*{1}/g,
            HTML: "<em class='" + HTMLClass.em + "'>$1</em>"
        },
        {
            //代码块
            name: "code",
            pattern: /`(.*?)`/g,
            HTML: "<code class='" + HTMLClass.code + "'>$1</code>"
        },
        {
            //标记
            name: "mark",
            pattern: /==(.*)==/gm,
            HTML: "<span class='" + HTMLClass.mark + "'>$1</span>"

        },
        {
            //下划线
            name: "underline",
            pattern: /\+\+(.*)\+\+/gm,
            HTML: "<span class='" + HTMLClass.underline + "'>$1</span>"

        },
        {
            //待办
            name: "backlog",
            pattern: /- \[ \](.*)/gm,
            HTML: "<div class='" + HTMLClass.backlog + "'><input type='checkbox' disabled>$1</div>"

        },
        {
            //已办
            name: "completed",
            pattern: /- \[x\](.*)/gm,
            HTML: "<div class='" + HTMLClass.completed + "'><input type='checkbox' disabled checked>$1</div>"

        }

    ]

    } 
    //处理文本中间内容
    function doMidHandler(text) {
        //查找非<xx>开头的行，主要为了不转换<pre>xx</pre>中的内容
        var p = /^(?!(<.+>)).*/gm;
        text = text.replace(p, function (wholeMatch, m1) {
            for (var i = 0, len = textContentRegExp.length; i < len; i++) {
                var tmp = textContentRegExp[i];
                wholeMatch = wholeMatch.replace(tmp.pattern, tmp.HTML);
            }
            return wholeMatch;

        });
        return text;
    }
    //处理文本开头
    function doBeginHandler(text) {
        for (var i = 0, len = textStartRegExp.length; i < len; i++) {
            var tmp = textStartRegExp[i];
            text = text.replace(tmp.pattern, tmp.HTML);
        }
        return text;
    }
    //表格处理
    function doTable(text) {
        //匹配一串表格
        var p = /(.*)\|(.*)(\|(.*))*\n(---\|---(\|---)*)\n((.*)\|(.*)(\|(.*))*[\n]{0,})+/gm;
        var result = text.replace(p, function (wholeMatch, m1, m2) {
            wholeMatch = wholeMatch.split(/[\|\n]/);
            var result = "<table class='" + HTMLClass.table + "'>"
            var head = "<thead><tr>"
            var body = "<tbody>"
            var col = wholeMatch.indexOf("---");
            //去掉最后一个空字符串，因为\n分割会把最后一个\n后面字符串算进去。
            if (wholeMatch.length % col == 1) {
                wholeMatch.length = wholeMatch.length - 1;
            }
            var items = wholeMatch.filter(function (item, index, array) {
                if (item != "---") {
                    return true
                }
            })
            items.forEach(function (item, index) {
                if (index < col) {
                    head += "<th>" + item + "</th>"
                } else if (index == col) {
                    body += "<tr>"
                    body += "<td>" + item + "</td>"

                } else if (index % col == 0) {
                    body += "</tr><tr>"
                    body += "<td>" + item + "</td>"
                } else {
                    body += "<td>" + item + "</td>"
                }
            });
            head += "</tr></thead>"
            body += "</tr></tbody>"
            result += head + body + "</table>"
            return result;
        });
        return result;
    }
    //查找``` ```段落
    function doPrecode(text) {
        //```开头和```结尾
        var p = /^`{3}[\n]{1,}((?:(.)|\n)*?)`{3}$/gm;
        text = text.replace(p, function (wholeMatch, m1) {
            var result = doHighLight(m1);
            return "<pre class='" + HTMLClass.pre + "'><code class='" + HTMLClass.code + "'>" + result + "</code></pre>";
        });
        return text;
    }
    //<pre>标签内的代码
    function doHighLight(text) {
        var p = /(.*)\n/g;
        text = text.replace(p, "<p class='" + HTMLClass.highLight + "'>$1</p>");
        return text;
    }
    //特殊字符转换，主要是HTML的标签。
    function doConvertHTML(text) {
        //替换特殊字符，以免被innerHTML插入时被解析。
        var p = /</g;
        text = text.replace(p, function (match) {
            switch (match) {
                case "<":
                    return "&lt;";
                    break;
                case ">":
                    return "&gt;"
                    break;
                case "/":
                    return "&frasl;"
                    break;
            }
        });
        return text;

    }
    //tab转换成空格
    function doTab(text) {
        return text.replace(/\t/g, "    ");
    }

    //列表处理
    function doList(text) {
        //目前把有序列表也看成无序列表来处理。。、
        var p = /^([ ]*(?:[-+*]|\d\.)[ ]+(.+)[\r\n]{0,})+/gm;
        text = text.replace(p, function (wholeList, m1, m2, m3) {
            var item = doItem(wholeList);
            return "<ul class='" + HTMLClass.ul + "'>" + item + "</ul>\n";
        });
        return text;
    }
    //列表item处理
    function doItem(text) {
        var p = /((?:(?:^[-+*])|(?:\d.)) (.+))|(([ ]{2,}(?:(?:[-+*])|(?:\d\.))[ ]+(.+)[\r\n]{0,})+)/gm;
        text = text.replace(p, function (wholeList, m1, m2, m3) {
            //m1匹配只有一行，即没有后面子列表，根据换行判断。
            if (m1) {
                return "<li>" + m2 + "</li>";
            } else {
                wholeList = wholeList.replace(/^[ ]{1,2}/gm, "");
                var result = doList(wholeList);
                return "<li style='list-style:none;'>" + result + "</li>";
            }
        });
        return text;
    }
}
