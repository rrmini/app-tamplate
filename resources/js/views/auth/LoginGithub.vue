<template>
    <v-row
        class="fill-height"
        align-content="center"
        justify="center"
    >
        <v-col
            class="text-subtitle-1 text-center"
            cols="12"
        >
            Login with GitHub
        </v-col>
        <v-col cols="6">
            <v-progress-linear
                color="deep-purple accent-4"
                indeterminate
                rounded
                height="6"
            ></v-progress-linear>
        </v-col>
    </v-row>
</template>

<script>
import { mapActions } from 'vuex'

export default {
    name: 'LoginGithub',
    methods: {
        ...mapActions({
            login: 'user/loginGithubCallback',
            addNotification: 'application/addNotification',
        }),
        loginUser() {
            this.login({
                code: this.$route.query.code
            }).then((resp) => {
                if (resp.data.access_token) {
                    this.addNotification({
                        show: true,
                        text: 'Welcome',
                        color: 'success',
                    }).then(() => {
                        this.$router.push({name: 'dashboard'});
                    })
                } else {
                    this.$router.push({
                        name: 'home'
                    })
                }
            })
                .catch((error) => {
                    console.log(error)
                })
        },
    },
    created() {
        this.loginUser()
    },
}
</script>
