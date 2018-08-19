<template>
  <div id="app">
    <div class="top" :class="{hidden: topHide}" ref="top">
      <div class="time">
        <span class="left">
          <pre>{{`Hi, ${timeStr}!&nbsp;&nbsp;&nbsp;&nbsp;今天是:  ${timeDate.year}年${timeDate.month}月${timeDate.date}日&nbsp;&nbsp;&nbsp; 星期${transDay(timeDate.day)}`}}</pre>
        </span>
        <span class="right">
          <pre>{{time}}</pre>
        </span>
      </div>
      <div class="nav w100">
        <div class="box h100">
          <div class="logo" v-show="secondShow"></div>
          <ul ref="nav" class="h100" :class="{w100:!secondShow, jst:!secondShow}">
            <router-link to="/">
              <li @click="clickME">
                <i class="fa fa-home m-r5"></i>首页
              </li>
            </router-link>
            <router-link to="/artical">
              <li @click="clickME">
                <i class="fa fa-file-text m-r5"></i>好文章
              </li>
            </router-link>
            <router-link to="/news">
              <li @click="clickME">
                <i class="m-r5 fa fa-hacker-news"></i>新鲜新闻
              </li>
            </router-link>
            <router-link to="/summery">
              <li @click="clickME" class="goTop">
                <i class="m-r5 fa fa-pencil"></i>学习路程
              </li>
            </router-link>
            <router-link to="/onlineChat">
              <li @click="clickME" class="goTop">
                <i class="m-r5 fa fa-comments"></i>一起来聊天
              </li>
            </router-link>
            <router-link to="/keepMessage">
              <li @click="clickME">
                <i class="m-r5 fa fa-bookmark"></i>留言板
              </li>
            </router-link>
          </ul>
          <search class="ser"></search>
        </div>
      </div>
      <ad class="ad"/>
      <div class="hop" @click="hop" ref="Hop"><span><</span></div>
    </div>
    <div class="router">
        <loading v-show="loadingState" id="loading"></loading>
        <router-view v-if="!loadingState" @viewId="viewId" @hide="hiden"/>
    </div>
    <footer v-if="footShow">
      <p>许可证编号: 吉ICP备18003136</p>
    </footer>
  </div>

</template>

<script>
import ad from '@/components/ad/'
import loading from '@/components/loading/'
import search from '@/components/search/'
import {mapState, mapMutations} from 'vuex'
export default {
  // name: 'App',
  data(){
    return {
      time: new Date().toTimeString().split(" ")[0],
      timeStr: "",
      hide: false,
      footShow: true,
      viewID: 0,
    }
  },
  methods: {
    transDay(day){
      switch(day){
        case 1: return "一";
        case 2: return "二";
        case 3: return "三";
        case 4: return "四";
        case 5: return "五";
        case 6: return "六";
        case 7: return "日";
      }
    },
    transTimeStr(hour){
        if(hour >=1   && hour < 6)return "现在是凌晨";
        if(hour >= 6  && hour < 8) return "早上好";
        if(hour >= 8  && hour < 11) return "上午好";
        if(hour >= 11 && hour < 13) return "中午好";
        if(hour >= 13 && hour < 17) return "下午好";
        if(hour >= 17 && hour < 18) return "傍晚好";
        if(hour >= 18 && hour < 22) return "晚上好";
        if(hour >= 22 || hour < 1) return "现在是午夜";
    },
    clickME(e){
      let tar = e.target;
      [].forEach.call(tar.parentNode.parentNode.children, item => {
        item.firstElementChild.classList.remove("checked");
      });
      tar.classList.add("checked");
      if(tar.classList.contains("goTop")){
        this.$store.commit('changeTopHide', true);
        this.$refs.Hop.style.display = "block";
      }else{
        this.$store.commit('changeTopHide', false);
        this.$refs.Hop.style.display = "none";
      }
    },
    hop(){
      this.$store.commit('changeTopHide', !this.$store.state.topHide);
      this.$refs.Hop.firstElementChild.classList.toggle("Top");
    },
    viewId(id){
      this.viewID = id;
      [].forEach.call(this.$refs.nav.children, (item, index) => {
        if(index == id){
          item.firstElementChild.classList.add('checked');
        }else{
          item.firstElementChild.classList.remove('checked');
        }
      });
      if(id == 3 || id == 4 || id == 5){
          this.hiden();
          this.footShow = false;
          return;
      }
      this.footShow = true;
    },
    hiden(conf){
      conf = conf || 'block';
      this.$store.commit('changeTopHide', true);
      this.$refs.Hop.firstElementChild.classList.add("Top");
      this.$refs.Hop.style.display = conf;
    },
    show(){
      this.$store.commit('changeTopHide', false);
      this.$refs.Hop.firstElementChild.classList.remove("Top");
      this.$refs.Hop.style.display = 'none';
    },
    ...mapMutations(['changeLoadingState', 'changeTopHide', 'changeWindowWidth']),
  },
  created(){
    this.$store.commit('changeWindowWidth', window.innerWidth);
  },
  mounted: function (){
    const _this = this;
    let count = 0;
    let flag = false;
    setInterval(() => {
      let date = new Date();
      _this.time = date.toTimeString().split(' ')[0];
      _this.timeStr = _this.transTimeStr(date.getHours());
    }, 1000);
    window.addEventListener('resize', function(e){
      if(_this.viewID >= 3)return;
      let width = window.innerWidth;
      count ++;
      _this.$store.commit('changeWindowWidth', window.innerWidth);
      if(count >= 2){
        if(width <= 950){
          _this.$store.commit('changeSecondShow', false);
        }else{
          _this.$store.commit('changeSecondShow', true);
        }
        count = 0;
      }
      if(width <= 700){
        _this.hiden('none');
        flag = true;
      }else{
        if(flag){
          _this.show();
        }
        flag = false;
      }
    }, false);
  },
  computed: {
    timeDate(){
      let now = new Date();
      return {
        year: now.getFullYear(),
        month: now.getMonth() + 1,
        date: now.getDate(),
        day: now.getDay() == 0? 7 : now.getDay()
      }
    },
    ...mapState(['loadingState', 'secondShow', 'topHide']),
  },
  components: {
    ad,
    loading,
    search
  }
}
</script>

