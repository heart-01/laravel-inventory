<template>
    <div class='card1' >
        <h1>HomeWorkMixinsFrom 3</h1>
        title: <input v-model='title' class="border" type="text">
        detail: <input v-model='detail' class="border" type="text">
        <button @click="ckFrom" class="bg-blue-500 ml-5 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" >Click From3</button>
    </div>
</template>

<script>
import HomeWorkMixinsFrom from '@/mixins/HomeWorkMixinsFrom'

    export default {
        title: 'HomeWorkMixinsCard3',
        mixins: [ HomeWorkMixinsFrom ]
    }
</script>

<style lang="css" scoped>
    .card1 {
        border: 1px solid black;
        padding: 24px;
    }
</style>