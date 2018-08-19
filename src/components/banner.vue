<template>
	<div class="wrapper p-r" ref="wrapper">
		<ul class="slider w100 h100" ref="s">
			<li v-for="item in data" class="slider-item w100 h100">
				<router-link :to="item.img" class="w100 h100"><img :src="item.img" alt="" class="h100 w100"></router-link>
				<div class="msg">{{item.msg}}</div>
			</li>
		</ul>
		<div class="pagination" ref="p">
			<span v-for="n in num" class="pagination-bullet" :data-i="n - 1" id="pa-bu"></span>
		</div>
    <div class="btn btn-l p-a" @click="btnHandler(1)"><i class="fa fa-hand-o-left"></i></div>
    <div class="btn btn-r p-a" @click="btnHandler(2)"><i class="fa fa-hand-o-right"></i></div>
	</div>
</template>

<script>
	export default {
		name: 'banner',
		data(){
			return {
				data: [
					{
						img: "/static/img/banner1.jpg",
						msg: "这里是图片简介"
					},
					{
						img: "/static/img/banner2.jpg",
						msg: "这里是图片简介"
					},
					{
						img: "/static/img/banner3.jpg",
						msg: "这里是图片简介"
					}
				],
				index: 0,
        width: 0,
        timer: null,
        timerP: null
			}
		},
		computed: {
			num(){
				return this.data.length;
			}
		},
    watch:{
		  width(val){
        //920/400
		    this.$refs.wrapper.style.height = val * 400 / 920 + 'px';
      },
      index(val, oldval){
        let tag = this.$refs.s,
            pagination = this.$refs.p,
            childs = tag.children;
        childs[oldval].style.opacity = "0";
        childs[oldval].style.zIndex = "1";
        pagination.children[oldval].className="pagination-bullet";
        childs[val].style.opacity = "1";
        childs[val].style.zIndex = "2";
        pagination.children[val].className="pagination-bullet pagination-bullet-active";
      }
    },
		methods: {
			run(){
        let _this = this;
        function f(){
          _this.index = (_this.index + 1)%_this.num;
          _this.timer = setTimeout(f, 2000);
        }
        f();
			},
      stopRun(){
			  clearTimeout(this.timer);
			  clearTimeout(this.timerP);
			  this.timerP = setTimeout(this.run.bind(this), 2000);
      },
      btnHandler(type){
			  this.stopRun();
			  switch(type){
          case 1:
            this.index = (this.index -1 + this.num) % this.num;
            break;
          case 2:
            this.index = (this.index + 1) % this.num;
            break;
        }
      },
      resize(){
        this.width = this.$refs.wrapper.offsetWidth;
      }
		},
		mounted(){
      let wrapper = this.$refs.wrapper,
          _this = this;
      this.$refs.p.style.width = this.num * this.$refs.p.firstElementChild.offsetWidth + "px";
			this.run();
      this.width = wrapper.offsetWidth;
			window.addEventListener('resize', this.resize, false);
			wrapper.addEventListener('click', function(e){
			  _this.stopRun();
			  let tar = e.target;
			  if(tar.id == 'pa-bu'){
			    _this.index = +tar.dataset.i;
        }
      }, false);
		},
    beforeDestroy(){
      window.removeEventListener('resize', this.resize);
    },
	}
</script>

<style scoped>
	.wrapper{
		position:relative;
		width:100%;
		height:25rem;
		overflow:hidden;
	}
	.slider{
		position:relative;
	}
	.slider, .slider-item, router-link, img{
    width:100%;
    height:100%;
	}
	li{
    position:absolute;
    left:0;
    top:0;
    transition:.5s;
    z-index:1;
	}
	.msg{
		position:absolute;
		top:0;
		left:0;
		font-size:1rem;
	}
	.pagination{
		position:absolute;
		bottom:0;
		right:0;
		display: flex;
		justify-content:space-between;
    z-index:3;
	}
	.pagination-bullet{
		display: block;
		width:1rem;
		height:1rem;
		border-radius:50%;
		background-color: white;
    cursor:pointer;
	}
	.pagination-bullet-active{
		background-color:yellow;
	}
  .btn{
    top:0;
    bottom:0;
    width:35px;
    height:50px;
    margin:auto;
    color:honeydew;
    font-size:30px;
    text-align:center;
    line-height:50px;
    z-index:2;
    opacity:0;
    cursor:pointer;
    transition:.3s;
  }
  .btn:hover{
    color:blueviolet;
  }
  .btn-l{
    left:0;
  }
  .btn-r{
    right:0;
  }
  .wrapper:hover .btn{
    opacity:1;
  }
</style>
