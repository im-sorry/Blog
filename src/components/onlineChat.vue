<template>
    <div class="chat">
      <iframe src="/static/onlineChat.html" frameborder="0" scrolling="no" ref="iframe"></iframe>
    </div>
</template>

<script>
    export default {
        name: "onlineChat",
        computed: {
          height(){
            return window.innerHeight;
          }
        },
        mounted(){
          this.$emit('viewId', 4);
          this.$refs.iframe.style.height = window.innerHeight + 'px';
          document.body.style.backgroundImage = "linear-gradient(to top, #ff0844 0%, #ffb199 100%)";
        },
    }
</script>

<style scoped>
  .chat, iframe{
    width:100%;
  }
  iframe{
    position: absolute;
    left:0;
    top:0;
    z-index:1;
  }
</style>
