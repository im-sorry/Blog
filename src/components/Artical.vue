<template>
    <div v-if="flag" class="d-fx">
      <div class="first" :class="{w100: !secondShow}">
        <lart v-for="(item, index) in data" :data="item" :key="index" class="art"></lart>
      </div>
      <secondList class="second"></secondList>
    </div>
</template>

<script>
    import lart from '@/components/LittleArtical/'
    import secondList from '@/components/secondList/'
    export default {
      name: "Artical",
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
      created(){
        this.$emit('viewId', 1);
        const _this = this;
        this.$axios.get(_this.$host + '/getAllArtical?type=tel').then((data) => {
          _this.data = data.data;
          _this.flag = true;
        });
      },
      components: {
        lart,
        secondList
      },
      beforeRouteEnter(to, from, next){
        let backgroundImage = "linear-gradient(-45deg, #231557 0%, #44107A 29%, #FF1361 67%, #FFF800 100%)",
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
.art{
  margin-bottom:1.5rem;
}
</style>
