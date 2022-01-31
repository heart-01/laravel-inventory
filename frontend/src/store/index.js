import { createStore } from 'vuex'

// store คือ พื้นที่ส่วนกลางที่ให้ app ของเราดึงค่าไปใช้งานได้
export default createStore({
  state: { //ส่วนที่เก็บตัวแปรคล้ายกับ data ใน component

  },
  mutations: { //ใช้สำหรับจัดการกับ state พวกเพิ่มค่าให้กับตัวแปร

  },
  actions: {
    //ถ้าเราจะให้ actions ไปเรียกใช้งานใน mutations เราจะต้องใช้คำสั่ง commit

  },
  modules: {

  }
})
