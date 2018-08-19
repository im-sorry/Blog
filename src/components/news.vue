<template>
  <div v-if="flag" class="d-fx">
    <div class="first" :class="{w100: !secondShow}">
      <lart v-for="(item, index) in data" :data="item" :key="index" class="art"></lart>
    </div>
    <router-view></router-view>
    <secondList class="second"></secondList>
  </div>
</template>

<script>
  import lart from '@/components/LittleArtical/'
  import secondList from '@/components/secondList/'
  export default {
    name: "news",
    data(){
      return {
        data:[],
        flag: false
      }
    },
    computed: {
      secondShow(){
        return this.$store.state.secondShow;
      }
    },
    methods: {
    },
    mounted(){
      this.$emit('viewId', 2);
      const _this = this;
      this.$axios.get(_this.$host + '/getAllArtical?type=news').then((data) => {
        _this.data = data.data;
        _this.flag = true;
      });
    },
    components: {
      lart,
      secondList
    },
    beforeRouteEnter(to, from, next){
      let backgroundImage = " linear-gradient(-47deg, #4158D0 0%, #50b6c8 46%, #FFCC70 100%)",
        backgroundColor = '#4158D0',
        backgroundRepeat = " no-repeat",
        backgroundAttachment = " fixed";
      document.body.style.background = backgroundColor+ backgroundImage + backgroundRepeat + backgroundAttachment;
      next();
    },
  }
</script>

<style scoped>
  .art{
    margin-bottom:1.5rem;
  }
</style>
