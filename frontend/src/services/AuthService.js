import axios from 'axios'

const authService = axios.create({
    baseURL: process.env.VUE_APP_URL_API,
    withCredentials: true, //กำหนด Credentials ให้เป็น true ทั้ง laravel ในไฟล์ cors และ vue เพื่อให้ไม่ติด cors 
    headers: {
        "Content-type": "application/json",
        "Accept": "application/json",
    }
})

export default authService