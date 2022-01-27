<template>

    <div class="flex items-center justify-between my-8">
        <h2 class="my-6 text-sm font-semibold text-gray-700 md:text-xl dark:text-gray-200">
            Product list ({{ products.total }})
        </h2>

        <!-- Form ค้นหาสินค้า -->
        <div class="flex justify-center flex-1 lg:mr-32">
            <div class="relative w-full max-w-xl ml-4 mr-6 focus-within:text-gray-500">
                <div class="absolute inset-y-0 flex items-center pl-2">
                    <svg
                    class="w-4 h-4"
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 20 20">
                    <path
                        fill-rule="evenodd"
                        d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                        clip-rule="evenodd"></path>
                    </svg>
                </div>
                <form @submit.prevent="onSubmit">
                    <input
                        v-model="keyword"
                        class="w-full py-2 pl-8 pr-2 text-sm text-gray-700 placeholder-gray-600 bg-gray-200 border-0 rounded-md"
                        type="text"
                        placeholder="ป้อนชื่อสินค้าที่ต้องการค้นหา"
                        aria-label="Search"
                    />
                    <button @click="submitSearchForm" type="submit" class="hidden">Submit</button>
                </form>
            </div>

            <div>
                <button @click="submitSearchForm" class="flex items-center justify-between px-4 py-1.5 mx-1 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-blue-500 border border-transparent rounded-lg active:bg-purple-600 hover:bg-blue-700 focus:outline-none focus:shadow-outline-purple">
                    <svg class="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <span>ค้นหา</span>
                </button>
            </div>

            <div>
                <button @click="resetSearchForm" class="flex items-center justify-between px-4 py-1.5 mx-1 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-yellow-500 border border-transparent rounded-lg active:bg-purple-600 hover:bg-yellow-700 focus:outline-none focus:shadow-outline-purple">
                    <svg class="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    <span>ล้าง</span>
                </button>
            </div>
        </div>

        <!-- ปุ่มเพิ่มสินค้า -->
        <button @click="openModalAddProduct" class="flex items-center justify-between px-4 py-2 mx-1 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-green-500 border border-transparent rounded-lg active:bg-purple-600 hover:bg-green-700 focus:outline-none focus:shadow-outline-purple">
            <svg class="w-4 h-4 mr-2 -ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
            </svg>
            <span>เพิ่ม</span>
        </button>
    </div>

    <!-- ตารางแสดงสินค้า -->
    <div class="w-full overflow-hidden rounded-lg shadow-xs">
        <div class="w-full overflow-x-auto">
            <table class="w-full whitespace-no-wrap">
                <thead>
                    <tr class="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
                        <th class="px-4 py-3">ID</th>
                        <th class="px-4 py-3">Product</th>
                        <th class="px-4 py-3">Price</th>
                        <th class="px-4 py-3">By</th>
                        <th class="px-4 py-3">Manage</th>
                    </tr>
                </thead>
                <!-- v-for เป็นการ loop object data products ใน vue -->
                    <!-- :key="product.id" เป็นการ binding ข้อมูล หรือ ผูกข้อมูล ต้องใช้คีย์ที่ไม่ซ้ำกัน เลยใช้ product.id -->
                <tbody v-for="product in products.data" :key="product.id" class="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
                    
                    <tr class="text-gray-700 dark:text-gray-400 hover:bg-blue-100">
                        <td class="px-4 py-3 text-sm">{{ product.id }}</td>
                        <td class="px-4 py-3">
                            <div class="flex items-center text-sm">
                                <div class="relative hidden w-8 h-8 mr-3 rounded-full md:block">
                                    <img class="object-cover w-full h-full rounded-full" :src="product.image" alt="" loading="lazy"/>
                                    <div class="absolute inset-0 rounded-full shadow-inner" aria-hidden="true"></div>
                                </div>
                                <div>
                                    <p class="font-semibold">{{ product.name }}</p>
                                    <p class="text-xs text-gray-600 dark:text-gray-400">Created {{ format_date(product.created_at) }}</p>
                                </div>
                            </div>
                        </td>
                        <td class="px-4 py-3 text-sm">{{ format_price(product.price) }}</td>
                        <td class="px-4 py-3 text-sm">
                            <div class="flex items-center text-sm">
                                <div class="relative hidden w-8 h-8 mr-3 rounded-full md:block">
                                    <img class="object-cover w-full h-full rounded-full" :src="product.user.avatar" alt="" loading="lazy"/>
                                    <div class="absolute inset-0 rounded-full shadow-inner" aria-hidden="true"></div>
                                </div>
                                <div>
                                    <p class="font-semibold"> {{ product.user.fullname }} </p>
                                    <p class="text-xs text-gray-600 dark:text-gray-400">Updated {{ format_date(product.updated_at) }}</p>
                                </div>
                            </div>
                        </td>
                        <td class="px-4 py-3 text-sm">
                            <button @click="openModalEditProduct(product.id)" class="px-4 py-2 mx-1 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-yellow-400 border border-transparent rounded-lg active:bg-purple-600 hover:bg-yellow-500 focus:outline-none focus:shadow-outline-purple">
                                <svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                </svg>
                            </button>
                            <button @click="onclickDeleteProduct(product.id, product.name)" class="px-4 py-2 mx-1 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-red-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-red-700 focus:outline-none focus:shadow-outline-purple">
                                <svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                            </button>
                        </td>
                    </tr>

                </tbody>
            </table>

            <!-- แสดงผลตัวแบ่งหน้าจอ ต้อง binding ตัวแปรเข้าไปด้วยเป็น format ของ VueTailwindPagination -->
            <!-- page-changed จะรับเลขหน้าให้เราอัตโนมัติไปใส่ไว้ใน parameter event -->
            <VueTailwindPagination
                :current="currentPage"
                :total="total"
                :per-page="perPage"
                @page-changed="onPageClick($event)"
            />
            
        </div>
    </div>

    <!-- Popup สำหรับเพิ่มรายการสินค้าใหม่ -->
    <!-- v if ใช้ในการเช็คว่าตัวแปรเป็นจริงก็จะแสดงผล -->
    <div v-if="showAddModal" id="addProductModal" class="fixed top-0 left-0 flex items-center justify-center w-full h-full modal">
        <div class="absolute w-full h-full bg-gray-900 opacity-70 modal-overlay"></div>
         <div class="z-50 w-11/12 p-5 mx-auto overflow-y-auto bg-white rounded shadow-lg h-4/5 modal-container md:max-w-md">
            <!-- Header -->
            <div class="flex items-center justify-center w-full h-auto">
                <div class="flex items-start justify-start w-full h-auto py-2 text-xl font-bold">
                    เพิ่มสินค้าใหม่
                </div>
                <div @click="closeModalAddProduct" class="flex justify-center w-1/12 h-auto cursor-pointer">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                </div>
            <!--Header End-->
            </div>
            <!-- Modal Content-->
            <div class="w-full h-auto mb-4">
                <!-- @submit.prevent="onSubmit" กด submit แล้วไม่ให้ reload -->
                <!-- ref เป็น reference อ้างอิงฟอร์ม ๆ นั้น -->
                <form ref="addProductFrom" @submit.prevent="onSubmit" enctype="multipart/form-data" > <!-- enctype="multipart/form-data" เป็นการบอกว่าเราจะมีการเรียกใช้ฟอร์มที่มีมากกว่า textbox ใช้เป็นรูปภาพ เอกสาร-->
                    <label class="block my-3 text-gray-700 text-md" for="formAdd.name">* ชื่อสินค้า</label>
                    <input v-model="formAdd.name" class="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow" type="text" placeholder="Product name">
                    <div v-if="v$.formAdd.name.$error" class="mt-2 text-sm text-red-500"> {{ v$.formAdd.name.$errors[0].$message }}</div>

                    <label class="block my-3 text-gray-700 text-md" for="formAdd.slug">* สลัก</label>
                    <input v-model="formAdd.slug" class="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow" type="text" placeholder="product-name">
                    <div v-if="v$.formAdd.slug.$error" class="mt-2 text-sm text-red-500"> {{ v$.formAdd.slug.$errors[0].$message }}</div>
        
                    <label class="block my-3 text-gray-700 text-md" for="formAdd.description">รายละเอียด</label>
                    <textarea
                    v-model="formAdd.description"
                    class="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow"
                    rows="5"
                    placeholder="Product description"
                    ></textarea>

                    <label class="block my-3 text-gray-700 text-md" for="formAdd.price">ราคา</label>
                    <input v-model="formAdd.price" class="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow" type="text" placeholder="0.00">
                    <div v-if="v$.formAdd.price.$error" class="mt-2 text-sm text-red-500"> {{ v$.formAdd.price.$errors[0].$message }}</div>
                
                    <div class="mt-4">
                        <!-- :src เป็นการ bilnding ผูกค่า image ใส่เข้าไปใน img src -->
                        <!-- v-if="imgUrl" ใช้ในการเช็คว่าถ้า imgUrl มีค่า -->
                        <img v-if="formAdd.imgUrl"  :src="formAdd.imgUrl" class="w-ful" />
                    </div>

                    <label class="block my-3 text-gray-700 text-md" for="formAdd.image">ภาพสินค้า</label>
                    <!-- @change เป็น event เมื่อมีการเลือกให้ทำงานฟังชั่น onFileChange -->
                    <input ref="fileuploadAdd" @change="onFileChange" class="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow" type="file">
         
                    <div class="grid grid-cols-3 gap-4">
                        
                        <div class="col-span-2">
                            <button @click="submitForm" class="w-full px-4 py-2 mt-4 font-medium leading-5 text-white transition-colors duration-150 bg-blue-600 border border-transparent rounded-lg text-md active:bg-purple-600 hover:bg-blue-700 focus:outline-none focus:shadow-outline-purple">
                                บันทึกรายการ
                            </button>
                        </div>

                        <div>
                            <button @click="onResetFormAdd" class="w-full px-4 py-2 mt-4 font-medium leading-5 text-white transition-colors duration-150 bg-gray-500 border border-transparent rounded-lg text-md active:bg-purple-600 hover:bg-gray-700 focus:outline-none focus:shadow-outline-purple">
                                ล้าง
                            </button>
                        </div>
                        
                    </div>
                </form>
            </div>
         </div>
    </div>

    <!-- Popup สำหรับการแก้ไขรายการสินค้า -->
    <div v-if="showEditModal" id="editProductModal" class="fixed top-0 left-0 flex items-center justify-center w-full h-full modal">
        <div class="absolute w-full h-full bg-gray-900 opacity-70 modal-overlay"></div>

         <div class="z-50 w-11/12 p-5 mx-auto overflow-y-auto bg-white rounded shadow-lg h-5/6 modal-container md:max-w-md">
            <!-- Header -->
            <div class="flex items-center justify-center w-full h-auto">
                <div class="flex items-start justify-start w-full h-auto py-2 text-xl font-bold">
                    แก้ไขสินค้า
                </div>
                <div @click="closeModalEditProduct" class="flex justify-center w-1/12 h-auto cursor-pointer">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                </div>
            <!--Header End-->
            </div>
            <!-- Modal Content-->
            <div class="w-full h-auto mb-4">

                <form ref="editProductFrom" @submit.prevent="onSubmit" enctype="multipart/form-data">
                    
                    <label class="block my-3 text-gray-700 text-md" for="formEdit.name">ชื่อสินค้า</label>
                    <input v-model="formEdit.name" class="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow" type="text" placeholder="Product name">
                    <div v-if="v$.formEdit.name.$error" class="mt-2 text-sm text-red-500"> {{ v$.formEdit.name.$errors[0].$message }}</div>

                    <label class="block my-3 text-gray-700 text-md" for="formEdit.slug">สลัก</label>
                    <input v-model="formEdit.slug" class="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow" type="text" placeholder="product-name">
                    <div v-if="v$.formEdit.slug.$error" class="mt-2 text-sm text-red-500"> {{ v$.formEdit.slug.$errors[0].$message }}</div>

                    <label class="block my-3 text-gray-700 text-md" for="formEdit.description">รายละเอียด</label>
                    <textarea
                    v-model="formEdit.description"
                    class="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow"
                    rows="5"
                    placeholder="Product description"
                    ></textarea>

                    <label class="block my-3 text-gray-700 text-md" for="formEdit.price">ราคา</label>
                    <input v-model="formEdit.price" class="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow" type="text" placeholder="0.00">
                    <div v-if="v$.formEdit.price.$error" class="mt-2 text-sm text-red-500"> {{ v$.formEdit.price.$errors[0].$message }}</div>

                    <div class="mt-4">
                        <img v-if="formEdit.imgUrl" :src="formEdit.imgUrl" class="w-ful" />
                    </div>
                    <label class="block my-3 text-gray-700 text-md" for="formEdit.image">ภาพสินค้า</label>
                    <input @change="onFileChangeEdit" ref="fileuploadEdit" class="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow" type="file">
                    
                    <button @click="submitFormEdit(formEdit.id)" class="w-full px-4 py-2 mt-4 font-medium leading-5 text-white transition-colors duration-150 bg-blue-600 border border-transparent rounded-lg text-md active:bg-purple-600 hover:bg-blue-700 focus:outline-none focus:shadow-outline-purple">
                        อัพเดทข้อมูล
                    </button>
                    
                </form>
               
            </div>
            <!-- End of Modal Content-->
            </div>
    </div>

