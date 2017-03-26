//配置JS插件
require.config({
    shim:{
        "jswd":{
            exports:"JSWidgets"
        }
    },
    paths:{
        "jswd":"md"
    }
});
require(["jswd"],function(JSWidgets){
    window.addEventListener("click", clickHandler, false);
    function clickHandler(e) {
        if (typeof e.target.id == "string") {
            switch (e.target.id) {
                case "runMd":
                    runMd(e);
                    break;
            }
        }
    }
    function runMd(e) {
        if (typeof JSWidgets.markdown == "object") {
            var textArea = document.getElementById("mdText")
            var md = new JSWidgets.markdown.converter();
            //设置类。
            md.setHTMLClass({});
            var result = md.buildToHTML(textArea.value)
            var pc = document.getElementById("previewContainer")
            pc.innerHTML = result
        }
    }
    //启动就运行。
    runMd();
});
    