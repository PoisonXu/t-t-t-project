window.onload = function(){
let onoffLog = false

// 轮播图效果
class Banner{
    constructor(){
        this.banner = document.getElementById("banner");
        this.lay = this.banner.children[0];
        this.li = this.banner.children[1].children;
        this.img = this.lay.children;
        this.left = this.img[0];
        this.right = this.img[1];
        this.addEvent();
        this.index = 2;
        this.auto();
        this.list();
    }

    addEvent(){
        const that = this;
        this.left.addEventListener("click",()=>{
            this.changeIndex(0)
        })
        this.right.addEventListener("click",()=>{
            this.changeIndex(1)
        })
        this.li[0].parentNode.addEventListener("click",function(eve){
            const e = eve || window.event;
            let target = e.target || e.srcElement;
            for(let i=0;i<that.li.length;i++){
                that.li[i].setAttribute("index",i+2)
            }
            if(target.nodeName == "LI"){
                that.index = parseInt(target.getAttribute("index"));
                console.log(that.index)
                that.display();
            }
        })
    }

    changeIndex(type){
        if(type){
            if(this.index == this.img.length-1){
                this.index = 2;
            }else{
                this.index++;
            }
        }else{
            if(this.index == 2){
                this.index = this.img.length-1;
            }else{
                this.index--;
            }    
        }
        this.display();
    }

    display(){
        for(let i=0;i<this.img.length;i++){
            if(this.img[i].tagName == "A"){

                this.img[i].style = "opacity:0";
            }
        }
        $(this.img[this.index]).stop().animate({
            "opacity":1
        });
        this.list();
    }

    list(){
        for(let i=0;i<this.li.length;i++){
            this.li[i].style.background = "#fff";
        }
        this.li[this.index-2].style.background = "red";
    }

    auto(){
        this.timer = setInterval(()=>{
            this.changeIndex(1);
        },3000)
        this.banner.children[1].addEventListener("mouseover",()=>{
            clearInterval(this.timer)
        })
        this.banner.children[1].addEventListener("mouseout",()=>{
            this.timer = setInterval(()=>{
                this.changeIndex(1);
            },3000)
        })
        this.lay.addEventListener("mouseover",()=>{
            $(this.left).stop().animate({
                "opacity":1
            });
            $(this.right).stop().animate({
                "opacity":1
            });
            clearInterval(this.timer)
        })
        this.lay.addEventListener("mouseout",()=>{
            this.timer = setInterval(()=>{
                this.changeIndex(1);
            },3000)
            $(this.left).stop().animate({
                "opacity":0
            });
            $(this.right).stop().animate({
                "opacity":0
            });
        })
    }
}
new Banner();


//热卖商品渲染
class Hotsale{
    constructor(){
        this.index = 0;
        this.hotsale = document.querySelector(".hotsale ul");
        this.pro1 = document.querySelector(".pro1 ul");
        this.pro2 = document.querySelectorAll(".pro2 .product ul")
        this.url = "http://localhost:83/xwshop/data/json.json";
        this.init();
    }

    init(){
        const that = this;
        ajax({
            url:this.url,
            success:(res)=>{
                this.res = JSON.parse(res);
                this.display();
            }
        })
    }

    display(){
        let strPro = "";
        chooseGoods(this.hotsale,{
            data:this.res,
            length:10,
            type:"show"
        });
        chooseGoods(this.pro1,{
            data:this.res,
            choose:"电器",
            type:"show"
        });

        chooseGoods(this.pro2[0],{
            data:this.res,
            choose:"电器",
            type:"buy"
        });

        chooseGoods(this.pro2[1],{
            data:this.res,
            choose:"护肤品",
            type:"buy"
        });

        chooseGoods(this.pro2[2],{
            data:this.res,
            choose:"礼品",
            type:"buy"
        });
        

        this.num = Number(this.pro1.offsetWidth/this.pro1.children[0].offsetWidth)
        this.addEvent();
        this.changePage();
    }

    addEvent(){
        let num = Math.floor(this.pro1.children[0].offsetWidth*this.pro1.children.length/this.pro1.offsetWidth)

        this.pro1.parentNode.addEventListener("click",(eve)=>{
            const e = eve || window.event;
            let target = e.target || e.srcElement;
            if(target.className == "left"){
              
                if(this.index == 0){
                    this.index = num
                }else{
                    this.index--
                }    
            }
            if(target.className == "right"){
                if(this.index == num){
                    this.index = 0
                }else{
                    this.index++
                }
            }
            this.changePage()
        })
    }

    changePage(){
        for(let i=0;i<this.pro1.children.length;i++){
            this.pro1.children[i].style.display = "none";
            for(let j=this.num*this.index;j<this.num*this.index+this.num;j++){
                if(j>=this.pro1.children.length){break};
                this.pro1.children[j].style.display = "block";
            }
        }
    }
}
new Hotsale;


class Product2{
    constructor(){
        this.index = 0;
        this.index2 = 0;
        this.tab = document.querySelector(".pro2 .tab");
        this.eff = document.querySelector(".pro2 .effect");
        this.pro2 = document.querySelectorAll(".pro2 .product ul")
        this.product = document.querySelector(".pro2 .product")
        this.url = "http://localhost:83/xwshop/data/json.json";
        this.init();
    }

    init(){
        const that = this;
        ajax({
            url:this.url,
            success:(res)=>{
                this.res = JSON.parse(res);
                this.display();
            }
        })
    }

    display(){
        chooseGoods(this.pro2[0],{
            data:this.res,
            choose:"电器",
            type:"buy"
        });

        chooseGoods(this.pro2[1],{
            data:this.res,
            choose:"护肤品",
            type:"buy"
        });

        chooseGoods(this.pro2[2],{
            data:this.res,
            choose:"礼品",
            type:"buy"
        });
        
        
        this.num = Number(this.pro2[0].offsetWidth/this.pro2[0].children[0].offsetWidth)
        this.num2 = Math.floor(240*this.pro2[0].children.length/1200)
        this.addEvent();
        this.changePage();
    }

    addEvent(){
        for(let i=0;i<this.tab.children.length;i++){
            this.tab.children[i].setAttribute("index",i)
        }
        this.tab.addEventListener("click",(eve)=>{
            const e = eve || window.event;
            let target = e.target || e.srcElement;
            if(target.nodeName == "LI"){
                this.index = parseInt(target.getAttribute("index"));
                this.index2=0;
                this.display2();
                
            }
            this.num2 = Math.floor(240*this.pro2[this.index].children.length/1200)
        })
        
        this.product.addEventListener("click",(eve)=>{
            const e = eve || window.event;
            let target = e.target || e.srcElement;
            if(target.className == "left"){
                if(this.index2 <= 0){
                    this.index2 = this.num2
                }else{
                    this.index2--
                }    
            }
            if(target.className == "right"){
                if(this.index2 >= this.num2){
                    this.index2 = 0
                }else{
                    this.index2++
                }
            }
            console.log(this.index2,this.num2)
            this.changePage()
        })
    }

    display2(){
        for(let i=0;i<this.tab.children.length;i++){
            this.pro2[i].style.display = "none";
        }

        this.pro2[this.index].style.display = "block"
        $(this.eff).stop().animate({
            marginLeft:this.tab.children[0].offsetWidth*this.index
        })
        this.changePage()
    }

    changePage(){
        for(let i=0;i<this.pro2[this.index].children.length;i++){
            this.pro2[this.index].children[i].style.display = "none";
            for(let j=this.num*this.index2;j<this.num*this.index2+this.num;j++){
                if(j>=this.pro2[this.index].children.length){break};
                this.pro2[this.index].children[j].style.display = "block";
            }
        }
    }
}
new Product2;

// opa的说明 {
//     data:               //必传，数据为数组
//     length:             //可选，默认为data数据的长度
//     choose:             //可选，默认为所有种类 可选种类有：“服饰” “护肤品” “生活用品” “电器” “礼品”
// }
function chooseGoods(ele,opa){
    opa.length = opa.length || opa.data.length;
    let str = "";
    if(opa.type == "show"){
        if(opa.choose){
            for(let i=0;i<opa.length;i++){
                if(opa.data[i].goodsMark == opa.choose){
                    str += `<li>
                    <a href="http://localhost:83/xwshop/goodsdetail.html">
                        <img src="${opa.data[i].goodsSrc}" alt=""/>
                        <p>${opa.data[i].goodsSname}</p> 
                    </a>
                    <span>${opa.data[i].goodsPrice}</span>
                </li>`
                }       
            }
        }else{
            for(let i=0;i<opa.length;i++){    
                    str += `<li>
                    <a href="http://localhost:83/xwshop/goodsdetail.html">
                        <img src="${opa.data[i].goodsSrc}" alt=""/>
                        <p>${opa.data[i].goodsSname}</p> 
                    </a>
                    <span>${opa.data[i].goodsPrice}</span>
                </li>`     
            }
        }
    }
    if(opa.type == "buy"){
        if(opa.choose){
            for(let i=0;i<opa.length;i++){
                if(opa.data[i].goodsMark == opa.choose){
                    str += `<li>
                        <img src="${opa.data[i].goodsSrc}" alt=""/>
                        <h4>${opa.data[i].goodsSname}</h4>
                        <p>该产品请选择跨境直邮的运费模</p>
                        <span>${opa.data[i].goodsPrice}</span>
                        <s>${parseFloat(opa.data[i].goodsPrice)+50}</s>
                        <input type="submit" class="buy" value="立即购买"/>
                    </li>`
                }       
            }
        }else{
            for(let i=0;i<opa.length;i++){    
                str += `<li>
                <img src="${opa.data[i].goodsSrc}" alt=""/>
                <h4>${opa.data[i].goodsSname}</h4>
                <p>该产品请选择跨境直邮的运费模</p>
                <span>${opa.data[i].goodsPrice}</span>
                <s>${parseFloat(opa.data[i].goodsPrice)+50}</s>
                <input type="submit" class="buy" value="立即购买"/>
                </li>`     
            }
        }
    }
    ele.innerHTML = str;
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

//搜索框
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

//登录状态
class Load{
    constructor(){
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
            location.reload();
            that.log.style.display = "inline";
            that.exit.style.display = "none";  
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

}





