<template>
    <div class="m-footer">
       <div class="container f-content ">
        <div class="col-md-20 col-sm-20">
            <div class="f-footer-link">
              <a href="https://www.baidu.com" target="_blank" rel="noopener noreferrer">111111</a> |
              <a href="https://www.baidu.com" target="_blank" rel="noopener noreferrer">2222</a> |
              <a href="https://www.baidu.com" target="_blank" rel="noopener noreferrer">333</a> 
            </div>
            <div class="f-footer-des"> ©1997-{{new Date().getFullYear()}}  烟祭版权所有 |
            意见反馈：<a href="https://www.baidu.com">qq：1852242056</a></div>
        </div>
        <div class="col-md-4 col-sm-4 f-tar f-footer-code" >
          <img src="" width="100px" height="100px" alt= "烟祭图片" />
        </div>
    </div>
    </div>
</template>
<script>
    export default{
        data () {
            return {
            }
        },
        //computed相当于属性的一个实时计算，如果实时计算里关联了对象，那么当对象的某个值改变的时候，同事会出发实时计算。
        computed:{
            adminName(){
                return '实时计算';
            }
        }
    }
</script>
<style lang="scss" src="./footer.scss" scoped></style>

