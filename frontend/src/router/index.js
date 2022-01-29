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

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
