<template>
    <div>
        Home <br>

        <button  @click='logout' class="bg-transparent hover:bg-red-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded" > 
            logout 
        </button>
    </div>
</template>

<script>
import { mapActions } from 'vuex'

    export default {
        name: 'NavigationsHome',

        methods: {
            ...mapActions({ //เรียกใช้ Action ใน store
                setAuthens: 'setAuthen' //เรียกใช้ method setAuthen จากไฟล์ store แล้วเก็บลงในตัวแปร setAuthens
            }),
            logout() {
                this.setAuthens(false) //เรียกใช้ method setAuthens จาก mapActions
                alert('logout success')
                this.$router.push({ name: 'NavigatLogin' })
            }
        }
    }
</script>