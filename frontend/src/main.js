import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import NavigationsStore from '@/store/NavigationsStore.js'

// import Tailwind CSS มาใช้งาน
import '@/styles/tailwind.css'

//import Sweet Alert มาใช้งาน
import VueSweetalert2 from 'vue-sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'

//สร้างตัวแปรมาเก็บ Constant ของ Vue
const app = createApp(App)

app.use(store)
app.use(NavigationsStore)
app.use(router)
app.use(VueSweetalert2)

//filters ใช้กำหนดตัวกรองที่สามารถใช้เพื่อใช้การจัดรูปแบบข้อความทั่วไป 
app.config.globalProperties.$filters = {
    currencyUSD(value) {
      return '$' + value
    },

    firstCharacter(value){
        return value.charAt(0)
    },

    uppercase(value){
        return value.toUpperCase()
    },

}

app.mount('#app')