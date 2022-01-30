<template>
    <div>
        <!-- <RenderFunctionsComponent v-bind:level=1 /> -->
        <RenderFunctionsComponent :level=5 :textH='test' />
    </div>
</template>

<script>
import RenderFunctionsComponent from '@/components/other/RenderFunctions/RenderFunctionsComponent.vue'

    export default {
        name: 'RenderFunctions',
        components: {
            RenderFunctionsComponent
        }
    }
</script>