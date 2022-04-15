<template>
    <div>
        <Card1 />
        <br><br><br>
        <Card2 />
    </div>
</template>

<script>
    import Card1 from '@/components/other/Mixins/MixinsCard1.vue'
    import Card2 from '@/components/other/Mixins/MixinsCard2.vue'
    export default {
        name: 'MixinsFrom',
        components: {
            Card1,
            Card2
        }
    }
</script>

<style lang="css" scoped>

</style>