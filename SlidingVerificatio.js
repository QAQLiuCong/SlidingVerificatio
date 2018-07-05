
        (function(window,document,undefined){
            var dog = {//声明一个命名空间，或者称为对象
                $:function(id){
                return document.querySelector(id);
                },
                on:function(el,type,handler){
                el.addEventListener(type,handler,false);
                },
                off:function(el,type,handler){
                el.removeEventListener(type,handler,false);
                }
            };  
            //封装一个滑块类
            function Slider(){
                var args = arguments[0];
                for(var i in args){
                    this[i] = args[i];  //一种快捷的初始化配置
                }
                //直接进行函数初始化，表示生成实例对象就会执行初始化
                this.init();
            }
            Slider.prototype = {
            constructor:Slider,
            init:function(){
                this.getDom();
                this.dragBar(this.handler);
            },
            getDom:function(){
                this.slider = dog.$('#'+this.id);
                this.handler = dog.$('.handler');
                this.bg = dog.$('.drag_bg');
            },
            complete:function () {

            },
            dragBar:function(handler){
                var that = this,
                    startX = 0,
                    lastX = 0,
                    doc = document,
                    width = this.slider.offsetWidth,
                    max = width - handler.offsetWidth,
                    drag = {
                        down:function(e){
                            var e = e||window.event;
                            that.slider.classList.add('unselect');
                            startX = e.clientX - handler.offsetLeft;
                            // console.log('startX: '+startX+' px');
                            dog.on(doc,'mousemove',drag.move);
                            dog.on(doc,'mouseup',drag.up);
                            return false;
                        },
                        move:function(e){
                            var e = e||window.event;
                            lastX = e.clientX - startX;
                            lastX = Math.max(0,Math.min(max,lastX)); //这一步表示距离大于0小于max，巧妙写法
                            // console.log('lastX: '+lastX+' px');
                            if(lastX>=max){
                                handler.classList.add('handler_ok_bg');
                                that.slider.classList.add('slide_ok');
                                dog.off(handler,'mousedown',drag.down);
                                drag.up();
                                that.complete();
                            }
                            that.bg.style.width = lastX + 'px';
                            handler.style.left = lastX + 'px';
                        },
                        up:function(e){
                            var e = e||window.event;
                            that.slider.classList.remove('unselect');
                            if(lastX < width){                         
                            that.bg.classList.add('ani');
                            handler.classList.add('ani');
                            that.bg.style.width = 0;
                            handler.style.left = 0;
                            setTimeout(function(){
                                that.bg.classList.remove('ani');
                                handler.classList.remove('ani');
                            },300);

                            }
                            dog.off(doc,'mousemove',drag.move);
                            dog.off(doc,'mouseup',drag.up);
                            
                        }
                    };

                dog.on(handler,'mousedown',drag.down);
            }
            };

            window.S = window.Slider = Slider;

        })(window,document);
