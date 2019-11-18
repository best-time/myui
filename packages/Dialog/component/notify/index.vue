<template>
    <div class="m-notify" :class="classes" v-html="mes"></div>
</template>

<script>
    export default {
        data() {
            return {
                classes: ''
            }
        },
        props: {
            mes: String,
            timeout: Number,
            callback: Function
        }
    }
</script>
<style lang="less">
@import "./../index.less";
</style>