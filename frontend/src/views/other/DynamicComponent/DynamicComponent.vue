<template>
    <div class="px-5">
        <button @click="setComponent(0)" class="bg-blue-500 mr-5 mt-10 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">A</button>
        <button @click="setComponent(1)" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">B</button>
    </div>

    <div class="px-5" style="margin-top: 24px">
        <component :is="renderComponent"></component>
    </div>
</template>

<script>
import AComponent from '@/components/other/DynamicComponent/AComponent.vue'
import BComponent from '@/components/other/DynamicComponent/BComponent.vue'

export default {
    name: 'DynamicComponent',
    components: {
        AComponent,
        BComponent
    },

    data() {
        return {
            currentTabComponent: 0
        }
    },

    computed: {
        renderComponent() {
            if (this.currentTabComponent === 0){
                return AComponent
            }
            return BComponent
        }
    },

    methods: {
        setComponent (value) {
            this.currentTabComponent = value
        }
    }
}
</script>

<style lang="css" scoped>

</style>