window.onload = function(){
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
    







}