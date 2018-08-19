<template>
	<div class="ad">
    <i class="fa fa-commenting f-s20 m-t7"></i>
		<ul class="slider" ref="slider" v-if="flag">
			<li v-for="item in data">
				<router-link :to="{name:'articalShow', params: {id: item.id}}">{{item.title}}</router-link>
			</li>
		</ul>
	</div>
</template>

<script>
  import bus from '../bus'

	export default {
		name: 'ad',
		data(){
			return {
				data: [],
        flag: false
			}
		},
		methods: {
			run(tag, height){
				(function f(){
					let top = tag.offsetTop;
					if(top <= -height){
						tag.style.top = "0";
						tag.appendChild(tag.firstElementChild);
						setTimeout(f, 3000);
					}else{
						tag.style.top = top - 1 + "px";
						setTimeout(f, 15)
					}
				})()
			}
		},
    watch: {
		  flag(val, oldval){
        if(val){
          this.$nextTick(() => {
            this.run(this.$refs.slider, this.$refs.slider.firstElementChild.offsetHeight);
          });
        }
      }
    },
    created(){
		  const _this = this;
		  bus.$on('adNews', data => {
		    _this.data = data;
		    _this.flag = true;
      });
    },
	}
</script>

<style scoped>
	.ad li{
		width:15rem;
		font-size:0.8rem;
    height:2rem;
    line-height:2rem;
	}
	ul{
		position:absolute;
		top:0;
		left:1rem;
	}
	.ad{
		position:relative;
		overflow:hidden;
    width:94%;
    height:2rem;
    margin:auto;
	}
	a:hover{
		color:rgb(79, 79, 200);
		transition:.3s;
	}
</style>
