<template>
	<div class="index d-fx">
		<div class="first" :class="{w100: !secondShow}">
			<banner class="banner"/>
      <lart v-for="(i, index) in data" :data="i" class="lart" :key="index" v-if="flag"></lart>
      <div v-show="moreInfo">
        <lart v-for="(i, index) in moreData" :data="i" class="lart" :key="index"></lart>
      </div>
      <div class="more" v-if="!moreInfo"><span @click="moreInfo = true">加载更多...</span></div>
		</div>
    <secondList class="second"></secondList>
	</div>
</template>

<script>
	import banner from '@/components/banner/'
	import secondList from '@/components/secondList/'
  import lart from '@/components/LittleArtical/'
  import {mapState} from 'vuex'

	export default {
		name: 'index',
		components: {
			banner,
			secondList,
      lart,
		},
    data(){
		  return {
		    data: [],
        flag:false,
        moreData: [],
        moreInfo: false
      }
    },
    mounted(){
      this.$emit('viewId', 0);
    },
    methods:{
		  getRandomArr(num, max){
		    let arr = [];
		    for(let i = 0; i < num; i++){
		      arr.push(~~(Math.random()*max));
        }
        return [...new Set(arr)];
      }
    },
    computed:{
      ...mapState(['secondShow'])
    },
    created(){
		  async function getData(vm){
		    await vm.$axios.get(vm.$host + '/getAllArtical').then((data) => {
		      let len = data.data.length,
              indexs = vm.getRandomArr((len / 2) % 6, data.data.length);
          vm.data = data.data.filter((item, index) =>{
            return indexs.findIndex(item => item === index) !== -1;
          });
          vm.moreData = data.data.filter((item, index) => {
            return indexs.findIndex(item => item === index) === -1;
          });
        });
        vm.flag = true;
      }
		  getData(this);
    },
    beforeRouteEnter(to, from, next){
      let backgroundImage = "linear-gradient(to top, #3f51b1 0%, #5a55ae 13%, #7b5fac 25%, #8f6aae 38%, #a86aa4 50%, #cc6b8e 62%, #f18271 75%, #f3a469 87%, #f7c978 100%)",
      backgroundRepeat = " no-repeat",
      backgroundAttachment = " fixed";
      document.body.style.background = backgroundImage + backgroundRepeat + backgroundAttachment;
      next();
    },
    beforeRouteLeave(to, from ,next){
      next();
    }
	}
</script>

<style scoped>
	.index{
    position:relative;
		width:100%;
    text-align:center;
	}
  .lart{
    margin-top:1.5rem;
  }
  .more{
    margin:30px;
    transition:.3s;
  }
  .more span:hover{
    color:lightcoral;
    cursor:pointer;
  }
</style>
