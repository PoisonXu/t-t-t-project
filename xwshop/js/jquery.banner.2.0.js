;(function($){
    "use strict";

    // 没有操作到页面，只是实现了某个功能，比如ajax，cookie，这种适合使用jq的全局方法
    // $.extend()
    // $.liyang = function(){}
    
    // 有操作到页面，比如css，load，attr，width，这种适合使用jq的局部（DOM）方法
    // $.fn.extend()
    // $.fn.liyang = function(){}

    $.fn.extend({
        banner:function(options){
            // 当前被绑定到jq的DOM对象上的方法内的this，指向当前方法被调用时，选择的jq的DOM元素
            // console.log(this)

            var bannerObj = {
                // index在list的功能中表示要走的
                // index在btn的功能中表示要进来的
                index:0,
                // iPrev在btn中表示要走的
                iPrev:options.items.length-1
            };

            // options.items
            // left和right不用处理默认参数。有就做，没有就不做
            if(options.list == undefined || options.list == true){
                bannerObj.list = true;
            }else{
                bannerObj.list = false;
            }

            if(options.autoPlay == undefined || options.autoPlay == true){
                bannerObj.autoPlay = true;
            }else{
                bannerObj.autoPlay = false;
            }

            bannerObj.delayTime = options.delayTime || 2000; 
            bannerObj.moveTime = options.moveTime || 200; 

            // list的功能
            if(bannerObj.list){
                // L1.生成布局
                var $ul = $("<ul>");
                for(var i=0;i<options.items.length;i++){
                    $ul.append($("<li>"+ (i+1) +"</li>"))
                }
                this.append($ul)
                $ul.css({
                    width:"100%",
                    height:30,
                    lineHeight:"30px",
                    display:"flex",
                    position:"absolute",
                    bottom:0,
                    background:"rgba(200,200,200,0.6)",
                    margin:0,
                    padding:0
                }).children("li").css({
                    flex:"1",
                    textAlign:"center",
                    listStyle:"none",
                    borderLeft:"solid 1px black",
                    borderRight:"solid 1px black"
                }).eq(bannerObj.index).css({
                    background:"red"
                })

                // L2.给list的li绑定事件
                $ul.children("li").on("click",function(){
                    // L3-1.点击的比当前大，左
                    if($(this).index() > bannerObj.index){
                        // console.log("left")
                        // L4-1.执行向左移动
                        bannerObj.listMove($(this).index(),1)
                    }
                    // L3-2.点击的比当前小，右
                    if($(this).index() < bannerObj.index){
                        // console.log("right")
                        // L4-2.执行向右移动
                        bannerObj.listMove($(this).index(),-1)
                    }

                    // L5.一次点击之后，本次点击的就是下次的当前
                    bannerObj.index = $(this).index();
                    // L6.设置li的当前项
                    $(this).css({
                        background:"red"
                    }).siblings().css({
                        background:""
                    })
                })
                // list的move功能
                bannerObj.listMove = function(iNow,type){
                    options.items.eq(bannerObj.index).css({
                        left:0
                    }).stop().animate({
                        left:-options.items.eq(0).width() * type
                    },bannerObj.moveTime)
                    options.items.eq(iNow).css({
                        left:options.items.eq(0).width() * type
                    }).stop().animate({
                        left:0
                    },bannerObj.moveTime)
                }

                

            }


            function rightClick(){
                // B3-2.计算索引，要走的和要进来的
                if(bannerObj.index == options.items.length-1){
                    bannerObj.index = 0;
                    bannerObj.iPrev = options.items.length-1;
                }else{
                    bannerObj.index++;
                    bannerObj.iPrev = bannerObj.index - 1
                }
                // B4-2.开始移动向左移动
                bannerObj.btnMove(1)
            }
            function leftClick(){
                // B3-1.计算索引，要走的和要进来的
                if(bannerObj.index == 0){
                    bannerObj.index = options.items.length-1;
                    bannerObj.iPrev = 0
                }else{
                    bannerObj.index--;
                    bannerObj.iPrev = bannerObj.index + 1;
                }
                // B4-1.开始移动向右移动
                bannerObj.btnMove(-1)
            }
            // btn移动的功能
            bannerObj.btnMove = function(type){
                options.items.eq(bannerObj.iPrev).css({
                    left:0
                }).stop().animate({
                    left:-options.items.eq(0).width() * type
                },bannerObj.moveTime)
                options.items.eq(bannerObj.index).css({
                    left:options.items.eq(0).width() * type
                }).stop().animate({
                    left:0
                },bannerObj.moveTime)
                
                if(bannerObj.list){
                    // 设置li的当前项
                    $ul.children("li").css({
                        background:""
                    }).eq(bannerObj.index).css({
                        background:"red"
                    })
                }
            }

            // B1.判断是否传入左右按钮
            // console.log(options.left)
            if(options.left != undefined && options.left.length != 0 && options.right != undefined && options.right.length != 0){
                // B2-1.绑定事件
                options.left.on("click",leftClick)
                // B2-2.绑定事件
                options.right.on("click",rightClick)
            }

            // A1.判断是否自动播放
            if(bannerObj.autoPlay){
                // A2.开启计时器，模拟右键执行，实现自动播放
                bannerObj.timer = setInterval(() => {
                    rightClick()
                }, bannerObj.delayTime);
                // A3.给大框加鼠标进入和离开事件，进入停止，离开继续
                this.hover(function(){
                    clearInterval(bannerObj.timer)
                },function(){
                    bannerObj.timer = setInterval(() => {
                        rightClick()
                    }, bannerObj.delayTime);
                })
            }
        }
    })

})(jQuery);