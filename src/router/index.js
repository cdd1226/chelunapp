import Vue from 'vue';
import VueRouter from 'vue-router';
import {getToken} from '../utils/index';
import {goLogin} from '../api/index';

Vue.use(VueRouter);

//引入路由组件
import IndexPage from '../pages/index';
import FAQ from "../pages/FAQ";
import Address from "../pages/address";
import  canvas  from '../components/canvas';
import  element  from '../components/element';

const router=new VueRouter({
     routes:[{
         path:'/index',
         component:IndexPage
     },{
         path:'*',
         redirect:'/canvas'
     }, {
        path: '/FAQ',
        component: FAQ
    }, {
        path: '/address',
        component: Address
    },{
        path:"/canvas",
        component:canvas
    },{
        path:"/element",
        component:element
    }]
})

//跳转之前
router.beforeEach((to,from,next)=>{
    if(getToken()){
        next();
    }else{
        goLogin();
    }
    next();
})

//跳转之后
router.afterEach((to,from)=>{

})

export default router;