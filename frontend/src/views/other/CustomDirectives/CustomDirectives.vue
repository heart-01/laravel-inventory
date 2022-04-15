<template>
    height : 
    <input type="text" v-model="h" class="mb-5 mt-5 border" >
    
    <div class="bg-red-500 text-white p-5" v-height="h" >
        Custom Directives
    </div>
</template>

<script>
    export default {
        name: 'App',

        data () {
            return {
                h: null
            }
        },

        /**
         * Directives เป็นการใช้ attributes ที่ vue เตรียมมาให้ลงไปใน Tag html เช่น v-if , v-else , v-for
            การที่เรา Custom Directives เราจะสามารถกำหนดชื่อ Directives เองได้ทำ function ออกมาเองได้
            แบ่งเป็น Global Directives และ local Directives อยู่ภายใต้ของ Compo
         */
        directives: {
            //el คือ element
            //binding เอาไว้รับค่าต่าง ๆ จาก property value
            height (el, binding) {
                el.style.height = binding.value + 'px'
                //el.style.height คือ กำหนดให้ element มี property style เป็น height
                //binding.value + 'px' คือ กำหนดค่า property value เป็น px
            },
        }
    }
</script>