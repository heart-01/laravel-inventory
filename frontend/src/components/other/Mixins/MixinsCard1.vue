<template>
    <div class='card1' >
        <h1>From 1</h1>
        name: <input v-model='name' class="border" type="text">
        age: <input v-model='age' class="border" type="text">
        <button @click="ckFrom" class="bg-blue-500 ml-5 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" >Click From1</button>
    </div>
</template>

<script>
import MixinsFrom from '@/mixins/MixinsFrom'

    export default {
        name: 'Card1',
        mixins: [ MixinsFrom ]
    }
</script>

<style lang="css" scoped>
    .card1 {
        border: 1px solid black;
        padding: 24px;
    }
</style>