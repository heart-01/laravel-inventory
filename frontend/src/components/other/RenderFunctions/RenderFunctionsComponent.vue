<script>
    import { h } from 'vue'
//  RenderFunctions เป็นการแสดงผลบนหน้าเว็บโดยไม่ใช้ tag template ข้อดีคือเราสามารถเขียนจัดการโครงสร้างเองได้เองทั้งหมด
    export default {
        name: 'RenderFunctionsComponent',

        data() {
            return {
                test: "Test",
            }
        },
        
        render() 
        {
             //h คือการ createElement ใน html
            return  h('div', { class: 'bg-blue-500' }, //แสดงผล <div class="bg-red-500" > 
                        [
                            h('input', { //แสดงผล <input v-model="test" value="Test" >
                                value: this.test,
                                onInput:(event)=> {
                                    this.test = event.target.value //ตัวแปร test data เก็บข้อมูลกรอกเข้ามาใน input
                                }
                            }),
                            h("h4",this.test), //แสดงผล <h4>{{ test }}</h4>

                            h('h' + this.level , { class: `mt-5 ${this.textH}` } , 'Hellow World'),
                        ]
                    ) //</div>
        },

        props: {
            level: {
                type: Number,
                default: 5
            },
            textH: {
                type: String,
                default: 'text-sm'
            }
        },
    }
</script>