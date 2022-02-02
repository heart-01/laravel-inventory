<template>
    <section class="bg-white">
        <div class="container py-20 mx-auto">
            <div class="flex flex-wrap items-center mt-16">
                <div class="order-last w-full p-4 lg:w-5/12 lg:order-first">

                    <h1 class="mb-4 text-2xl">Counter : {{ this.$store.state.counter }}</h1>
                    <button @click="counterUp" class="px-4 py-2 font-bold text-white bg-green-500">+</button>
                    <button @click="counterDown" class="px-4 py-2 mx-2 font-bold text-white bg-red-500">-</button>
                    
                    <h1 class="mb-4 text-5xl font-semibold leading-tight text-gray-800 capitalize">Smart Inventory system for your business growth </h1>
                    <p class="mb-4">ระบบคงคลังสินค้าที่จะมาช่วยเติมเต็มระบบของคุณให้เติบโตได้อย่างมั่นคง เริ่มต้นใช้งานระบบได้ฟรี</p>
                    <router-link to="/register" class="inline-block px-6 py-2 text-white bg-indigo-600 border-2 border-indigo-600 rounded-md hover:text-indigo-600 hover:bg-indigo-100">เริ่มต้นใช้งานฟรี</router-link>
                    <p>URL: {{ url }}</p>
                    <p>BASEURLAPI: {{ baseURLAPI }}</p>
                    <p>TITLE: {{ title }}</p>
                </div>
                <div class="order-first w-full p-4 lg:w-7/12 lg:order-last">
                    <img src="@/assets/images/img-banner.png" class="w-full" alt="Smart Inventory System" width="" height="" />
                </div>
            </div>
        </div>
    </section>
</template>

<script>

import myMixin1 from '@/mixins/exampleMixins1'
import myMixin2 from '@/mixins/exampleMixins2'

export default {
    
    name: 'Home',

    created() {
      this.hello2() //method hello2 myMixin2
    },

    data(){
        return { 
            url: process.env.VUE_APP_URL,
            baseURLAPI: process.env.VUE_APP_URL_API,
            title: process.env.VUE_APP_TITLE
        }
    },

    mixins: [ myMixin1 , myMixin2 ],

    methods: {
        counterUp(){
            this.$store.commit("increment") //this.$store.commit คือการเข้าถึง Mutations ใน vuex // increment ชื่อฟังชั่นใน vuex
        },
        counterDown(){
            this.$store.commit("decrement") //this.$store.commit คือการเข้าถึง Mutations ใน vuex // decrement ชื่อฟังชั่นใน vuex
        },
    }
}
</script>