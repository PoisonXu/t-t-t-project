let onoffLog = false;

//获取商品详情
class Gain{
    constructor(){
        this.lo = localStorage.getItem("goods");
        this.main = document.querySelector("main")
        this.url = "http://localhost:83/xwshop/data/json.json"
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
        for(let i=0;i<this.res.length;i++){
            if(this.lo == this.res[i].goodsID){
                for(let j=0;j<this.res[i].goodsSsrc.length;j++){
                    str2 += `<li><img src="${this.res[i].goodsSsrc[j]}" alt=""></li>`
                }
            str = `<h3>${this.res[i].goodsName}</h3>
            <div class="det-contain">
                <div class="bigger">
                    <div class="small">
                        <img src="${this.res[i].goodsSsrc[0]}" alt="" class="small-img"/>
                        <i></i>
                    </div>
                    <div class="big">
                            <img src="${this.res[i].goodsSsrc[0]}" alt="" class="big-img"/>
                        </div>
                    <div class="imglist">
                        <input type="button" name="" id="left" value="&lt"/>
                        <input type="button" name="" id="right" value="&gt"/>
                        <ul class="clear">
                        ${str2}
                        </ul>
                    </div>
                </div>
                <div class="contain">
                    <h4>${this.res[i].goodsName}</h4>
                    <p>${this.res[i].goodsMark}${this.res[i].goodsSname}</p>
                    <ul>
                        <li><span>销售价：</span><em>￥${this.res[i].goodsPrice}</em><span>(折扣价8.3折)</span></li>
                        <li><span>市场价：</span><s>￥${(this.res[i].goodsPrice/0.83).toFixed(2)}</s></li>
                        <li><span>商品评分：</span><span>(共10人评论)</span></li>
                    </ul>
                    <div class="cont">
                        <span>数量：</span>
                        <input type="button" name="" class="red" value="-"/>
                        <input type="text" name="" class="num" value="1"/>
                        <input type="button" name="" class="add" value="+"/>
                    </div>
                    <input type="button" name="" id="buynow" value="立即购买"/>
                    <input type="button" name="" id="addcar" value="加入购物车"/>
                    <div class="shopcar2">
                    <h4><span>提示</span><i></i></h4>
                    <p>加入购物车成功</p>
                    <p>目前选购商品共<em>2</em>种<em>6</em>件合计：<span>4268.00元</span></p>
                    <div class="shop">
                        <input type="button" value="继续购物" class="con"/>
                        <input type="button" value="进入购物车" class="ent"/>
                    </div>
                </div>    
                </div>
        
            </div>`
            }
        }
        this.main.children[0].innerHTML = str   
    }   
}
new Gain;


    

window.onload = function(){
//加入购物车
class Caradd{
    constructor(){
        this.lo = localStorage.getItem("goods");
        this.pr = document.querySelector(".contain ul li em");
        this.pr = parseFloat(this.pr.innerHTML.slice(1))
        this.addEvent();
        this.display3();
    }

    addEvent(){
        const that = this;
        this.red = document.querySelector(".cont .red");
        this.num = document.querySelector(".cont .num");
        this.add = document.querySelector(".cont .add");
        this.addCar = document.querySelector("#addcar");
        this.buynow = document.querySelector("#buynow");
        this.addCar = document.querySelector("#addcar");
        this.tip = document.querySelector(".contain .shopcar2");
        this.ent = document.querySelector(".shop .ent");
        this.con = document.querySelector(".contain");

        this.red.onclick = function(){
            if(that.num.value == 1){
                that.num.value = 1
            }else{
                that.num.value--
            }
        }
        this.add.onclick = function(){
                that.num.value++
        }
        this.addCar.onclick = function(){
            if(onoffLog){
                that.tip.style.display = "block"
                that.setLo();
                new Fig();
            }
        }

        this.tip.children[0].children[1].onclick = function(){
            that.tip.style.display = "none"
        }
        this.tip.children[3].children[0].onclick = function(){
            that.tip.style.display = "none"
        }
        this.buynow.onclick = function(){
            if(onoffLog){
                location.href = "http://localhost:83/xwshop/goodscar.html"
            }
        }
        this.ent.onclick = function(){
            if(onoffLog){
                location.href = "http://localhost:83/xwshop/goodscar.html"
            }
        }        
    }
            
    setLo(){
        this.loget = localStorage.getItem("goodscar");
        if(!this.loget){
            this.loget = [{
                id:this.lo,
                num:Number(this.num.value),
                pr:this.pr
            }]
        }else{
            let onoff = true;
            this.loget = JSON.parse(this.loget);
            for(let i=0;i<this.loget.length;i++){
                if(this.loget[i].id == this.lo){
                    this.loget[i].num += Number(this.num.value);
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
        this.tip.children[2].innerHTML = str
    }

}
new Caradd;

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

        this.btn.onclick = function(){
            location.href = "http://localhost:83/xwshop/goodslist.html"
        }

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

//放大镜
class Bigger{
    constructor(){
        this.small = document.querySelector("main  .det-contain .bigger .small");
        this.loupe = this.small.children[1];
        this.ul = document.querySelector("main  .det-contain .bigger .imglist ul");
        this.big = document.querySelector("main  .det-contain .bigger .big");
        this.case = this.big.children[0];
        this.init();
    }

    init(){
        const that = this;

        this.ul.addEventListener("mouseover",(eve)=>{
            const e = eve || window.event;
            let target = e.target || e.srcElement;
            if(target.nodeName == "IMG"){
                this.small.children[0].src = target.src
                this.case.src = target.src
            }

        })

        this.small.addEventListener("mouseover",function(){
            that.show();
            this.onmousemove = function(eve){
                const e = eve || window.event;
                that.move({
                    x:e.pageX - this.parentNode.parentNode.offsetLeft,
                    y:e.pageY - this.parentNode.parentNode.offsetTop
                })
            }
        })
        this.small.addEventListener("mouseout",function(){
            that.hide();
        })
    }

    show(){
        this.loupe.style.display = "block";
        this.big.style.display = "block";
    }
    
    hide(){
        this.loupe.style.display = "none";
        this.big.style.display = "none";    
    }
    
    move(opa){
        let l = opa.x - this.loupe.offsetWidth/2;
        let t = opa.y - this.loupe.offsetHeight/2;
        if(l<0){l=0};
        if(t<0){t=0};
        (l>this.small.offsetWidth-this.loupe.offsetWidth) && 
        (l=this.small.offsetWidth-this.loupe.offsetWidth);
        (t>this.small.offsetHeight-this.loupe.offsetHeight) &&
        (t=this.small.offsetHeight-this.loupe.offsetHeight);
        this.loupe.style.left = l + "px";
        this.loupe.style.top = t + "px";
        let x=  l / (this.small.offsetWidth-this.loupe.offsetWidth)
        let y = t / (this.small.offsetHeight-this.loupe.offsetHeight)
        this.case.style.left = -x * (this.case.offsetWidth-this.big.offsetWidth) + "px";
        this.case.style.top = -y * (this.case.offsetHeight-this.big.offsetHeight) + "px";
    }


}
new Bigger;

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