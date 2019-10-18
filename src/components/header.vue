<template>
  <div class="m-header">
    <ul class="m-header-ul">
        <li v-for="(childMenu,key,childIndex) in menuList" class="childMenu">
            <router-link :to="childMenu.to" :from="childMenu.to">{{childMenu.text}}</router-link>
        </li>
    </ul>
  </div>
</template>
<script>
    import {store} from '../vuex/store.js'
    import { menuDatas } from '../contants/index.js'
    export default{
        data () {
            return {
                adminNameName:store.state.adminName,
                tabPosition: 'top',
                menuList:menuDatas
            }
        },
        //computed相当于属性的一个实时计算，如果实时计算里关联了对象，那么当对象的某个值改变的时候，同事会出发实时计算。
        computed:{
            adminName(){
                return '实时计算'+store.state.adminName;
            }
        }
    }
</script>
<style lang="scss" src="../assets/scss/_header.scss" scoped></style>
<style lang="scss">
.m-header {
  .el-tabs__nav-wrap::after{
    background: transparent
  }
}
</style>