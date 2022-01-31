import { createStore } from 'vuex'

// store คือ พื้นที่ส่วนกลางที่ให้ app ของเราดึงค่าไปใช้งานได้
export default createStore({
  state: { //ส่วนที่เก็บตัวแปรคล้ายกับ data ใน component
    isAuthen: false
  },
  mutations: { //เป็นตัวกระทำตามคำสั่งของ Actions ในการเพิ่ม ลบ แก้ไขตัวแปร
    //ใช้สำหรับจัดการกับ state พวกเพิ่มค่าให้กับตัวแปร
    SET_AUTHEN (state, payload) {
      console.log('Store Mutations SET_AUTHEN : ' + payload);
      state.isAuthen = payload
    }
  },
  actions: { //ตัวการกระทำเราอยากจะกระทำอะไรแล้วให้เปลี่ยนแปลงค่า เช่น Call API Backend เพิ่ม ลบ แก้ไข คลิ๊กปุ่ม
    //ถ้าเราจะให้ actions ไปเรียกใช้งานใน mutations เราจะต้องใช้คำสั่ง commit
    setAuthen ({ commit }, payload) {
      console.log('Store Actions payload : ' + payload);
      commit('SET_AUTHEN', payload)
    }
  },
  getters : { //function ไว้ return value
    isAuthen: (state) => {
      console.log('Store Getters state.isAuthen : ' + state.isAuthen);
      return state.isAuthen //ดึงค่า isAuthen
    }
  },
  modules: {

  }
})
