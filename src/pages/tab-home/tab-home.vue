<template>
    <view>
        首页
        <button type="default" @click="to">跳转</button>
    </view>
</template>

<script setup lang="ts">
const to = () => {
    uni.switchTab({
        url: '/pages/tab-my/tab-my', // 不影响原生的参数传递
        // 提供了基于页面级别的路由参数对象
        routeParams: {
            c: 1,
            d: 1
        },
        // 提供了基于跳转过程的过程参数对象
        passedParams: {
            e: 1,
            f: 1
        }
    })
}

const get = () => {
    // 获取路由页面参数
    console.log(this.$routeParams)
    console.log(getCurrentPages()[getCurrentPages().length-1].$routeParams)
    // 获取路由动作过程参数
    console.log(this.$passedParams)
    console.log(getCurrentPages()[getCurrentPages().length-1].$passedParams)
}
</script>

<style>

</style>
