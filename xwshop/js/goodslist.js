window.onload = function(){

let onoffLog = false;

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

//搜索
class Search{
    constructor(){
        this.url = "http://localhost:83/xwshop/data/json.json";
        this.txt = document.querySelector("#txt");
        this.btn = document.querySelector("#btn");
        this.ul = document.querySelector(".search .result");

        this.addEvent()
    }

    addEvent(){
        const that = this;
        this.txt.addEventListener("keyup",function(){
            that.value = this.value
            that.load();
        })

        this.ul.addEventListener("mouseover",function(eve){
            const e = eve || window.event;
            let target = e.target || e.srcElement;
            if(target.nodeName == "LI"){
                that.value = target.innerHTML;
                that.txt.value = that.value;
            } 
        })

        this.ul.addEventListener("click",function(eve){
            const e = eve || window.event;
            let target = e.target || e.srcElement;
            if(target.nodeName == "LI"){
                that.ul.innerHTML = "";
            } 
        })

        this.txt.addEventListener("blur",function(){
            that.ul.innerHTML = "";
        })

        this.btn.onclick = function(){
            location.href = "http://localhost:83/xwshop/goodslist.html"
        }
    }

    load(){
        const that = this;
        ajax({
            url:this.url,
            success:function(res,status,xhr){
                that.res = JSON.parse(res);
                that.choose();
            }
        })
    }

    choose(){
        let str = "";
        for(let i=0;i<this.res.length;i++){
            if(this.res[i].goodsName.indexOf(this.value,0) != -1 && this.value != ""){
                str += `<li>${this.res[i].goodsSname}</li>`
            }    
        }
        this.ul.innerHTML = str
    }
}
new Search;

//渲染商品
class Goods{
    constructor(){
        this.list = document.querySelector("main .goodslist");
        this.shopcar = document.getElementsByClassName("shopcar2");

        this.url = "http://localhost:83/xwshop/data/json.json"
        this.init();
    }

    init(){
        ajax({
            url:this.url,
            success:(res)=>{
            this.res = JSON.parse(res)
            this.display();
            }
        })
    }
    
    display(){
        let str = "";
        for(let i=0;i<this.res.length;i++){
            str += `<li>
                        <a href="http://localhost:83/xwshop/goodsdetail.html" class="goodsimg" xw="${this.res[i].goodsID}"><img src="${this.res[i].goodsSrc}" alt=""></a>
                        <a href="http://localhost:83/xwshop/goodsdetail.html" class="goodspro" xw="${this.res[i].goodsID}">${this.res[i].goodsSname}</a>
                        <span class="pricen">${this.res[i].goodsPrice}</span><s class="priceo">${(this.res[i].goodsPrice/0.83).toFixed(2) }</s>
                        <div class="goodslist-b">
                            <b>条评论</b>
                            <input type="button" value="加入购物车" class="add" xw="${this.res[i].goodsID}"/>
                            <div class="shopcar2">
                                <h4><span>提示</span><i class="deff"></i></h4>
                                <p>加入购物车成功</p>
                                <p>目前选购商品共<em>2</em>种<em>6</em>件合计：<span>4268.00元</span></p>
                                <div class="shop">
                                    <input type="button" value="继续购物" class="con"/>
                                    <input type="button" value="进入购物车" class="ent"/>
                                </div>
                            </div>
                        </div>   
                    </li>`
        }
        this.list.innerHTML = str;
        this.tip = document.querySelector(".shopcar2");
        this.addEvent();
    }

    addEvent(){
        this.list.addEventListener("click",(eve)=>{
            const e = eve || window.event;
            const target = e.target || e.srcElement;
            if(target.className == "add"){
                if(onoffLog){
                for(let i=0;i<this.shopcar.length;i++){
                    this.shopcar[i].style.display = "none";
                }
                target.nextElementSibling.style.display = "block";
                this.lo = target.getAttribute("xw");
                this.pr = parseFloat(target.parentNode.parentNode.children[2].innerHTML)
                this.setLo();
            }
            }

            if(target.className == "deff"){
                target.parentNode.parentNode.style.display = "none";
            }

            if(target.className == "con"){
                target.parentNode.parentNode.style.display = "none";
            }

            if(target.nodeName == "IMG"){
                localStorage.setItem("goods",target.parentNode.getAttribute("xw"))
            }  

            if(target.className == "goodspro"){
                localStorage.setItem("goods",target.getAttribute("xw"))
            }
            
        })
    }

    setLo(){
        this.loget = localStorage.getItem("goodscar");
        if(!this.loget){
            this.loget = [{
                id:this.lo,
                num:1,
                pr:this.pr
            }]
        }else{
            let onoff = true;
            this.loget = JSON.parse(this.loget);
            for(let i=0;i<this.loget.length;i++){
                if(this.loget[i].id == this.lo){
                    this.loget[i].num ++;
                    onoff = false;
                    break;
                }
            }
            if(onoff){
                this.loget.push({
                    pr:this.pr,
                    id:this.lo,
                    num:1
                })
            }
        }
        
        localStorage.setItem("goodscar",JSON.stringify(this.loget));
        this.display3();
    }

    display3(){
        this.loget = localStorage.getItem("goodscar");
        let str = "";
        let num = 0;
        let num2 = 0;
        if(!this.loget){
            str += `目前选购商品共<em>0</em>种<em>0</em>件合计：<span>0元</span>`
           
        }else{
            this.loget = JSON.parse(this.loget);
            for(let i=0;i<this.loget.length;i++){
                num += Number(this.loget[i].num);
                num2 += Number(this.loget[i].num)*Number(this.loget[i].pr)
            }
            str = `目前选购商品共<em>${this.loget.length}</em>种<em>${num}</em>件合计：<span>${num2.toFixed(2)}元</span>`
        }
        console.log(this.tip.children[2])
        console.log(this.tip)
        this.tip.children[2].innerHTML = str
    }
}
new Goods();

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