<template>
    <div class="art" ref="lart">
      <div class="l-img h100"><img class="w100 h100" src="../../static/img/artical.jpg" alt=""></div>
      <div class="r-info h100">
        <p class="top w100">
          <span class="title">{{data.title}}</span>
        </p>
        <p class="body w100">
          <pre>{{data.introduce}}</pre>
        </p>
        <p class="footer w100">
          <span class="f-l m-r10 text"><i class="fa fa-list-alt m-r5 f-s20"></i>{{data.type == 'tel'? '文章': '新闻'}}</span>
          <span class="f-l date"><i class="fa fa-calendar m-r5"></i>{{data.date}}</span>
          <span class="f-r read"><router-link :to="`/articalShow${data.id}`">阅读本文</router-link></span>
        </p>
      </div>
    </div>
</template>

<script>
    import {mapState} from 'vuex'
    export default {
      name: "LittleArtical",
      props: ['data'],
      data(){
        return {
          scale: 937 / 261
        }
      },
      computed: {
        ...mapState(['windowWidth'])
      },
      watch:{
        windowWidth(val){
          if(val >= 950 ){
            this.$refs.lart.style.height = val * 0.94 * 0.73 / this.scale + 'px';
          }else{
            this.$refs.lart.style.height = val * 0.94 / this.scale + 'px';
          }

        }
      }
    }
</script>

<style scoped>
  .art{
    display: flex;
    justify-content: space-between;
    width:100%;
    height:15rem;
    padding:1rem;
    box-sizing:border-box;
    background-color: rgba(255,255,255,.5);
  }
  .art:hover .l-img img{
    transform:scale(1.2);
    transition:.5s;
  }
  .l-img{
    float:left;
    width:38%;
    overflow: hidden;
  }
  .r-info{
    display: flex;
    flex-direction:row;
    flex-wrap:wrap;
    align-content:space-between;
    width:59%;
  }
  .top{
    height:20%;
    white-space:nowrap;
  }
  .body{
    height:65%;
    font-size:1rem;
    text-indent:2rem;
    overflow: hidden;
    text-align:left;
  }
  .footer{
    height:10%;
  }
  .title{
    float:left;
    font-size:1.2rem;
    font-weight:bold;
  }
  .read{
    position:relative;
    transition:.5s;
    background-color:lightblue;
    padding:0 0.3rem;
    border-radius: 5px;
  }
  .read:hover{
    background-image:linear-gradient(to right, #b8cbb8 0%, #b8cbb8 0%, #b465da 0%, #cf6cc9 33%, #ee609c 66%, #ee609c 100%);
  }
  .text, .date, .read{
    font-size:.5rem !important;
  }
</style>
