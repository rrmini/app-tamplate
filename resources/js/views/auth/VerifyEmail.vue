<template>
    <div class="text-center">
        <h1>Verifying email</h1>
    </div>
    <v-row justify="center">
        <v-img :src="image"></v-img>
    </v-row>
</template>

<script>
import {mapActions} from 'vuex';
import image from '../../assets/401.848ce656.png'

export default {
    name: "VerifyEmail",
    data() {
        return {
            image
        }
    },
    methods: {
        ...mapActions({
            verifyEmail: 'user/verifyEmail',
            addNotification: 'application/addNotification'
        }),
    },
    created() {
        this.verifyEmail(this.$route.query)
            .then((response) => {
                this.addNotification({
                    show: true,
                    text: response.data.message,
                    color: 'success'
                }).then(() => {
                    this.$router.push({name: 'login'})
            })
        });
    }
}
</script>

<style scoped>

</style>
