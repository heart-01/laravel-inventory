<template>
    <div>
        Login <br><br>
        username: <input v-model="username" class='border' type="text"> <br><br>
        password: <input v-model="password" class='border' type="text"> <br><br>
        <button  @click='login' class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded" > 
            Login 
        </button>

        {{ username }}
        {{ password }}
    </div>
</template>

<script>
import { mapActions } from 'vuex'

    export default {
        name: 'NavigationsLogin',

        data () {
            return { 
                username: '',
                password: ''
            }
        },

        methods: {
            ...mapActions({ //เรียกใช้ Action ใน store
                setAuthens: 'setAuthen' //เรียกใช้ method setAuthen จากไฟล์ store แล้วเก็บลงในตัวแปร setAuthens
            }),
            login () {
                if (this.username === 'admin' && this.password === 'admin') 
                {
                    this.setAuthens(true) //เรียกใช้ method setAuthens จาก mapActions
                    this.$router.push({ path: 'http://localhost:8080/NavigatHome' })
                }else{
                    alert('incorrect user or password')
                }
            }
        }

    }
</script>