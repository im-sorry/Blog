<template>
  <div class="show w100 d-fx">
    <div class="first" :class="{w100: !secondShow}" v-if="show">
      <h3 class="title">{{data.title}}</h3>
      <p class="date">{{data.date}}    {{data.time}}</p>
      <div class="text"><pre><xmp v-text="text()"></xmp></pre></div>
    </div>
    <secondList class="second"></secondList>
  </div>
</template>

<script>
  import secondList from '@/components/secondList/'
  import {mapState} from 'vuex'
    export default {
        name: "articalShow",
        data(){
          return {
            show: false,
            data: null
          }
        },
        components: {
          secondList
        },
        methods: {
          text(){
            // return this.data.text.replace(/(\*+)(?=\r\n)/g, ($, $1) => {
            //   return `<p>${$1}</p>`;
            // });
            return this.data.text;
          }
        },
        created(){
          this.$axios.get(this.$host + `/getArtical?id=${this.$route.params['id']}`).then(data => {
            this.data = data.data;
            this.show = true;
          });
          window.scrollTo(0, 0);
        },
        beforeRouteEnter(to, from, next){
          let backgroundImage = " linear-gradient(132deg, #F4D03F 0%, #16A085 100%)",
              backgroundColor = '#F4D03F',
              backgroundRepeat = " no-repeat",
              backgroundAttachment = " fixed";
          document.body.style.background = backgroundColor+ backgroundImage + backgroundRepeat + backgroundAttachment;
          next();
        },
        computed: {
          ...mapState(['secondShow'])
        }
    }
</script>

<style scoped>
  .title{
    width:100%;
    text-align:center;
    font-size:2rem;
  }
  .date{
    text-align:right;
  }
  .text{
    box-sizing:border-box;
    padding-left:7rem;
    padding-right:3rem;
    font-size:16px;
  }
  .text > p{
    margin-top:.5rem;
  }
</style>
