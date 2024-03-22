<template>
    <div class="index">
        <div @click="router.push({ path: '/exper/1' })">第一天</div>
        <div @click="router.push({ path: '/exper/2' })">第二天</div>
    </div>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router'
const router = useRouter();
</script>

<style scoped>
.index>div {
    width: 300px;
    height: 150px;
    margin: 100px 0;
    line-height: 150px;
    font-size: 64px;
    text-align: center;
    background-color: grey;
    color: white;
    border-radius: 50px;
    border: 1px solid #fff;
    cursor: pointer;
}
</style>