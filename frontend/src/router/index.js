import { createRouter, createWebHistory } from 'vue-router'

// Import Layout
import FrontendLayout from '@/layouts/Frontend.vue'
import BackendLayout from '@/layouts/Backend.vue'

// Import Views
// Frontend
import Home from '@/views/frontend/Home.vue'
import About from '@/views/frontend/About.vue'
import Portfolio from '@/views/frontend/Portfolio.vue'
import Service from '@/views/frontend/Service.vue'
import Contact from '@/views/frontend/Contact.vue'
import Register from '@/views/frontend/Auth/Register.vue'
import Login from '@/views/frontend/Auth/Login.vue'
import ForgotPassword from '@/views/frontend/Auth/ForgotPassword.vue'

//Error handling
import NotFound404 from '@/views/error/NotFound404.vue'

// Backend
import Dashboard from '@/views/backend/Dashboard.vue'
import Product from '@/views/backend/Product.vue'

// Other Views
import MixinsFrom from '@/views/other/Mixins/MixinsFrom.vue'
import HomeWorkMixinsFrom from '@/views/other/Mixins/HomeWorkMixinsForm.vue'
import Slot from '@/views/other/Slot/Slot.vue'
import DynamicComponent from '@/views/other/DynamicComponent/DynamicComponent.vue'
import CustomDirectives from '@/views/other/CustomDirectives/CustomDirectives.vue'
import Filters from '@/views/other/Filters/Filters.vue'
import RenderFunctions from '@/views/other/RenderFunctions/RenderFunctions.vue'
import Jsx from '@/views/other/JSX/Jsx.vue'
import onceClick from '@/views/other/onceClick/onceClick.vue'
import WebScraper from '@/views/other/WebScraper/WebScraper.vue'
import RoutePrams from '@/views/other/RoutePrams/RoutePrams.vue'
//NavigationsGuard
import NavigatLogin from '@/views/other/NavigationsGuard/Login.vue'
import NavigatHome from '@/views/other/NavigationsGuard/Home.vue'

// Import Store
import NavigationsStore from '@/store/NavigationsStore.js'

//ทดสอบสร้างตัวแปรไว้เช็คค่าว่า login หรือยัง
// let state = false

//สร้างฟังชั่นสำหรับเช็ค route ก่อนเรียกใช้งาน (Route Auth Guard)
function authGuard(to, from, next){
  let isAuthenticated = false

  if(localStorage.getItem('user')){
    isAuthenticated = true //ถ้ามีข้อมูล localStoreage อยู่
  }else{
    isAuthenticated = false //ถ้าไม่มี localStoreage
  }

  if(isAuthenticated){
    next() //อนุญาติให้เข้าสู่ route และโหลด component ที่ต้องการได้
  }else{
    next({name: 'Login'})
  }
}


