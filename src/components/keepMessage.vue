<template>
    <div class="keep">
      <div class="menu" ref="menu">
        <ul ref="oul">
          <li v-for="(item, index) in iclass" :data-i="index"><i :class="item"></i>{{texts[index]}}</li>
        </ul>
      </div>
      <div class="tags" ref="tags">
        <div class="tag" v-for="item in tags" :style="produceCss(item.x, item.y).tag">
          <div contenteditable="true" :style="produceCss(item.x, item.y).txt">
            <textarea class="w100 h100" v-model="item.msg"></textarea>
          </div>
        </div>
        <div class="tag" v-for="item in oldTags" :style="produceCss(item.x, item.y).tag">
          <div :style="produceCss(item.x, item.y).txt">
            <xmp>{{item.msg}}</xmp>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
        name: "keepMessage",
      data(){
        return {
          background: "",
          timer: 0,
          canvas: null,
          iclass: ['fa fa-th-large','fa fa-edit', 'fa fa-cogs', 'fa fa-trash','fa fa-refresh', 'fa fa-retweet'],
          texts: ['添加应用','添加留言','发布本次留言','删除本次留言','刷新','更换背景'],
          tags:[],
          oldTags:[],
          pos: {x:0, y:0}
        }
      },
      mounted(){
        this.$emit('viewId', 5);
        this.background = document.body.style.background;
        document.body.style.background = "black";
        const _this = this;
        (function(doc, win){
          let canvas = doc.querySelector('canvas');
          if(canvas == null){
            canvas = doc.createElement('canvas');
            doc.body.appendChild(canvas);
          }
          _this.canvas = canvas;
          let width = canvas.width = win.innerWidth,
            height = canvas.height = win.innerHeight,
            ctx = canvas.getContext('2d');
          let numsOfDots = 500,
            array = [],
            maxr = 2.5,//最大半径
            minr = 0.9,//最小半径
            flashTime = 100,//闪烁时间
            maxalpha = 1,//最大亮度
            minalpha = 0.5,//最小亮度
            chance = 0.3,//闪烁的几率
            centerX = width / 2,
            centerY = height / 2;
          function run(){
            clear(ctx);
            array.forEach(item => {
              item.draw(ctx);
            });
            flashTime = randomTime();
            _this.timer = setTimeout(run, flashTime);
            //requestAnimationFrame(run);
          }
          function Dot(conf){
            Object.assign(this, {flag: false, alpha: minalpha, step: 0.1}, conf);
          }
          Dot.prototype.draw = function(ctx){
            let flag = Math.random() < chance,
              color = "",
              alpha = 0;
            if(this.flag){
              this.alpha += this.step;
              if(this.alpha >= maxalpha || this.alpha <= minalpha){
                this.step = -this.step;
              }
              if(this.alpha <= minalpha){
                this.flag = false;
              }
              alpha = this.alpha;
            }else{
              this.flag = flag;
              alpha = 0.3;
            }
            color = `rgba(${this.R},${this.G},${this.B},${alpha})`;
            //this.computedPos();
            ctx.save();
            ctx.beginPath();
            ctx.fillStyle = color;
            ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
            ctx.fill();
            ctx.closePath();
            ctx.restore();
          };
          function createDots(){
            for(let i = 0; i < numsOfDots; i++){
              array.push(new Dot(randomData()))
            }
          }
          function randomTime(){
            return Math.floor(Math.random()*100) + 100;
          }
          function randomData(){
            let r = minr + Math.floor(Math.random()*(maxr - minr)),
                x = Math.max(0, Math.floor(Math.random()*(width - r))),
                y = Math.max(0, Math.floor(Math.random()*(height - r))),
            R = Math.floor(Math.random()*256),
            G = Math.floor(Math.random()*256),
            B = Math.floor(Math.random()*256);
            return {r, x, y, R, G, B};
          }
          function clear(ctx){
            ctx.clearRect(0,0, width, height);
          }
          createDots();
          run();
        })(document, window);
        this.bind(this);
        this.$refs.tags.onmousedown = function(e){
          if(e.target == this || e.which !== 1)return;
          let obj = e.target;
          obj = obj.classList.contains("tag")? obj : obj.parentNode;
          document.onmousemove = function(e){
            obj.style.left = e.clientX - obj.offsetWidth / 2 + 'px';
            obj.style.top =  e.clientY - obj.offsetHeight / 2 + 'px';
          }
          document.onmouseup = function(e){
            document.onmousemove = null;
          }
        };
        this.$axios.get(this.$host + '/getAllTags').then(data => {
          this.oldTags = data.data;
        })
      },
      methods: {
        bind(_this){
          document.body.style.overflow = "hidden";
          document.oncontextmenu = function(){
            return false;
          };
          document['onmousedown'] = function(e) {
            if(e.which === 3){
              _this.prevent(e);
              _this.pos.x = e.clientX;
              _this.pos.y = e.clientY;
              _this.$refs.menu.style.cssText = `visibility:visible;left:${e.clientX}px;top:${e.clientY}px`;
            }else{
              _this.$refs.menu.style.visibility = "hidden";
            }
          };
          _this.$refs.oul.onmousedown = function(e){
            if(e.which !== 1)return;
            const i = e.target.dataset.i;
            switch(i){
              case '0':
                break;
              case '1':
                _this.tags.push({x:_this.pos.x, y: _this.pos.y, msg: ""});
                break;
              case '2':
                _this.subTag();
                break;
              case '3':
                _this.tags.splice(0, _this.lengthOfTags);
                break;
              case '4':
                window.location.reload();
                break;
              case '5':
                break;
            }
          }
        },
        unbind(){
          document.body.style.overflow = "";
          document.oncontextmenu = null;
          document.onmousedown = null;
        },
        prevent(e){
          e.preventDefault();
          e.stopPropagation();
        },
        produceCss(x, y){
          let tag = `position:absolute;left:${x}px;top:${y}px;z-index:20;width:230px;height:152px;background:url(../../static/img/tag.png) no-repeat center/cover`;
          let txt = `width:50%;height:49%;margin:40px auto;`;
          return {tag, txt}
        },
        subTag(){
          this.$axios.post(this.$host + '/addTag', this.tags, {
            headers: {
              'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8',
            }
          }).then(data => {
            if(data.status !== 200)throw new Error("发送留言出现错误");
            this.oldTags = [...this.oldTags, ...this.tags.splice(0, this.lengthOfTags)];
          });
        }
      },
      computed: {
          lengthOfTags(){
            return this.tags.length;
        }
      },
      beforeRouteLeave(to, from ,next){
          document.body.style.background = this.background;
          clearTimeout(this.timer);
          document.body.removeChild(this.canvas);
          this.unbind();
          next();
      }
    }
</script>

<style scoped>
  .menu{
    position:absolute;
    visibility:hidden;
    width:175px;
    border:1px solid rgb(243,243,243);
    background-color:rgb(243,243,243);
    transition:.5s;
  }
  .menu li{
    position:relative;
    width:100%;
    height:35px;
    line-height:35px;
    text-align:center;
    cursor:pointer;
  }
  .menu li + li{
    border-top:1px solid
  }
  .menu li:hover{
    background-color:skyblue;
  }
  .menu li i{
    position:absolute;
    top:11px;
    left:15px;
  }
  .tag{
    postition:absolute;
    display: flex;
    align-items:center;
    justify-content:center;
    width:175px;
    height:116px;
    background:url(../../static/img/tag.png);
  }
  .tag .text{
    width:75%;
    height:75%;
  }
</style>
