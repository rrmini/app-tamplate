<template>
    <div class="">
        <h1>Dashboard</h1>
    </div>
</template>

<script>
    export default {
        mounted() {
            this.$store.dispatch('user/currentUser')
        }
    }
</script>
