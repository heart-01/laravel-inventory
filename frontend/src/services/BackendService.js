import axios from 'axios'

const BackendService = axios.create({
    baseURL: process.env.VUE_APP_URL_API,
    withCredentials: true, //กำหนดให้สามารถยิง api มาจาก domain อื่น ๆ จาก client ข้ามโดเมนให้สามารถยิง token มายืนยันตัวตนได้ กำหนดทั้งฝั่ง laravel และ vue ใน laravel กำหนดที่ supports_credentials
    headers: {
        // "Content-type": "application/json",
        "Content-type": "multipart/form-data", //ส่งฟอร์มเป็น file ไปด้วยต้องเปลี่ยน จาก "Content-type": "application/json" เป็น "Content-type": "multipart/form-data"
        "Accept": "application/json",
    }
})

//การใช้ interceptors เพื่อแทรกตัว token เข้าไปใน headers 
//Vue js interceptors การ Inject ข้อมูล หรือ แทรกอะไรบางอย่างเข้าไปในระดับ golbal เราจะใช้แก้ตอน Login เวลาเข้าไปแล้วต้องรีเฟรซหน้าเพื่ออ่าน token ที่อยู่ใน LocalStorage ตอนนี้เราจะใช้ Vue js interceptors มาช่วยในการแทรก token เข้าไปที่ header ได้
//Vue js interceptors คล้ายกับดูความเปลี่ยนแปลงที่อยู่บนหน้าเว็บ ทุกครั้งที่เรียกจะตรวจดูความเปลี่ยนแปลงที่เกิดขึ้นเหมือนกับฟังชั่น watch
BackendService.interceptors.request.use(config => {
    //อ่าน token จาก localStorage
    let token = ''
    
    try {
        //อ่าน token จาก localStorage จะได้เป็นตัวแปร Object
        let userStorage = localStorage.getItem('user')
        //แปลง userStorage JSON Object เป็น Array
        let userStorageJSON = JSON.parse(userStorage)
        //ดึงค่า key token array
        token = userStorageJSON['token']
        // console.log(token)
    }catch(error){
        //แสดงค่า error
        console.log(error);
    }

    //เช็คว่าถ้า token ไม่ null
    if(token){
        //config header ให้สามารถแนบ token เข้าไปได้โดยไม่รีเฟรซหน้า
        config.headers.Authorization = "Bearer "+token
    }else{
        alert('ข้อมูลเข้าระบบไม่ถูกต้อง')
    }

    return config //ส่ง config ไปใช้งาน
})

//export default เป็น function ของ javascript ในการ export function หรือ variable ในไฟล์ไปใช้งานในที่อื่น
export default BackendService

//export default BackendService,xxx,xxx //ในกรณีที่มีหลายตัวแปร