<template>
    <div>
        <my-component>
            <template #title>
                <img style="width: 100%;" src="https://i.guim.co.uk/img/media/26392d05302e02f7bf4eb143bb84c8097d09144b/446_167_3683_2210/master/3683.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=49ed3252c0b2ffb49cf8b508892e452d" alt="">
            </template>

            <template #default="slotProps">
                <div class="custom-component"> {{ slotProps.item.fname }} {{ slotProps.item.lname }} </div> 
            </template>

            <template v-slot:action>
                <button style="width: 100%; height: 40px; background-color: #8080c0">Click</button>
            </template>

        </my-component>
    </div>
</template>

<script>
    import MyComponent from '@/components/other/Slot/MyComponent.vue'

    export default {
        name: 'App',

        components: {
            MyComponent
        }
    }
</script>

<style lang="css" scoped>
    .custom-component {
        padding: 24px;
        background-color: green;
        color: white;
    }
</style>