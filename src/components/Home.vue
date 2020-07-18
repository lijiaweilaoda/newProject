<template>
    <div class="zhuye">
         <el-button @click="$router.go(-1)">返回上一页</el-button>
         <el-button @click="goUser" type="primary">跳转到用户界面</el-button>
    </div>
</template>
<script>
export default {
    name:'zhuye',
    methods:{
        goUser(){
            this.$router.replace('User')
        }
    }
}
</script>