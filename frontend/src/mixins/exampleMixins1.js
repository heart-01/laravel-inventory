// Mixins จะเป็นการจัดการพวก components ใช้ function ซ้ำ ๆ กำเราจะใช้ Mixins มาสร้าง function แล้วให้ components ดึงไปใช้งาน
const myMixin1 = {
    created() {
      this.hello()
    },

    data() { 
        //ถ้าใช้ data ใน Mixins พอเรียกใช้งาน Mixins จะสามารถดึงข้อมูล data ไปใช้ได้เลยใน components
        //ถ้ากรณีที่ชื่อ data หรือ method  ซ้ำใน Component    data หรือ method ในส่วนของ components จะทำงานแทน เพราะ vue จะทำงาน mixins ก่อน แล้วค่อยทำ component ทีหลัง
        return {
          message: 'hello',
          foo: 'abc'
        }
    },
    
    methods: {
      hello() {
        console.log('hello from mixin!')
      }
    }
}

export default myMixin1