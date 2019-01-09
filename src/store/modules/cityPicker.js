import {cityList,costList} from '../../api/index';
const state={
    //签发城市列表
    cityList:[],
    //可补换城市列表
    costList:[],
    //选择的签发城市
    city:[],
    //选择的补换城市
    cost:[],
    money: '',
    costSelectInd: 0,
    addressList: [],
    address: [],
    addressSelectInd: 0
}
const mutations={
    updateState(state,action){
        state=Object.assign(state,action);
    }
}
const actions={
    //获取签发城市列表
    async getCityList({commit}){
        let res=await cityList();
        res.data.forEach(item=>{
            item.list.forEach(value=>{
                delete value.list;
            })
        })
        commit('updateState',{cityList:res.data})
        // console.log('res...',res);
    },
    async getAddressList({ commit }) {
        let res = await cityList();
        let formatAddress = {
            province_list: {},
            city_list: {},
            county_list: {}
        };
        res.data.forEach(item => {
            // console.log(item);
            formatAddress.province_list[item.id] = item.name;
            item.list.forEach(itm => {
                // console.log(itm);
                formatAddress.city_list[itm.id] = itm.name;
                itm.list.forEach(val => {
                    // console.log(val);
                    formatAddress.county_list[val.id] = val.name;
                })
            })
        });
        console.log(formatAddress);
        commit('updateState', { addressList: formatAddress })
    },
    //获取可补换的城市列表
    async getCostList({commit,state},action){
        let proIndex=state.cityList.findIndex(item=>item.name==state.city[0]),
            cityIndex=state.cityList[proIndex].list.findIndex(item=>item.name==state.city[1]);
        let res=await costList(1,state.cityList[proIndex].id,state.cityList[proIndex].list[cityIndex].id);
        res.data.forEach(item => {
                if (item.source_city == 1) {
                    item.name += '(签发地)'
                    item.list.forEach(itm => {
                        if (itm.source_city == 1) {
                            itm.name += '(签发地)'
                        }
                    })
                }
            })
        commit('updateState', { costList: res.data })
        console.log('res...',res);
    }
}
export default {
    namespaced:true,
    state,
    actions,
    mutations
}