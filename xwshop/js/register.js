window.onload = function(){

let onoffLog = false;

//注册
class Regis{
    constructor(){
        this.users = localStorage.getItem("users");
        this.acc = document.querySelector("#acc");
        this.pass = document.querySelector("#pass");
        this.passt = document.querySelector("#passt");
        this.inv = document.querySelector("#inv");
        this.code = document.querySelector("#code");
        this.code2 = document.querySelector("#code2");
        this.yanzheng = this.code.nextElementSibling;
        this.che = document.querySelector("#che");
        this.register = document.querySelector("#register");

        this.onoffacc = false;
        this.onoffpass = false;
        this.onoffpasst = false;
        this.onoffcode = false;
        this.onoffche = false;


        this.init();
    }

    init(){

        this.addEvent();
    }

    addEvent(){
        const that = this;
        this.acc.oninput = function(){
            let regex = /^[A-Z][A-Za-z0-9_-]{3,14}$/;
            if(regex.test(that.acc.value)){
                this.parentNode.children[2].innerHTML = "输入正确"
                that.onoffacc = true;
            }else{
                this.parentNode.children[2].innerHTML = "请输入4-15位非特殊字符，首字母必须为大写字母"
                that.onoffacc = false;
            }

        }
        this.pass.oninput = function(){
            let regex = /^\S{8,15}$/;
            if(regex.test(that.pass.value)){
                this.parentNode.children[2].innerHTML = "输入正确"
                that.onoffpass = true;
            }else{
                this.parentNode.children[2].innerHTML = "请输入8-15位非空白字符"
                that.onoffpass = false;
            }
        }

        this.passt.oninput = function(){
            if(that.pass.value == ""){
                this.parentNode.children[2].innerHTML = "输入请输入密码"
            }else{
                if(that.passt.value == that.pass.value){
                    this.parentNode.children[2].innerHTML = "输入正确"
                    that.onoffpasst = true;
                }else{
                    this.parentNode.children[2].innerHTML = "密码不符"
                    that.onoffpasst = false;
                }
            }
        }
        this.code.oninput = function(){
            if(this.value == that.yanzheng.innerHTML){
                that.onoffcode= true;
            }else{
                that.onoffcode= false;
            }
        }

        this.che.onclick = function(){
            if(that.che.checked){
                that.onoffche = true;
            }else{
                that.onoffche = false;
            }
        }

        this.code2.onclick = function(){
            let arr = [];
            let str = "";
            for(let i=0;i<4;i++){
            arr = ([random(48,57),random(65,90),random(97,122)]);
            str += String.fromCharCode(arr[random(0,2)])
            }
            that.yanzheng.innerHTML = str
        }

        this.register.onclick = function(){
            if(that.onoffacc && that.onoffche && that.onoffcode && that.onoffpass && that.onoffpasst){
                this.nextElementSibling.innerHTML = "";
                that.setLocal()
            }else{
                this.nextElementSibling.innerHTML = "请检查"
            }
        }
    }

    setLocal(){
        let clo = true;
        this.users = localStorage.getItem("users");
        if(!this.users){
            this.users = [{
                acc:this.acc.value,
                pass:this.pass.value,
                onoff:0
            }]
        }else{
            this.users = JSON.parse(this.users)
            for(let i=0;i<this.users.length;i++){
                if(this.acc.value == this.users[i].acc){
                this.acc.nextElementSibling.innerHTML = `用户名被占用`;
                clo = false;
                break
                }
            }
            if(clo){
                this.users.push({
                    acc:this.acc.value,
                    pass:this.pass.value,
                    onoff:0
                })
            }
        }
        localStorage.setItem("users",JSON.stringify(this.users))
        if(clo){
            this.register.value = "注册成功，3秒后跳转";
            setTimeout(()=>{
                location.href = "http://localhost:83/xwshop/login.html"
            },3000)
        }

    }
    


}    
new Regis;

//登录状态
class Load{
        constructor(){
            this.onofflog = false;
            this.users = localStorage.getItem("users");
            this.log = document.getElementById("log");
            this.exit = document.getElementById("exit");
            this.init();
        }
    
        init(){
            if(!this.users){
                this.exit.style.display = "none";
                this.log.style.display = "inline";
            }else{
                this.users = JSON.parse(this.users);
                for(let i=0;i<this.users.length;i++){
                    if(this.users[i].onoff == "1"){
                        this.log.style.display = "none";
                        this.exit.style.display = "inline";
                        this.onofflog = true;
                    }else{
                        this.onofflog = false;
                    }
                }    
            }
            this.addEvent();
        }
    
        addEvent(){
            const that = this;
            this.exit.onclick = function(){
                that.users = JSON.parse(localStorage.getItem("users"));
                for(let i=0;i<that.users.length;i++){
                    that.users[i].onoff = 0;
                }
                localStorage.setItem("users",JSON.stringify(that.users))
                that.log.style.display = "inline";
                that.exit.style.display = "none";
    
    
    
                
            }
        }
    
    }
    new Load;

function random(a,b){
    return Math.round(Math.random()*(a-b)+b)
}

//三级菜单
class Nav{
    constructor(){
        this.menu = document.querySelector("nav .menu");
        this.url = "http://localhost:83/xwshop/data/nav.json";
        this.init();
    }

    init(){
        ajax({
            url:this.url,
            success:(res)=>{
                this.res = JSON.parse(res);
                this.display();
            }
        })
    }

    display(){
        let str = "";
        let str2 = "";
        let str1 = "";
        let str4 = "";
        for(let i=0;i<this.res.length;i++){
            str4 = "";
            str2 = `<a href="${this.res[i].src}" class="second">${this.res[i].name}</a>`
            for(let j=0;j<this.res[i].first.length;j++){
                str1 = `<h4>${this.res[i].first[j].name}</h4>`;
                for(let k=0;k<this.res[i].first[j].second.length;k++){
                    str1 += `<a href="${this.res[i].first[j].second[k].src}">${this.res[i].first[j].second[k].name}</a>`
                }
                str4 += `<div>${str1}</div>`;
                str2 += `<a href="${this.res[i].first[j].src}">${this.res[i].first[j].name}</a>`;
            }
            str +=`<dd>${str2}<div class="third">${str4}</div></dd>`;     
        }
        this.menu.innerHTML = `<dt><a href="http://localhost:83/xwshop/goodslist.html">全部商品分类</a></dt>`+ str;
    }
}
new Nav;


//右下角定位框
class Fig{
    constructor(){
        this.loca = localStorage.getItem("goodscar") || [];
        this.fig = document.querySelector("#carnum");
        this.init();
    }

    init(){
        if(onoffLog){
            if(!this.loca){
                this.fig.innerHTML = 0;
            }else{
                this.loca = JSON.parse(this.loca)
                this.fig.innerHTML = this.loca.length;
            }
        }else{
            this.fig.innerHTML = 0;
        }   
    }
}
new Fig;

}