<template>
    <div>
      <HeaderProcess :actInd="actInd"/>
      <div class="banner">
      <img src="http://picture.eclicks.cn/g2/img/r/2018/11/07/62e0398785c38983.jpg" alt>
    </div>
    <upload/>
    <div class='list'>
    <ol>
        <li><span>服务类型</span><span  @click='changeType'>{{names}}</span></li>
        <cityPicker/>
        <li><span>服务费</span><span class='span'>￥399</span></li>
        <li><span>优惠</span><span>登陆后查看优惠券 ></span></li>

      <li class="FAQ">
          <p class='p'><router-link to="/FAQ">常见问题?</router-link>
          </p>
       </li>
    </ol>
    </div>
    <Custom/>

      <footer class='footer'> 
        <span>实付<b class='span'>￥399</b></span>
        <span id='payment' @click="toPay">立即支付</span>
      </footer>

    <section id="type-model" v-show="showType">
    <van-popup v-model="showType" overlay position="bottom">
        <van-picker
        :columns="typeArray"
        show-toolbar
        title="服务类型"
        @cancel="onTypeCancel"
        @confirm="onTypeConfirm"
        />
    </van-popup>
    </section>
    </div>
</template>
<script>
import upload from '../components/upload';
import cityPicker from '../components/cityPicker';
import HeaderProcess from "../components/header";
import Custom from "../components/call";
import {goPay} from '../api/index';
import { mapState } from "vuex";

export default {
    components:{
        upload,
        cityPicker,
        Custom,
        HeaderProcess
    },
    data() {
    return {
      actInd: 0,
      names: "换驾照",
      showType: false,
      typeArray: ["换驾照", "补驾照"]
    };
  },
  computed: {
    ...mapState({
      money: state => state.cityPicker.money
    })
  },
  methods: {
      changeType() {
        this.showType = true;
      },
      onTypeCancel() {
        this.showType = false;
      },
      onTypeConfirm(value) {
        this.names = value;
        this.onTypeCancel();
      },
       toPay() {
        goPay();
      }
    }
}
</script>
<style>
*{
  font-size: 16px;
  box-sizing: border-box;
  padding:5px;
}
.list,.list ol{
  width:100%;
}
.list ol li{
  width:100%;
  display: flex;
  border-bottom:1px solid #ccc;
  line-height:60px;
}
.list ol li span:nth-child(1){
  width:50%;
}
.list ol li span:nth-child(2){
  width:50%;
  text-align: right;
  font-size: 14px;
}
.footer{
  width:100%;
  height:46px;
  line-height:46px;
  display:flex;
  padding: 0 10px;
  position:fixed;
  bottom:0;
  left:0;
  justify-content: space-between;
}
.footer  span b{
    color:#F84642; 
}
.footer #payment{
    width: 30%;
    text-align: center;
    color:  #fff;
    background:#999999;
}
.p{
    width: 100%;
    height: 100px;
    line-height: 100px;
    text-align: center;
    color:  #3AAFFE;
    position: relative;
    background: #EEEEEE;
}
.img{
    width: 60px;
    height: 60px;
    position: absolute;
    bottom:1px;
    right: 50px;
    z-index:999;
}
.banner{
  width:100%;
}
.banner img{
  width:100%;
}
.span{
  color: #E34F4B;
}
</style>
