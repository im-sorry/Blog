<template>
    <div class="second" v-show="secondShow">
      <myinfo></myinfo>
      <recommend class="recommend"></recommend>
    </div>
</template>

<script>
    import myinfo from '@/components/myinfo/'
    import recommend from '@/components/recommend/'
    import {mapState} from 'vuex'

    export default {
      name: "secondList",
      components: {
        myinfo,
        recommend
      },
      computed: {
        ...mapState(['secondShow'])
      }
    }
</script>

<style scoped>
  .recommend{
    width:100%;
    margin-top:2rem;
  }
</style>
