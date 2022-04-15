<template>
    <div class="p-52" >
        id From Home ---> {{ id }}
    </div>
</template>

<script>
    export default {
        data(){
            return {
                id: 1
            }
        },

        mounted(){
            console.log(this.$route)
            // this.id = this.$route.params.id
            this.id = this.$route.params.id ? this.$route.params.id : this.id
        }
    }
</script>