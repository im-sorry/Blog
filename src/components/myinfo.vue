<template>
	<div class="myinfo">
		<div class="top w100">
			<div class="img"><img src="/static/img/meme.jpg" alt=""></div>
			<div class="info">
				<p>
					<span class="little">little:</span>
          <span><router-link to="/" class="index">hanqx</router-link></span>
				</p>
				<p>
					记录知识 记录友情 记录生活 我的博客我做主 ^_^
				</p>
			</div>
		</div>
		<ul class="con w100">
			<li>
				<a href="tencent://message/?uin=1223614734&Site=&Menu=yes">
					<i class="qq"></i>
				</a>
			</li>
			<li>
				<i class="weixin"></i>
				<div class="QRCode"></div>
			</li>
			<li>
				<a href="http://shang.qq.com/wpa/qunwpa?idkey=a16f2056d2ff88d3b89a4a339981357596c56481d8ce49a4c3e341fccffed3a9" target="_blank">
					<i class="qqgroup"></i>
				</a>
			</li>
		</ul>
		<div class="viewinfo"></div>
	</div>
</template>

<script>
	export default {
		name: 'myinfo',
	}
</script>

<style scoped>
	.myinfo{
		width:100%;
		height:15rem;
    padding:1.5rem;
		font-size:1.2rem;
		background-color:rgba(255,255,255,.5);
		box-shadow:-5px 5px 20px 1px #333;
		overflow: hidden;
    box-sizing:border-box;
	}
	img{
		width:100%;
		height:100%;
		transition:.3s;
	}
	.top, .con{
		display: flex;
		justify-content:space-between;
		width:17rem;
	}
	.img{
		width:35%;
    max-width:100px;
		height:6rem;
		overflow: hidden;
		transition:.3s;
	}
	.img:hover img{
		transform:scale(1.3);
	}
	.img:hover{
		transform:scale(1.1);
	}
	.info{
		width:60%;
		height:6.4rem;
		perspective: 100px;
	}
  .info p{
    text-align:left;
  }
  .info p:nth-child(1){
    display: flex;
    justify-content:flex-start;
  }
  p span:nth-child(2){
    margin-left:.3rem;
  }
	.info p + p{
    margin-top:0.6rem;
		font-size:.5rem;
	}
	.little{
		padding:0.3rem 0.5rem;
		background-image:radial-gradient(farthest-corner, skyblue 0%, blue 100%);
	}
	.index:hover{
		transition:.3s;
		color:rgb(79, 79, 200);
	}
	.con{
    margin-top:2rem;
		justify-content: space-around;
	}
	.con li, li i{
		display: block;
		width:2.2rem;
		height:2.2rem;
		background-size:100% 100%;
	}
	i{
		transition:.3s;
	}
	.qq{
		background-image: url('/static/img/qq.png');
	}
	.qq:hover{
		background-image: url('/static/img/qqH.png');
	}
	.weixin{
		background-image: url('/static/img/weixin.png');
	}
	.weixin:hover{
		background-image: url('/static/img/weixinH.png');
	}
	.qqgroup{
		background-image: url('/static/img/qqgroup.png');
	}
	.qqgroup:hover{
		background-image: url('/static/img/qqgroupH.png');
	}
</style>
