// Mixins จะเป็นการจัดการพวก components ใช้ function ซ้ำ ๆ กำเราจะใช้ Mixins มาสร้าง function แล้วให้ components ดึงไปใช้งาน
const myMixin2 = {
    created() {
      
    },
    
    methods: {
      hello2() {
        console.log('hello from mixin2!')
      }
    }
}

export default myMixin2