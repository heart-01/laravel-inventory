import { createStore } from 'vuex'

/**
 * Store Persist เป็นการเก็บ store ของ vuex ลงไปที่ localstoreage ทำให้พอ refresh หน้าเว็บแล้วข้อมูลตัวแปรไม่ถูกล้างค่าข้อมูล ข้อมูลในตัวแปร state จะอยู่ใน localstoreage ให้เองโดยอัติโนมัติ
 */
import VuexPersistence from 'vuex-persist'

const vuexLocal = new VuexPersistence({ //Setup vuex-persist
  storage: window.localStorage
})

// store คือ พื้นที่ส่วนกลางที่ให้ app ของเราดึงค่าไปใช้งานได้
export default createStore({
  
  state: { //ส่วนที่เก็บตัวแปรคล้ายกับ data ใน component
    isAuthen: true,

    counter: 0, //counter ขะเป็นตัวแปรพิเศษสามารถมองเห็นได้ทั้งหมดของโปรแกรม
    showSideMenu: true //แสดงเมนูหน้าจอ mobile
  },

  mutations: { //เป็นตัวกระทำตามคำสั่งของ Actions ในการเพิ่ม ลบ แก้ไขตัวแปร
    //ใช้สำหรับจัดการกับ state พวกเพิ่มค่าให้กับตัวแปร
    SET_AUTHEN (state, payload) {
      console.log('Store Mutations SET_AUTHEN : ' + payload);
      state.isAuthen = payload
    },
    
    //ฟังชั่นเพิ่มค่า counter
    increment(state){
      state.counter++
      // state.counter = 'a'
    },
    //ฟังชั่นลบค่า counter
    decrement(state){
      state.counter--
    },
    //ฟังก์ชั่นซ่อนแสดงเมนูด้านข้าง
    toggleSideMenu(state){
      state.showSideMenu = !state.showSideMenu
    },
    //ฟังชั่นก์ปิดแถบเมนูด้านข้าง
    closeSideMenu(state){
      state.showSideMenu = true
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

  plugins: [
    vuexLocal.plugin //เรียกใช้ vuex-persist
  ]
})
