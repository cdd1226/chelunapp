<template>
  <div id="address-page">
    <HeaderProcess :actInd="actInd"/>
    <p class="address-title">收获地址</p>
    <div class="harvest-address">
      <div class="address-city contact-item">
        <div class="city-text">
          <span>联系省份</span>
        </div>
        <div class="city-change" @click="selectAddress">
          <div class="city-change-text">{{address.length?address.join(' '):'请选择收货地'}}</div>
        </div>
      </div>
      <div class="detailed-address contact-item">
        <div class="detailed-text">
          <span>详细地址</span>
        </div>
        <div class="detailed-change">
          <input type="text" v-model="detailedAddress">
        </div>
      </div>
      <div class="contact-number contact-item">
        <div class="number-text">
          <span>联系电话</span>
        </div>
        <div class="number-change">
          <input type="text" v-model="contactNumber" placeholder="请输入联系电话">
        </div>
      </div>
      <div class="contact-man contact-item">
        <div class="man-text">
          <span>联系人</span>
        </div>
        <div class="man-change">
          <input type="text" v-model="contactMan" placeholder="请输入联系人">
        </div>
      </div>
      <section id="address-model">
        <van-popup v-model="showAddress" position="bottom">
          <van-area
            :area-list="addressColumns"
            :columns-num="3"
            title="选择收货城市"
            ref="addressPicker"
            @change="addressChange"
            @cancel="addressCancel"
            @confirm="addressConfirm"
          />
        </van-popup>
      </section>
    </div>
    <Custom/>
    <RedPacket/>
    <div class="sure-btn">
      <button>确认</button>
    </div>
  </div>
</template>
<script>
import { mapState, mapMutations, mapActions } from "vuex";

import HeaderProcess from "../components/header";
import Custom from "../components/call";
import RedPacket from "../components/hong";

export default {
  name: "Address",
  data() {
    return {
      actInd: 1,
      showAddress: false,
      addressColumns: {},
      detailedAddress: "",
      contactNumber: "",
      contactMan: ""
    };
  },
  components: {
    HeaderProcess,
    Custom,
    RedPacket
  },
  created() {
    this.getAddressList().then(res => {
      this.addressColumns = this.addressList;
    });
  },
  computed: {
    ...mapState({
      addressList: state => state.cityPicker.addressList,
      address: state => state.cityPicker.address,
      addressSelectInd: state => state.cityPicker.addressSelectInd
    })
  },
  methods: {
    ...mapActions({
      getAddressList: "cityPicker/getAddressList"
    }),
    ...mapMutations({
      updateState: "cityPicker/updateState"
    }),
    selectAddress() {
      this.showAddress = true;
    },
    addressChange(picker, values) {
      // console.log(values);
      // let index = this.addressList.findIndex(item => item.name == values[0]);
      // this.updateState({ addressSelectInd: index });
      // console.log(values);
      // let ind = this.$refs.addressPicker.getColumnIndex(index);
      // //   console.log(ind);
      // this.$refs.addressPicker.setColumnValues(
      //   1,
      //   this.addressList[index].list.map(item => item.name)
      // );
    },
    addressCancel() {
      this.showAddress = false;
    },
    addressConfirm(values) {
      // console.log(values);
      let newValues = [];
      values.forEach(item => {
        newValues.push(item.name);
      });
      console.log(newValues);
      this.updateState({ address: newValues });
      this.addressCancel();
    }
  }
};
</script>
<style scoped>
#address-page{
  width:100%;
  height:100%;
  font-size: 15px;
}
.address-title{
  width:100%;
  height:30px;
  line-height:30px;
  background:#ccc;
  text-align: center;
}
.contact-item{
  width:100%;
  display: flex;
  line-height: 40px;
  border-bottom:1px solid #ccc;
  justify-content: space-between;
  box-sizing: border-box;
  padding:5px;
}
input{
  text-align: right;
}
.sure-btn button{
  width:100%;
  height:50px;
  line-height:50px;
  background:#ccc;
  text-align: center;
  position: fixed;
  bottom:0;
}
</style>

