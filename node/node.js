
const http = require("http");

const fs = require("fs");

const url = require("url");

const querystring = require("querystring");



http.createServer((req,res)=>{
    if(req.url != "/favicon.ico"){
        
        let urlObj = url.parse(req.url);

        switch(urlObj.pathname){
            case "xwshop/data/json.json":
                ajaxHandle(req,res,urlObj)
                break;
            default:
                readFile(req,res,urlObj.pathname);
        }
    }
}).listen("83","localhost");



function ajaxHandle(req,res,url){
    let data = {};
    let postData = {};
    let getData = url.query;
    let str = "";
    req.on("data",(msg)=>{
        str += msg;
    })
    req.on("end",()=>{
        postData = str;

        data = getData || postData;
        
        data = querystring.parse(data);
        
        // var u = data.user;
        // var p = data.pass;

        // var onoff = true;
        // mysql.forEach((v,i)=>{
        //     if(v.user == u && v.pass == p){
        //         onoff = false
        //         res.write("失败");
        //     }
        // })
        // if(onoff == true){
        //     res.write("成功");
        // }
        
        // res.end();
    })
}

function readFile(req,res,path){
    fs.readFile("./.."+path,(error,data)=>{
        if(error == null){
            res.write(data);
            res.end()
        }
    });
}




