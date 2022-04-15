<template>
    <div class='card2' >
        <h1>From 2</h1>
        name: <input v-model='name' class="border" type="text">
        age: <input v-model='age' class="border" type="text">
        tel: <input v-model='tel' class="border" type="text">
        <button @click="ckFrom" class="bg-blue-500 hover:bg-blue-700 ml-5 text-white font-bold py-2 px-4 rounded-full" >Click From2</button>
    </div>
</template>

<script>
import MixinsFrom from '@/mixins/MixinsFrom'

    export default {
        name: 'Card1',
        mixins: [ MixinsFrom ],
        
        data () {
            return {
                tel: ''
            }
        },

        methods : {
            ckFrom(){
                console.log(this.name, this.age, this.tel);
            }
        }
    }
</script>

<style lang="css" scoped>
    .card2 {
        border: 1px solid black;
        padding: 24px;
    }
</style>