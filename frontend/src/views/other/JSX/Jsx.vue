<template>
    <div>
        Message: <input v-model="message" class="border mt-5" >
        <JsxComponent :message='message' :item='items' :html='rawHtml' />
    </div>

    <!-- <span  class="mt-5" v-html="rawHtml"></span> -->

    <!-- <div class="mt-5" v-for="item in items" :key="item" >
        {{ item }}
    </div> -->

</template>

<script>
    // JSX คือ การใช้ตัวแปร javasctipt ไปแสดงผลที่ html เช่น {{ name }} หรือ การทำให้ html ไปแสดงผลที่ javasctipt เช่น Render function
    // vue จะติดปัญหาอยู่ 1 อย่าง คือ การที่เราเขียน html ในแบบของ vue template ถูกส่งมาในรูปแบบของ text ข้อความแล้วต้องการมาแสดงผลให้กลายเป็นหน้า html ส่วนใหญ่จะเจอปัญหาเรื่อง Cross Site Scripting (XSS) ในส่วน JSX จะมาช่วยในส่วนนี้ได้
import JsxComponent from '@/components/other/JSX/JsxComponent.vue'

    export default {
        name: 'Jsx',

        data() {
            return {
                message: 'JSX',
                items: [
                    'Dome',
                    'Mark',
                    'John'
                ],
                rawHtml: "<div class='mt-5' style='font-size: 50px;' > Heart </div>"
            }
        },

        components: {
            JsxComponent
        }
    }
</script>