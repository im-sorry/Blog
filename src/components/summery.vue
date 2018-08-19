<template>
    <div class="summery">
      <iframe src="/static/summery/index.html" frameborder="0" scrolling="no" ref="iframe"></iframe>
    </div>
</template>

<script>
    export default {
      name: "summery",
      data(){
        return {
          oldB: ""
        }
      },
      mounted(){
        this.$emit('viewId', 3);
        this.$refs.iframe.style.height = window.innerHeight + 'px';
        this.oldB = document.body.style.background;
        document.body.style.background = "linear-gradient(-20deg, #d558c8 0%, #24d292 100%)";
      },
    }
</script>

<style scoped>
  .summery, iframe{
    width:100%;
  }
  iframe{
    position: absolute;
    left:0;
    top:0;
    z-index:1;
  }
</style>
