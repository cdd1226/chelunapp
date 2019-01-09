<template>
     <ul class='list'>
        <li>订单提交</li>
        <li>填写收货地址</li>
        <li>正在办理</li>
        <li>办理完成</li>
     </ul>
</template>
<script>
export default {
  name: "",
  data() {
    return {
   
    };
  }
};
</script>
<style>

.list{
    width:100%;
    line-height:50px;
    display:flex;
    justify-content:space-around;
}
.list li{
    flex: 1;
    font-size: 14px;
    text-align: center;
    color: #3AAFFE;
}

</style>

