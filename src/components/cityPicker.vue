<template>
    <div>
        <ol>
            <li><span>当前驾照签发城市</span><span @click="cityClick">
                {{city.join('')?city.join(''):'请选择签发地'}}
                </span></li>
            <li><span>可补换的签发城市</span>

            <!--<CityHelp/>-->

            <span  @click="selectUpdate">{{cost.length?cost.join(' '):'请选择补换地'}}</span></li>
        </ol>
        <section>
            <van-popup v-model='showCity' position='bottom'>
                <van-picker :columns='cityColumns' show-toolbar title='请选择签发城市'
                ref='cityPicker' @change='cityChange' @cancel='cityCancel' @confirm='cityConfirm'/>
            </van-popup>
        </section>

        <section>
            <van-popup v-model="showCost" position="bottom">
                <van-picker
                :columns="costColumns"
                show-toolbar
                title="选择补换城市"
                ref="costPicker"
                @change="costChange"
                @cancel="costCancel"
                @confirm="costConfirm"
                />
            </van-popup>
            </section>
    </div>
</template>
<script>
import {mapState,mapMutations,mapActions} from 'vuex';
import CityHelp from "./CityHelp";
export default {
    name:'CityPicker',
    components:{
        CityHelp
    },
    data(){
        return {
            //控制当前驾照
            showCity:false,
            //控制可补换驾照
            showCost:false,
            //多列选择配置
            cityColumns:[],
            costColumns: []
        }
    },
    created(){
        //获取签发城市，然后更新选择配置
        this.getCityList().then(res=>{
            this.cityColumns=[
                {
                    values:this.cityList.map(item=>item.name)
                },{
                    values:this.cityList[0].list.map(item=>item.name)
                }
            ]
        })
    },
    computed:{
        ...mapState({
            cityList:state=>state.cityPicker.cityList,
            city:state=>state.cityPicker.city,
            costList:state=>state.cityPicker.costList,
            cost:state=>state.cityPicker.cost,
            costSelectInd: state => state.cityPicker.costSelectInd
        })
    },
    methods:{
        ...mapActions({
            getCityList:'cityPicker/getCityList',
            getCostList:'cityPicker/getCostList'
        }),
        ...mapMutations({
            updateState:'cityPicker/updateState'
        }),
        //显示选择器
        cityClick(){
            this.showCity=true;
        },
        //当省份改变的时候更新城市数据
        cityChange(picker,values){
            //获取当前省份的下标
            let index=this.cityList.findIndex(item=>item.name==values[0]);
            //调用api更新城市数据
            this.$refs.cityPicker.setColumnValues(1,this.cityList[index].list.map(item=>item.name))
        },
        cityCancel(){
            this.showCity=false;
        },
        cityConfirm(values){
            console.log('values...',values);
            //触发mutation更新城市数据
            this.updateState({city:values});
            this.cityCancel();
        },
        selectUpdate(){
            if(!this.city.length){
                alert('请选择签发城市');
            }else{
                this.showCost = true;
                this.getCostList().then(res => {
                    this.costColumns = [
                    {
                        values: this.costList.map(item => item.name)
                    },
                    {
                         values: this.costList[this.costSelectInd].list.map(item => item.name)
                    }
                    ];
                });
            }
        },
        //补换地
        costChange(picker, values) {
            let index = this.costList.findIndex(item => item.name == values[0]);
            this.updateState({ costSelectInd: index });
            this.$refs.costPicker.setColumnValues(
                1,
                this.costList[index].list.map(item => item.name)
            );
        },
        costCancel() {
            this.showCost = false;
        },
        costConfirm(values) {
            let newValues = values.map(item => {
            if (item.indexOf("(签发地)") !== -1) {
            item = item.replace("(签发地)", "");
            }
            return item;
            });
            this.updateState({
                money: this.costList[this.costSelectInd].list.map(item => item.cost)[0]
            });
            this.updateState({ cost: newValues });
            this.costCancel();
        }
    }
}
</script>
<style>
ol{
  width:100%;
}
ol li{
  width:100%;
  display: flex;
  justify-content: space-between;
  border-bottom:1px solid #ccc;
  line-height:60px;
}
ol li span{
     color:#000;
}
ol li span:nth-child(1){
  width:50%;
}
ol li span:nth-child(2){
  width:50%;
  text-align: right;
  font-size: 14px;
}
</style>