<style scoped>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
  }
  .top.hidden{
    transform:translateY(-10.5rem);
    /*margin-top:-10rem;*/
    background-color:skyblue;
  }
  .top{
    position:relative;
    width:100%;
    z-index:21;
    transition:1s;
  }
  .time{
    width:100%;
    height:1.5rem;
    line-height:1.5rem;
    font-size:0.5rem;
  }
  .left{
    float:left;
    margin-left:2rem;
  }
  .right{
    float:right;
    margin-right:2rem;
  }
  .nav{
    position:relative;
    height:4rem;
    margin-top:2rem;
    /*background-image: linear-gradient(to bottom, #a1c4fd 0%, #c2e9fb 100%);*/
    background-color:white;
    opacity:.8;
  }
  .nav .box{
    display: flex;
    justify-content:space-between;
    width:94%;
    margin:auto;
  }
  .box ul{
    display: flex;
    justify-content:flex-end;
    width:85%;
    perspective: 100px;
  }
  .box ul.jst{
    justify-content:space-between;
  }
  ul li{
    height:100%;
    margin-left:.5rem;
    padding:0 1.5rem;
    font-size:.6rem;
    text-align:center;
    white-space:nowrap;
    line-height:4rem;
    transition:.5s;
  }
  li.checked{
    background-color:rgba(117,96,204,0.5);
  }
  li:hover{
    background-color:rgba(117,96,204,0.5);
    transform:translateZ(1px);
  }
  .router{
    width:94%;
    margin:auto;
    overflow:hidden;
  }
  div.logo{
    float:left;
    width:15%;
    height:100%;
    background-image:radial-gradient(farthest-corner, black 0%, yellow 100%);
  }
  .hop{
    display: none;
    position:absolute;
    bottom:-50px;
    left:14rem;
    right:0;
    width:50px;
    height:50px;
    text-align:center;
    line-height:50px;
    background-color:white;
    cursor:pointer;
  }
  .hop span{
    display: block;
    font-family:'宋体';
    font-size:20px;
    animation:moveD 1s linear infinite;
  }
  .hop span.Top{
    animation:moveT 1s linear infinite;
  }
  @keyframes moveD {
    from{transform: translateY(0px) rotateZ(-90deg)}
    to{transform:translateY(5px) rotateZ(-90deg)}
  }
  @keyframes moveT {
    from{transform: translateY(0px) rotateZ(90deg)}
    to{transform:translateY(5px) rotateZ(90deg)}
  }
  footer{
    width:100%;
    height:5rem;
    text-align:center;
    line-height:5rem;
  }
  .ser{
    width:84px;
    height:30px;
    margin-top:1.4rem;
  }
  /*18698868961*/
</style>
