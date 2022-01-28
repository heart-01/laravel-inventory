<template>
    <div>
        <div class="my-components" style="margin-bottom: 24px">Slot</div>

        <!-- การเปิด Slot เหมือนเป็นการเปิดช่องทางของข้อมูลให้ข้อมูลมาใส่ในช่องนี้ -->
        <div class="card">
            <div class="card-title">
                <slot name="title"></slot>
            </div>
            <div class="card-title">
                <slot :item="user"></slot>                
            </div>
            <div class="card-action">
                <slot name="action"></slot>                
            </div>
        </div>

    </div>
</template>

<script>
    export default {
        name: 'MyComponent',

        data() {
            return {
                user: {
                    fname: 'Siwat',
                    lname: 'Jermwatthana',
                }
            }
        },
    }
</script>

<style lang="css" scoped>
    .my-components {
        padding: 24px;
        background: gray;
        color: white;
    }
    .card {
        background:black;
        color: white;
    }
    .card-title {
        padding: 24px;
        font-size: 20px;
        font-weight: 700;
    }
    .card-action {
        padding: 24px;
        font-size: 18px;
    }
</style>