const routes = [
  //Frontend
  {
    path: '/',
    component: FrontendLayout,
    children: [ 
      {
        path: '', 
        name: 'Home', 
        component: Home
      }
    ],
    meta : {
      title : 'หน้าหลัก',
      description : 'หน้าหลักระบบคงคลังสินค้า'
    }
  },
  {
    path: '/about',
    component: FrontendLayout,
    children: [ 
      {
        path: '', 
        name: 'About', 
        component: About
      }
    ],
    meta : {
      title : 'เกี่ยวกับเรา',
      description : 'เกี่ยวกับเราระบบคงคลังสินค้า'
    }
  },
  {
    path: '/portfolio',
    component: FrontendLayout,
    children: [ 
      {
        path: '', 
        name: 'Portfolio', 
        component: Portfolio
      }
    ],
    meta : {
      title : 'ผลงาน',
      description : 'ผลงานระบบคงคลังสินค้า'
    }
  },
  {
    path: '/service',
    component: FrontendLayout,
    children: [ 
      {
        path: '', 
        name: 'Service', 
        component: Service
      }
    ],
    meta : {
      title : 'บริการ',
      description : 'บริการระบบคงคลังสินค้า'
    }
  },
  {
    path: '/contact',
    component: FrontendLayout,
    children: [ 
      {
        path: '', 
        name: 'Contact', 
        component: Contact
      }
    ],
    meta : {
      title : 'ติดต่อเรา',
      description : 'ติดต่อเราระบบคงคลังสินค้า'
    }
  },
  {
    path: '/register',
    component: FrontendLayout,
    children: [ 
      {
        path: '', 
        name: 'Register', 
        component: Register
      }
    ],
    meta : {
      title : 'สมัครสมาชิก',
      description : 'สมัครสมาชิกระบบคงคลังสินค้า'
    }
  },
  {
    path: '/login',
    component: FrontendLayout,
    children: [ 
      {
        path: '', 
        name: 'Login', 
        component: Login
      }
    ],
    meta : {
      title : 'เข้าสู่ระบบ',
      description : 'เข้าสู่ระบบคงคลังสินค้า'
    }
  },
  {
    path: '/forgotpassword',
    component: FrontendLayout,
    children: [ 
      {
        path: '', 
        name: 'ForgotPassword', 
        component: ForgotPassword
      }
    ],
    meta : {
      title : 'ลืมรหัสผ่าน',
      description : 'ลืมรหัสผ่านระบบคงคลังสินค้า'
    }
  },

  /** Backend Route */
  {
    path: '/backend',
    component: BackendLayout,
    children: [
      {
        path: '',
        name: 'Dashboard',
        component: Dashboard,
        beforeEnter: authGuard,
        // berforeEnter: (to, from, next) => {
        //   if(state) {  //เช็ค state ว่าสถานะมีการ login ไหม
        //     next() //ให้โหลด component Dashboard
        //   }else{
        //     next({name: 'Login'}) //กลับไปหน้า login
        //   }
        // }
      }
    ],
    meta : {
      title : 'Dashbaord',
      description : 'รายละเอียดหน้า Dashbaord'
    }
  },
  {
    path: '/backend',
    component: BackendLayout,
    children: [
      {
        path: 'products',
        name: 'Product',
        component: Product,
        beforeEnter: authGuard,
      }
    ],
    meta : {
      title : 'Product',
      description : 'รายละเอียดหน้า Products'
    }
  },

  //Error 404
  {
    path: '/:catchAll(.*)', //catch all ในกรณีที่ไม่เจอหน้าอะไรก็ตาม
    component: NotFound404,
    meta : {
      title : '404 ไม่พบหน้านี้',
      description : 'รายละเอียดหน้า 404 ไม่พบหน้านี้'
    }
  },

  /** Other Route */
  {
    path: '/MixinsFroms',
    name: 'MixinsFroms',
    component: MixinsFrom,
    meta : {
      title : 'MixinsFroms'
    }
  },
  {
    path: '/HomeWorkMixinsFroms',
    name: 'HomeWorkMixinsFroms',
    component: HomeWorkMixinsFrom,
    meta : {
      title : 'HomeWorkMixinsFroms'
    }
  },
  {
    path: '/Slots',
    name: 'Slots',
    component: Slot,
    meta : {
      title : 'Slots'
    }
  },
  {
    path: '/DynamicComponents',
    name: 'DynamicComponents',
    component: DynamicComponent,
    meta : {
      title : 'DynamicComponents'
    }
  },
  {
    path: '/CustomDirectives',
    name: 'CustomDirectives',
    component: CustomDirectives,
    meta : {
      title : 'CustomDirectives'
    }
  },
  {
    path: '/Filters',
    name: 'Filters',
    component: Filters,
    meta : {
      title : 'Filters'
    }
  },
  {
    path: '/RenderFunctions',
    name: 'RenderFunctions',
    component: RenderFunctions,
    meta : {
      title : 'RenderFunctions'
    }
  },
  {
    path: '/Jsx',
    name: 'Jsx',
    component: Jsx,
    meta : {
      title : 'Jsx'
    }
  },
  {
    path: '/NavigatLogin',
    name: 'NavigatLogin',
    component: NavigatLogin,
    meta : {
      title : 'NavigatLogin'
    }
  },
  {
    path: '/NavigatHome',
    name: 'NavigatHome',
    component: NavigatHome,
    meta : {
      title : 'NavigatHome'
    }
  },
  {
    path: '/onceClick',
    name: 'onceClick',
    component: onceClick,
    meta : {
      title : 'onceClick'
    }
  },
  {
    path: '/WebScraper',
    name: 'WebScraper',
    component: WebScraper,
    meta : {
      title : 'WebScraper'
    }
  },
  {
    // path: '/RoutePrams/:id?',
    // name: 'RoutePrams',
    // component: RoutePrams,
    // meta : {
    //   title : 'RoutePrams'
    // }

    path: '/RoutePrams/',
    component: FrontendLayout,
    children: [ 
      {
        path: ':id?', 
        name: 'RoutePrams', 
        component: RoutePrams
      }
    ],
    meta : {
      title : 'RoutePrams',
      description : 'RoutePrams'
    }
  },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})


//NavigationsGuard
router.beforeEach((to, from, next) => { //router.beforeEach ก่อนที่จะเข้าถึงหน้า
  /**
     to: วัตถุเส้นทาง เป้าหมาย ที่กำลังนำทางไป
     from: เส้นทางปัจจุบันที่กำลังนำทางออกไป
     next: ไปที่หน้าถัดไปเหมือนกับ router push

     ทุก route ในเว็บไซต์จะเข้ามาใน router.beforeEach ทั้งหมดก่อนที่จะเปิดหน้า components แสดงผล เพื่อเช็คว่า router name ตัวไหนเราได้เข้าเงือนไขบ้าง ทุกเงื่อนไขต้องใส่ next() เพราะ ให้ไปต่อที่จุดไหนเราก็กำหนดเข้ามา
   */
  
  console.log('Route beforeEach : ' + NavigationsStore.getters.isAuthen)
  console.log('Route to Name : ' + to.name)
  if(to.name !== 'NavigatLogin' && !NavigationsStore.getters.isAuthen) //ถ้าไม่ใช่หน้า Login และ isAuthen เป็น false
  {
    next({ name: 'NavigatLogin' })
  }else {
    console.log('Route isAuthen True');
    next()
  }
  
});

export default router
