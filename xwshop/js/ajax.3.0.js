// 使用文档
// 使用说明
// ajax()方法，必须传入一个对象，对象内必须有url和success，这两个是必传
// 其他可选参数有：type，data，error，jsonpName，timeout

function ajax(options){
    // 1.参数的处理
    var type = options.type || "get";
    var data = options.data || {};
    var timeout = options.timeout || 120000;
    if(type === "jsonp"){
        var d = new Date();
        var jsonpName = options.jsonpName;
        var callbackName = "_ly"+d.getTime();
    }
    var error = options.error || function(){};

    
    // 2.要发送的数据的解析：user=admin&pass=123
    var str = "";
    for(var i in data){
        str = str + i + "=" + data[i] + "&";
    }
    
    // 3.GET和POST要使用的ajax对象的创建
    var xhr = new XMLHttpRequest();

    // 4.GET和jsonp都是在地址栏发送信息
    if(type == "get" || type == "jsonp"){
        var d = new Date();
        options.url = options.url + "?" + str + "_qft=" + d.getTime();
    }
    // 4.GET和POST的打开，监听功能
    xhr.open(type,options.url);
    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4 && xhr.status == 200){
            options.success(xhr.responseText,"success",xhr)
        }else if(xhr.readyState == 4 && xhr.status != 200){
            error(xhr.status,"error",xhr)
        }
    }


    switch(type){
        case "get":
            // 5-1.GET的发送，ajax的最后一步
            xhr.send(null);
            break;
        case "post":
            // 5-2.POST的发送的数据格式的设置，再发送
            xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
            xhr.send(str.slice(0,str.length-1));
            break;
        case "jsonp":
            // 6.jsonp的功能的实现
            var script = document.createElement("script");
            // 7.手动将回调函数名所在的字段名和自动生成的回调函数名拼接到url
            script.src = options.url+"&"+jsonpName+"="+callbackName;
            document.body.appendChild(script)
            // 8.因为jsonp没有ajax对象，所以只能使用时间判断成功或失败
            // 同时成功和失败只能执行一个，所以，设置两个开关记录状态
            var successOnoff = false;
            var errorOnoff = false;
            window[callbackName] = function(res){
                // 9-1.执行成功之前先根据失败的状态判断失败是否执行
                if(errorOnoff == false){
                    options.success(res,"success",{
                        msg:"jsonp请求，没有xhr对象"
                    })
                    // 执行了成功的同时修改成功的状态
                    successOnoff = true;
                }
            }
            setTimeout(() => {
                // 9-2.执行失败之前先根据成功的状态判断成功是否执行
                if(successOnoff == false){
                    error("timeout","timeout",{
                        msg:"jsonp请求，没有xhr对象"
                    })
                    // 执行了失败的同时修改失败的状态
                    errorOnoff = true;
                }
            }, timeout);
    }
}