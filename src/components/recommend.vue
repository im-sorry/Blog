<template>
	<div class="recommend" v-if="flag">
		<div class="top">
			<span :class="{hots}" @mouseenter="(hots = true,  recommends = false, commens = false)">热门</span>
			<span :class="{recommends}" @mouseenter="(hots = false, recommends = true , commens = false)">推荐</span>
			<span :class="{commens}" @mouseenter="(hots = false, recommends = false, commens = true)">热评</span>
		</div>
		<div class="hots" v-show="hots">
			<p v-for="(item, index) in data.hots">
				<span class="rank">{{index + 1}}</span><router-link :to="{name: 'articalShow', params: {id: item.id}}">{{item.title}}</router-link>
			</p>
		</div>
		<div class="recommends" v-show="recommends">
			<p v-for="(item, index) in newData">
				<span class="rank">{{index + 1}}</span><router-link :to="{name: 'articalShow', params: {id: item.id}}">{{item.title}}</router-link>
			</p>
		</div>
		<div class="commens" v-show="commens">
			<p v-for="(item, index) in data.commens">
				<span class="rank">{{index + 1}}</span><router-link :to="{name: 'articalShow', params: {id: item.id}}">{{item.title}}</router-link>
			</p>
		</div>
	</div>
</template>

<script>
  import bus from '../bus'
	export default {
		name: 'index',
		data(){
			return {
				hots: true,
				recommends: false,
				commens: false,
        data: [],
        flag: false
			}
		},
		methods: {
			mouseenter(e){
				let tar = e.target;
				tar.className="on";
			},
		},
    created(){
      async function getData(vm){
        await vm.$axios.get(vm.$host + '/getRecommend').then((data) => {
          vm.data = data.data;
          vm.flag = true;
          bus.$emit('adNews', vm.data.hots);
        });
      }
      getData(this);
    },
    computed: {
		  newData(){
		    return this.data.recommends.reverse();
      }
    }
	}
</script>

<style scoped>
	.recommend{
		height:21rem;
		font-size:1rem;
		background-color:rgba(255,255,255,.5);
		box-shadow:-5px 5px 10px 1px #333;
		perspective:1000px;
	}
	.top{
		display: flex;
		justify-content: space-between;
		height:3rem;
	}
	.top span{
		position:relative;
		flex-grow: 1;
		border-top:2px solid transparent;
		background-color:rgba(230,230,230 ,.8);
		text-align:center;
		line-height:3rem;
		transition:.3s;
	}
  .top span:after{
    position:absolute;
    content:'';
    top:0;
    width:0;
    height:2px;
    left:100%;
    transition:.5s;
    background-color:red;
  }
  .top span:hover:after{
    left:0;
    width:100%;
  }
	span.hots, span.recommends, span.commens{
    background-color:transparent;
	}
  .top span:hover ~ span:after{
    left:0;
  }
	div{
		width:100%;
		height:18rem;
    transition:.5s;
	}
	.rank{
		margin-right:1rem;
		padding:0 .4rem;
		transition:.3s;
		background-color:rgb(111,171,183);
	}
	div p{
		width:100%;
    max-width: 285px;
		height:1.5rem;
		text-align: left;
		line-height: 1.5rem;
		margin-top:.4rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
	}
	div p:hover .rank{
		margin-right:2rem;
	}
	div p:nth-child(-n + 3) .rank{
		background-color: red;
	}
  .hots, .recommends, .commens{
    box-sizing:border-box;
    padding-right:.5rem;
    padding-left:1rem;
  }
</style>
