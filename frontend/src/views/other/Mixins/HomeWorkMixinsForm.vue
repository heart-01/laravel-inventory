<template>
    <div>
        <Card1 :title="this.items[0].title" :detail="this.items[0].detail" />
        <Card2 :title="this.items[1].title" :detail="this.items[1].detail" />
        <Card3 :title="this.items[2].title" :detail="this.items[2].detail" />
    </div>
</template>

<script>
    import Card1 from '@/components/other/Mixins/HomeWorkMixinsCard1.vue'
    import Card2 from '@/components/other/Mixins/HomeWorkMixinsCard2.vue'
    import Card3 from '@/components/other/Mixins/HomeWorkMixinsCard3.vue'
    
    export default {
        name: 'HomeWorkMixinsCard',

        created() {
            this.getItems()
        },

        data() {
            return {
                items: [
                    { title: 'Card 1', detail: 'Card 1 so cool!' },
                    { title: 'Card 2', detail: 'Card 2 so Beauty!' },
                    { title: 'Card 3', detail: 'Card 3 so Amazing!' }
                ]
            }
        },

        components: {
            Card1,
            Card2,
            Card3,
        },

         methods: {
            getItems() {
                console.log(this.items)
                // console.log(this.items[0].title)
            }
        }
    }
</script>

<style lang="css" scoped>

</style>