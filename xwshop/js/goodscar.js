
window.onload = function(){
let onoffLog = false;

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


//购物车列表
class List{
    constructor(){
        this.loget = localStorage.getItem("goodscar");
        this.have = document.querySelector(".none-have");
        this.url = "http://localhost:83/xwshop/data/json.json";
        if(onoffLog){
            this.init();
        }else{
            let str ="";
            str = `<div class="show">
            <h4>还没有商品哦！！！</h4>
            去<a href="http://localhost:83/xwshop/index.html">首页</a>
            去<a href="http://localhost:83/xwshop/login.html">登录</a>
        </div>  `
            this.have.innerHTML = str;
        }
    }

    init(){
        ajax({
            url:this.url,
            success:(res)=>{
                this.res = JSON.parse(res)
                this.display()
            }
        })
    }

    display(){
        let str ="";
        let str2 = 0;
        this.loget = localStorage.getItem("goodscar");
        if(!this.loget){
            str = `<div class="show">
            <h4>还没有商品哦！！！</h4>
            去<a href="http://localhost:83/xwshop/index.html">首页</a>
            去<a href="http://localhost:83/xwshop/login.html">登录</a>
        </div>  `
            this.have.innerHTML = str;
        }else{
            this.loget = JSON.parse(this.loget);
            for(let i=0;i<this.res.length;i++){
                for(let j=0;j<this.loget.length;j++){
                    if(this.res[i].goodsID == this.loget[j].id){
                        str2 += (this.res[i].goodsPrice*this.loget[j].num)
                        str += `<tr xw="${this.res[i].goodsID}">
                        <td><input type="checkbox" class="check" checked/></td>
                        <td><img src="${this.res[i].goodsSrc}" alt=""></td>
                        <td>${this.res[i].goodsName}</td>
                        <td>￥${this.res[i].goodsPrice}</td>
                        <td>
                            <input type="button" name="" class="red" value="-"/>
                            <input type="text" name="" class="num" value="${this.loget[j].num}" readonly/>
                            <input type="button" name="" class="add" value="+"/>
                        </td>
                        <td class="discount">00.00</td>
                        <td>${Math.ceil(this.res[i].goodsPrice)}</td>
                        <td class="total">￥${(this.res[i].goodsPrice*this.loget[j].num).toFixed(2)}</td>
                        <td><span>收藏</span><span>|</span><span class="rem">移除</span></td>
                    </tr>`;
                    }
                }
                this.have.innerHTML = `<h3>已选择的商品</h3>
                <table>
                    <thead>
                        <th><input type="checkbox" class="check1" checked/>全选</th>
                        <th>商品</th>
                        <th>描述</th>
                        <th>销售价</th>
                        <th>数量</th>
                        <th>优惠金额</th>
                        <th>积分</th>
                        <th>小计</th>
                        <th>操作</th>
                    </thead>
                    <tbody>
                        ${str}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td>
                                <p><em >商品总金额：￥</em><span class="gAP">${(str2.toFixed(2))}</span></p>
                                <p><em >订单优惠金额：￥</em><span class="dAP">00.00</span></p>
                                <p><em>订单总金额：￥</em><span class="oAP">${(str2.toFixed(2))}</span></p>
                            </td>
                        </tr>
                        <tr>
                            <td></td>
                            <td>
                                <input type="button" value="清空购物车" class="empty">
                            </td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td>
                                <span class="continue">继续购物</span>
                            </td>
                            <td>
                                <input type="button" name="" id="" value="下单结算&gt">
                            </td>
                        </tr>
                    </tfoot>
                </table>`
            }       
        

            this.allcheck = document.querySelector("thead .check1");
            this.all = document.getElementsByClassName("check");
            this.tbody = document.querySelector("tbody");
            this.tfoot = document.querySelector("tfoot");
            this.gAP = document.querySelector("tfoot .gAP");
            this.dAP = document.querySelector("tfoot .dAP");
            this.oAP = document.querySelector("tfoot .oAP");
            this.discount = document.querySelector(".discount");
            this.total = document.querySelector(".total");
            this.addEvent();
        }
    }

    addEvent(){
        const that =this;
        let onoff = true;

        this.allcheck.onclick = function(){
            onoff = false;
            if(!that.allcheck.checked){
                for(let i=0;i<that.all.length;i++){
                    that.all[i].outerHTML = `<input type="checkbox" class="check"/></td>`
                }
                that.all = document.getElementsByClassName("check");
            }else{
                for(let i=0;i<that.all.length;i++){
                    that.all[i].outerHTML = `<input type="checkbox" class="check" checked/></td>`
                }
            }

            
            if(!onoff){
                that.all = document.getElementsByClassName("check");
                for(let i=0;i<that.all.length;i++){
                    that.all[i].onclick = function(){
                    let listnum = 0;
                    let listnum2 = 0;
                    let par = Number
                    (this.parentNode.parentNode.children[7].innerHTML.slice(1));
                    for(let j=0;j<that.all.length;j++){
                        if(that.all[j].checked){
                            listnum += Number
                            (that.all[j].parentNode.parentNode.children[7].innerHTML.slice(1))
                            listnum2 += Number
                            (that.all[j].parentNode.parentNode.children[5].innerHTML)
                            
                        }
                    }
                    that.gAP.innerHTML = listnum
                    that.dAP.innerHTML = listnum2
                    that.oAP.innerHTML = (listnum-listnum2)
        
                }
            }
            }
        }

        if(onoff){
            for(let i=0;i<this.all.length;i++){
                this.all[i].onclick = function(){
                let listnum = 0;
                let listnum2 = 0;
                let par = Number
                (this.parentNode.parentNode.children[7].innerHTML.slice(1));
                for(let j=0;j<that.all.length;j++){
                    if(that.all[j].checked){
                        listnum += Number
                        (that.all[j].parentNode.parentNode.children[7].innerHTML.slice(1))
                        listnum2 += Number
                            (that.all[j].parentNode.parentNode.children[5].innerHTML)
                        
                    }
                }
                that.gAP.innerHTML = listnum;
                that.dAP.innerHTML = listnum2;
                that.oAP.innerHTML = (listnum-listnum2);
            }
        }
        }

        //可选，需更换input标签
        // this.tbody.addEventListener("input",function(eve){
        //     const e = eve || window.event;
        //     let target = e.target || e.srcElement;
        //     if(target.className == "num"){
        //         that.id = target.parentNode.parentNode.getAttribute("xw");
        //         that.conNum = target.value;
        //         that.setLo();
        //     }
        // })    


        this.tbody.addEventListener("click",function(eve){
            const e = eve || window.event;
            let target = e.target || e.srcElement;
            if(target.className == "red"){
                if(target.nextElementSibling.value == 1){
                    target.nextElementSibling.value = 1 
                }else{
                    target.nextElementSibling.value--                
                }
                that.id = target.parentNode.parentNode.getAttribute("xw")
                that.conNum = target.nextElementSibling.value
                that.setLo();
            }
            
            if(target.className == "add"){
                that.id = target.parentNode.parentNode.getAttribute("xw");
                target.previousElementSibling.value++;
                that.conNum = target.previousElementSibling.value          
                that.setLo();   
            }
            if(target.className == "rem"){
                that.id = target.parentNode.parentNode.getAttribute("xw");
                that.remLo();
            }
        })

        this.tfoot.addEventListener("click",function(eve){
            const e = eve || window.event;
            let target = e.target || e.srcElement;
            if(target.className == "empty"){
                localStorage.setItem("goodscar",[])
                that.display()  
            }
            if(target.className == "continue"){
                location.href = "http://localhost:83//xwshop/index.html" 
            }
        })        
    }

    remLo(){
        console.log(this.loget,this.id)
        for(let i=0;i<this.loget.length;i++){
            if(this.id == this.loget[i].id){
                this.loget.splice(i,1);
            }
        }
        localStorage.setItem("goodscar",JSON.stringify(this.loget))
        this.display();

    }

    setLo(){
        for(let i=0;i<this.loget.length;i++){
            if(this.id == this.loget[i].id){
                this.loget[i].num = this.conNum;
            }
        }
        localStorage.setItem("goodscar",JSON.stringify(this.loget))
        this.display();
    }

    

}
new List;

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