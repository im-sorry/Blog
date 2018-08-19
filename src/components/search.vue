<template>
    <div class="main p-r">
      <div class="top w100 h100">
        <input type="text" class="sr-input" @focus="focus" @blur="blur" ref="input" v-model="title">
        <i class="fa fa-search"></i>
      </div>
      <div class="content p-a">
        <ul>
          <li v-for="item in result" class="overflow-ellipse w100 sr-item"><router-link :to="{name: 'articalShow', params: {id: item.id}}">{{item.title}}</router-link></li>
        </ul>
      </div>
    </div>
</template>

<script>
    export default {
        name: "search",
        data() {
          return {
            result: [],
            title: ""
          }
        },
        mounted(){
          const self = this;
          function debounce(fn, timeout){
            let timer = 0;
            return function(e){
              clearTimeout(timer);
              timer = setTimeout(fn.bind(e.target), timeout);
            }
          }
          function input(){
            self.getData(self.title);
          }
          this.$refs.input.oninput = debounce(input, 450);
        },
        methods: {
          focus(e){
            let tar = e.target;
            tar.style.width = '100px';
            tar.parentNode.parentNode.style.width = '134px';
          },
          blur(e){
            let tar = e.target;
            tar.style.width = '50px';
            tar.parentNode.parentNode.style.width = '84px';
            this.title = "";
            let self = this;
            setTimeout(function(){
              self.result = [];
            }, 100);
          },
          getData(value){
            const self = this;
            if(value === ""){
              self.result = [];
              return;
            }
            this.$axios.get(this.$host + '/getSearchData' + '?title=' + value).then( data => {
              self.result = data.data;
            })
          }
        }
    }
</script>

<style scoped>
  .main{
    transition:width .5s ease;
  }
  .top{
    text-align:center;
  }
  .content{
    width:200%;
    top:100%;
    right:0;
    padding:0 0 0 5px;
    line-height:15px;
    background-color: white;
    z-index:99;
  }
  .sr-input{
    width:50px;
    border-radius:15px;
    border:1px solid #333;
    text-indent: 8px;
    transition: width .5s ease;
    outline: none;
  }
  .sr-item{
    padding: 10px 0;
    height:20px;
    line-height:20px;
  }
  .sr-item:hover{
    background-color: rgb(240,240,240);
  }
</style>