</template>

<script>
// Vue Tailwind Pagination
import '@ocrv/vue-tailwind-pagination/dist/style.css'
import VueTailwindPagination from '@ocrv/vue-tailwind-pagination'
// Header API
import http from '@/services/BackendService'
// Vuelidate
import useValidate from '@vuelidate/core' //import Vuelidate
import { required, helpers, numeric , minLength } from '@vuelidate/validators' //import Vuelidate rule ต่าง ๆ ที่ vuelidate มี
//Moment จัดการเรื่องวันที่ / เวลา
import moment from 'moment'

export default {
    data(){
        return { 
            /** ตัวแปรสำหรับเรียกใช้งาน validation */
            v$: useValidate(), //v$: useValidate format ของ useValidate ในการประกาศตัวแปร เรียก vuelidate

            /** ตัวแปรสำหรับเก็บข้อมูลสินค้าที่อ่านจาก API */
            products: [ //ตัวแปรที่ดึงข้อมูลสินค้า

            ],

            currentPage: 0, //ตัวแปรที่แบ่งหน้า
            perPage: 0, //ตัวแปรบอกว่าหน้า 1 มีข้อมูลสินค้ากี่ชิ้น
            total: 0, //สินค้าทั้งหมด

            /** ตัวแปรสำหรับเปิด/ปิด popup */
            showAddModal: false, // popup เพิ่มสินค้า
            showEditModal: false, // popup แก้ไขสินค้า

            /** ตัวแปรสำหรับผูกฟอร์มเพิ่มสินค้า */
            formAdd: {
                name: '',
                description: '',
                slug: '',
                price: '',
                imgSrc: '',
                fileName: '',
                imgUrl: '',
                file: null,
            },

            /** ตัวแปรสำหรับแก้ไขข้อมูลสินค้า */
            formEdit: {
                name: '',
                description: '',
                slug: '',
                price: '',
                imgSrc: '',
                fileName: '',
                imgUrl: '',
                file: null,
            },

            /** ตัวแปรสำหรับค้นหาข้อมูล */
            keyword: ''
        }
    },

    components: { //Component ที่ต้องการใช้งาน
        VueTailwindPagination //เรียกใช้งาน Component VueTailwindPagination ตัวแบ่งหน้า
    },

    methods: {
        /************************************************************************************
        * ส่วนของการอ่านข้อมูลจาก API และแสดงผลในตาราง
        *************************************************************************************/
        //function อ่านสินค้าจาก API ทั้งหมดแบบแบ่งหน้า
        async getProducts(pageNumber) {
            let response = await http.get(`products?page=${pageNumber}`) //request api
            let responseProduct = response.data  //data ที่ได้จาก api
            this.products = responseProduct //นำข้อมูลใส่ในตัวแปร data products
            
            console.log(this.products);

            this.currentPage = responseProduct.current_page //ตัวแปรที่แบ่งหน้า
            this.perPage = responseProduct.per_page //ตัวแปรบอกว่าหน้า 1 มีข้อมูลสินค้ากี่ชิ้น
            this.total = responseProduct.total //สินค้าทั้งหมด
        },

        //function อ่านสินค้าจาก API เมื่อมีการค้นหา และ แบ่งหน้า
        async getProductsSearch(pageNumber) {
            let response = await http.get(`products/search/${this.keyword}?page=${pageNumber}`) //request api
            let responseProduct = response.data  //data ที่ได้จาก api
            this.products = responseProduct //นำข้อมูลใส่ในตัวแปร data products
            
            console.log(this.products);

            this.currentPage = responseProduct.current_page
            this.perPage = responseProduct.per_page
            this.total = responseProduct.total
        },

        //สร้างฟังก์ชั่นสำหรับการคลิ๊กเปลี่ยนหน้า
        onPageClick(event) { //เราคลิ๊กที่เลขหน้าตัวไหนก็จะดึงเลขหน้านั้นมาใส่ในตัว parameter event
            this.currentPage = event //นำข้อมูลใส่ในตัวแปร data currentPage
            if(this.keyword == ""){ //ไม่มีการค้นหา
                this.getProducts(this.currentPage) //ดึงข้อมูลทั้งหมด
            }else{ 
                this.getProductsSearch(this.currentPage) //ดึงข้อมูลแบบเปลี่ยนหน้า
            }
        },

        /***********************************************************************************
        * ส่วนของการเพิ่มสินค้าใหม่
        ************************************************************************************/
        // สร้างฟังก์ชั่นสำหรับเปิด popup เพิ่มสินค้าใหม่
        openModalAddProduct() {
            this.showAddModal = true
        },

        // สร้างฟังก์ชั่นสำหรับปิด popup เพิ่มสินค้าใหม่
        closeModalAddProduct() {
            this.showAddModal = false
            this.onResetFormAdd()
        },

        //สร้างฟังชั่นก์เมื่อผู้ใชมีการเลือกรูปภาพในช่องภาพสินค้า
        onFileChange(event) {
            const file = event.target.files[0] //ดึง path file ลำดับที่ 0 คือชื่อของรูป
            this.formAdd.file = event.target.files[0] //ตัวแปร file data เก็บข้อมูลชื่อของรูป
            this.formAdd.imgUrl = URL.createObjectURL(file) //อ่าน url ไฟล์ภาพที่อัพโหลดเข้ามา
        },

        //สร้างฟังชั่นก์สำหรับเคลียร์ข้อมูลในฟอร์มสินค้า
        onResetFormAdd() {
            // การ clear ทั้งหมดในฟอร์มเราจะต้องใช้ refs เป็นตัวใช้งาน
            // การเคลียร์ค่าทั้งหมดในฟอร์ม เราจะต้อง ref
            //refs เป็น reference อ้างอิงฟอร์ม ๆ นั้นแล้วก็สั่ง clear ค่า
            this.$refs.addProductFrom.reset() //สั่งล้างค่าในฟอร์ม
            this.$refs.fileuploadAdd.value = null //สั่งล้างข้อมูลแคชรูปภาพใน memory
            //สั่งล้างข้อมูลตัวแปร
            this.formAdd.name = ''
            this.formAdd.description = ''
            this.formAdd.slug = ''
            this.formAdd.price = ''
            this.formAdd.imgSrc = ''
            this.formAdd.imgUrl = ''
            this.formAdd.file = ''
            this.formAdd.fileName = ''
        },

        //สร้างฟังชั่นก์สำหรับบันทึกข้อมูลสินค้า
        submitForm() 
        {
            this.v$.$validate() //format ของ vuelidate ในการเข้าถึง method validations()
            if(!this.v$.formAdd.$error) { //ถ้า method validations() ไม่ error
                //ใช้ Formdata ของ HTML 5 API ในการรับค่าจากฟอร์มที่มีการแนบไฟล์
                //ความสามารถของ FormData ของ HTML 5 จะเป็น Object ประเภทหนึ่งที่อยู่ใน Browser เป็นมาตรฐานของ HTML 5 ที่มีการแนบไฟล์แนบรูปเราจะใช้ FormData รับข้อมูลจาก Form แล้วส่งไปให้ API ภาษาที่ใช้ในการเรียก FormData เป็น Javascript
                let data = new FormData()
                data.append('name', this.formAdd.name) //data.append เป็นการส่งค่าไปชื่อ name เก็บค่าเป็น data this.name
                data.append('description', this.formAdd.description)
                data.append('slug', this.formAdd.slug)
                data.append('price', this.formAdd.price)
                data.append('file', this.formAdd.file)

                // console.log(data)
                //ส่งค่าไปยัง Laravel API Product Add
                http.post('products',
                    data
                ).then((res)=>{
                    //เพิ่มสินค้าเสร็จ
                    console.log(res)
                    //เคลียค่าใน Form
                    this.closeModalAddProduct()

                    //เมื่อเพิ่มสินค้าเสร็จแล้วให้ดึงรายการล่าสุดมาแสดงเป็นหน้าที่ 1
                    this.getProducts(this.currentPage)

                    //เรียกใช้งาน popup ของ sweetalert 2
                    const Toast = this.$swal.mixin({
                        toast: true,
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 3000,
                        timerProgressBar: true,
                        didOpen: (toast) => {
                            toast.addEventListener('mouseenter', this.$swal.stopTimer)
                            toast.addEventListener('mouseleave', this.$swal.resumeTimer)
                        }
                    })
                    Toast.fire({
                        icon: 'success',
                        title: 'เพิ่มข้อมูลใหม่เรียบร้อย'
                    })
                }).catch(error => {
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                });
            }
        },

        /***********************************************************************************
        * ส่วนของการแก้ไขข้อมูลสินค้า
        ************************************************************************************/
        // สร้างฟังก์ชั่นสำหรับเปิด popup แก้ไขสินค้า
        openModalEditProduct(id)
        {
            http.get(`products/${id}`).then(response => {
                // console.log(response.data);
                this.formEdit.id = response.data.id
                this.formEdit.name = response.data.name
                this.formEdit.description = response.data.description
                this.formEdit.slug = response.data.slug
                this.formEdit.price = response.data.price
                this.formEdit.imgUrl = response.data.image

                this.showEditModal = true
            })
        },

        // สร้างฟังก์ชั่นสำหรับปิด popup แก้ไขสินค้า
        closeModalEditProduct()
        {
            this.showEditModal = false
            this.onResetFormEdit()
        },

        //สร้างฟังชั่นก์สำหรับเคลียร์ข้อมูลในฟอร์มสินค้า
        onResetFormEdit() {
            // การ clear ทั้งหมดในฟอร์มเราจะต้องใช้ refs เป็นตัวใช้งาน
            // การเคลียร์ค่าทั้งหมดในฟอร์ม เราจะต้อง ref
            //refs เป็น reference อ้างอิงฟอร์ม ๆ นั้นแล้วก็สั่ง clear ค่า
            this.$refs.editProductFrom.reset() //สั่งล้างค่าในฟอร์ม
            this.$refs.fileuploadEdit.value = null //สั่งล้างข้อมูลแคชรูปภาพใน memory
            //สั่งล้างข้อมูลตัวแปร
            this.formEdit.name = ''
            this.formEdit.description = ''
            this.formEdit.slug = ''
            this.formEdit.price = ''
            this.formEdit.imgSrc = ''
            this.formEdit.imgUrl = ''
            this.formEdit.file = ''
            this.formEdit.fileName = ''
        },

        //สร้างฟังชั่นก์เมื่อผู้ใชมีการเลือกรูปภาพในช่องภาพสินค้า
        onFileChangeEdit(event) {
            let file = event.target.files[0] //ดึง path file ลำดับที่ 0 คือชื่อของรูป
            this.formEdit.file = event.target.files[0] //ตัวแปร file data เก็บข้อมูลชื่อของรูป
            this.formEdit.imgUrl = URL.createObjectURL(file) //อ่าน url ไฟล์ภาพ
        },

        //สร้างฟังก์ชั่นสำหรับอัพเดตข้อมูล
        submitFormEdit(id)
        {
            // console.log(id);
            this.v$.$validate()
            // console.log(this.v$);
            // this.v$.formEdit.name.$error //เช็คการ error ของ fild ename
            if(!this.v$.formEdit.$error)
            {
                let data = new FormData()
                data.append('name', this.formEdit.name) //data.append เป็นการส่งค่าไปชื่อ name เก็บค่าเป็น data this.name
                data.append('description', this.formEdit.description)
                data.append('slug', this.formEdit.slug)
                data.append('price', this.formEdit.price)
                data.append('file', this.formEdit.file)

                //axios จะไม่รองรับการส่งข้อมูลแบบ Multipart/form-data ใน Method การส่งข้อมูลแบบ PUT, PATCH จะรองรับ Method POST, GET, DELETE เมื่อยิงเข้า API วิธีแก้ไขเมื่อเราจะใช้  Method PUT, PATCH ยิงเข้า Laravel เราจะใช้ Method POST แล้วให้ POST ใน axios ส่ง Method PATCH ไป
                // Send Patch request to Laravel
                data.append('_method', 'PATCH') //_method จะเป็น Header เมื่อ Laravel เจอจะเข้าใจว่าเป็น Method PATCH

                http.post(`products/${id}`, 
                    data
                ).then(response => {
                    console.log(response.data)

                    //เมื่อแก้ไขสินค้าเสร็จแล้วให้ดึงรายการล่าสุดมาแสดงเป็นหน้าที่อยู่ปัจจุบัน
                    if(this.keyword == "")
                    {
                        this.getProducts(this.currentPage)
                    }else{
                        this.getProductsSearch(this.currentPage)
                    }

                    //เรียกใช้งาน popup ของ sweetalert 2
                    const Toast = this.$swal.mixin({
                        toast: true,
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 1000,
                        timerProgressBar: true,
                        didOpen: (toast) => {
                            toast.addEventListener('mouseenter', this.$swal.stopTimer)
                            toast.addEventListener('mouseleave', this.$swal.resumeTimer)
                        }
                    })

                    Toast.fire({
                        icon: 'success',
                        title: 'แก้ไขข้อมูลใหม่เรียบร้อย'
                    }).then(()=>{
                        // ปิดหน้าต่าง popup modal แก้ไข
                        this.closeModalEditProduct()
                    })

                }).catch(error => {
                    //console data error api
                    console.log(error.response.data)
                    console.log(error.response.status)
                    console.log(error.response.headers)

                    this.$swal.fire({
                        position: 'center',
                        icon: 'warning',
                        title: "เกิดข้อผิดลาดกรุณาทำรายการใหม่อีกครั้ง",
                        showConfirmButton: true,
                    }).then(()=>{
                        this.closeModalEditProduct()
                        location.reload()
                    })
                })
            }else{
                alert('error')
            }
        },

        /***********************************************************************************
        * ส่วนของการลบสินค้า
        ************************************************************************************/
       // สร้างฟังก์ชั่นสำหรับลบสินค้า
        onclickDeleteProduct(id, name){
            this.$swal.fire({
                title: `ยืนยันการลบรายการ <br> ${name}`,
                text: "", 
                icon: "warning",
                iconColor: '#d33',
                // width: 700,
                showCancelButton: true,
                confirmButtonColor: '#28a745',
                confirmButtonText: 'ยืนยัน',
                cancelButtonColor: '#d33',
                cancelButtonText: 'ยกเลิก'
            }).then(result => {
                if(result.isConfirmed) {
                    http.delete(`products/${id}`).then((res)=>{
                        console.log(res);
                        this.$swal.fire({
                            position: 'center',
                            icon: 'success',
                            title: "ลบรายการเรียบร้อย",
                            showConfirmButton: false,
                            timer: 1500
                        })
                        
                        //เมื่อลบสินค้าเสร็จแล้วให้ดึงรายการล่าสุดมาแสดงเป็นหน้าที่อยู่ปัจจุบัน
                        if(this.keyword == "")
                        {
                            this.getProducts(this.currentPage)
                        }else{
                            this.getProductsSearch(this.currentPage)
                        }

                    }).catch(error => {
                        //console data error api
                        console.log(error.res.data)
                        console.log(error.res.status)
                        console.log(error.res.headers)
                    })
                }
            })
        },

        /***********************************************************************************
         * ส่วนของการค้นหาสินค้า
        ************************************************************************************/
        submitSearchForm(){
            if(this.keyword != ""){
                //เรียกค้นหาไปยัง api ของ laravel
                http.get(`products/search/${this.keyword}`).then(response =>{
                    let responseProduct = response.data  //data ที่ได้จาก api
                    this.products = responseProduct //นำข้อมูลใส่ในตัวแปร data products
                    
                    console.log(this.products);

                    this.currentPage = responseProduct.current_page
                    this.perPage = responseProduct.per_page
                    this.total = responseProduct.total
                })
            }else{
                this.$swal.fire('ป้อนชื่อสินค้าที่ต้องการค้นหาก่อน')
            }
        },

        //สร้างฟังชั่นสำหรับเคลียร์ข้อมูลการค้นหา
        resetSearchForm(){
            this.currentPage = 1;
            this.getProducts(this.currentPage)
            this.keyword = ''
        },

        /***********************************************************************************
        * ส่วนของฟังชั่นอื่น ๆ ที่ใช้งาน
        ************************************************************************************/

        //สร้างฟังชั่นสำหรับจัดรูปแบบวันที่ด้วย moment.js
        format_date(value)
        {
            if(value)
            {
                return moment(String(value)).add(543, 'year').format('DD/MM/YYYY hh:mm:ss') //format 1/1/2564 11:00:59
            }
        },

        //สร้างฟังชั่นก์แปลงยอดเงินให้เป็นรูปแบบสกุลเงิน 10000.50
        format_price(value)
        {
            let val = (value/1).toFixed(2).replace(',', ',')
            return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        }        

    },

    //mounted ขณะที่โหลดหน้าเว็บสำเร็จแล้วครั้งแรก
    mounted(){
        this.currentPage = 1; //เปลี่ยนเลขแบ่งหน้า
        this.getProducts(this.currentPage) //เรียกใช้งาน function getProducts
    },

    //function validations ใช้สำหรับ validat ข้อมูลใน form
    validations() {
        return { 
            formAdd: {
                name: { 
                    required: helpers.withMessage('ป้อนชื่อสินค้าก่อน', required), 
                    minLength : helpers.withMessage(
                        ({
                            $params
                        }) => `ชื่อสินค้าต้องไม่น้อยกว่า ${$params.min} ตัวอักษร`,
                        minLength(5)
                    )
                },
                slug: { 
                    required: helpers.withMessage('ป้อนสลักก่อน', required)
                },
                price: { 
                    required: helpers.withMessage('ป้อนราคาก่อน', required),
                    numeric: helpers.withMessage('ป้อนราคาเป็นตัวเลขเท่านั้น', numeric)
                }
            },
            formEdit: {
                name: { 
                    required: helpers.withMessage('ป้อนชื่อสินค้าก่อน', required), 
                    minLength : helpers.withMessage(
                        ({
                            $params
                        }) => `ชื่อสินค้าต้องไม่น้อยกว่า ${$params.min} ตัวอักษร`,
                        minLength(5)
                    )
                },
                slug: { 
                    required: helpers.withMessage('ป้อนสลักก่อน', required)
                },
                price: { 
                    required: helpers.withMessage('ป้อนราคาก่อน', required),
                    numeric: helpers.withMessage('ป้อนราคาเป็นตัวเลขเท่านั้น', numeric)
                }
            }
        }
    }
}
</script>