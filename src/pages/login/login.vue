<template>
    <view>

    </view>
</template>

<script setup lang="ts">
import {login} from '@/api/login'
import Auth from "@/common/auth";
    onMounted(async () => {
        try {
            const login_res = await login();
        console.log(login_res)
        } catch (error) {
            console.log('error',error)
        }

    })

</script>

<style>

</style>
