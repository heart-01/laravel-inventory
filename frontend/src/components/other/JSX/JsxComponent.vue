<script lang="jsx">
    export default {
        name: 'JsxComponent',

        render () {
            return (<div> 
                        <div class='mb-5' > { this.message } </div>
                        {
                            this.item.map(item => {
                                return (
                                    <div> { item } </div>
                                )
                            })
                        }

                        <div v-html={ this.html }></div>
                    </div>)
        },

        props: {
            message: {
                type: String,
                default: ''
            },
            item: {
                type: Array,
                default: () => ([])
            },
            html: {
                type: String,
                default: ''
            }
        }
    }
</script>