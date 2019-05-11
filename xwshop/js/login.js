window.onload = function(){
//登录
class Login{
    constructor(){
        this.txt = document.getElementById("txt1");
        this.pass = document.getElementById("pass");
        this.code = document.getElementById("code");
        this.rember = document.getElementById("rember");
        this.auto = document.getElementById("auto");
        this.login = document.getElementById("login");
        this.code2 = document.getElementById("code2");
        this.users = localStorage.getItem("users");
        this.yanzheng = this.code.nextElementSibling;
        this.onoffcode = false;
        this.init();
        this.ranDom();
    }

    ranDom(){
        let arr = [];
        let str = "";
        for(let i=0;i<4;i++){
        arr = ([random(48,57),random(65,90),random(97,122)]);
        str += String.fromCharCode(arr[random(0,2)])
        }
        this.yanzheng.innerHTML = str 
    }

    init(){
        
        this.addEvent();
    }

    addEvent(){
        let that = this;
        this.code2.onclick = function(){
            let arr = [];
            let str = "";
            for(let i=0;i<4;i++){
            arr = ([random(48,57),random(65,90),random(97,122)]);
            str += String.fromCharCode(arr[random(0,2)])
            }
            that.yanzheng.innerHTML = str
        }

        this.code.oninput = function(){
            if(this.value == that.yanzheng.innerHTML){
                that.onoffcode= true;
            }else{
                that.onoffcode= false;
            }
        }

        this.login.onclick = function(){
            that.users = localStorage.getItem("users"); 
            let deff = true;
            if(!that.users){
                that.txt.nextElementSibling.innerHTML = "用户名不存在"
            }else{
                that.users = JSON.parse(that.users);
                for(let i=0;i<that.users.length;i++){
                    if(that.txt.value == that.users[i].acc && that.pass.value == that.users[i].pass){
                        if(that.onoffcode){
                            that.users[i].onoff = 1;
                            console.log(that.users)
                            localStorage.setItem("users",JSON.stringify(that.users))
                            this.value = "登录成功，三秒后跳转"
                            setTimeout(()=>{
                                location.href = "http://localhost:83/xwshop/index.html"
                            },3000)
                            deff = false;
                            break;
                        }else{
                          that.code2.nextElementSibling.innerHTML = "请输入验证码"  
                        }
                        
                    }
                }
                if(deff){
                    that.pass.nextElementSibling.innerHTML = "用户名密码不符"
                }
            }

        }
    }

}
new Login;

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

//登录状态
class Load{
    constructor(){
        console.log(1)
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
                    onoffLog = true;
                }else{
                    onoffLog = false;
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
            location.reload();
            onoffLog = false;   
        }

    }

}
new Load;

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

function random(a,b){
    return Math.round(Math.random()*(a-b)+b)
}

}