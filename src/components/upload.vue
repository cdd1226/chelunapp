<template>
    <ul class='lis'>
        <li v-for='(item,index) in list' :key='index' @click='click(item)'>
            <img v-if='item.src' :src='item.src'/>
            <img v-else class='add' :src='addImg'/>
            <p>{{item.name}}</p>
        </li>
        <section v-show='showMask' class='mask'>
            <img :src='current.demo'/>
            <div>
                <button @click='upload(1)'>拍照</button>
                <button @click='upload(2)'>相册</button>
                <button @click='cancel'>取消</button>
            </div>
        </section>
    </ul>
</template>
<script>
//引入辅助方法
import {mapState,mapMutations} from 'vuex'
import add from '../assets/add.png'
//引入api调用
import {uploadImg} from '../api/index'
export default {
    data(){
        return {
            current:{},
            showMask:false
        }
    },
    computed:{
        ...mapState({
            list:state=>state.upload.list
        }),
        addImg(){
            return add;
        }
    },
    methods:{
        ...mapMutations({
            update:'upload/update'
        }),
        click(item){
            this.current=item;
            this.showMask=true;
        },
        cancel(){
            this.showMask=false;
        },
        async upload(type){
            let res = await uploadImg(type);
            let index=this.list.findIndex(item=>item==this.current);
            console.log('index..',index);
            this.update({
                index,
                src:res.data.url
            })
            this.showMask=false;
        }
    }
}
</script>
<style lang="scss" scoped>
.lis{
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding-top:10px;
}
li{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  img{
    border-radius: .15rem;
    width: .9rem;
    height: .7rem;
    border: 1px solid #c0c0c0;
  }
  p{
    font-size: .26rem;
    padding: .1rem .3rem;
    text-align: center;
  }
}
.add{
  width: .8rem;
  height: .7rem;
  padding: .1rem .2rem;
}
.mask{
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0, .5);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  z-index:9;
  img{
    width: 90%;
    margin-top: 20%;
  }
  div{
    display: flex;
    width: 90%;
    flex-direction: column;
    align-items: center;
    button{
      width: 100%;
      height: .9rem;
      font-size: .4rem;
      letter-spacing: .1rem;
      border-radius: .15rem;
      color: #3aafc0;
    }
    button:first-child{
      border-radius: .15rem .15rem 0 0;
    }
    button:nth-child(2){
      border-radius: 0 0 .15rem .15rem;
    }
    button:last-child{
      margin: .15rem 0;
    }
  }
}
</style>