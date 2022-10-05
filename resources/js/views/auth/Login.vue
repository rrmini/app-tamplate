<template>
    <div>
        <v-container class="fill-height" fluid>
            <v-row align="center" justify="center">
                <v-col cols="12" md="4" sm="8">
                    <v-card class="elevation-12 my-4 pb-6">
                        <div class="text-h4 pa-6">Sign In</div>
                        <div class="text-subtitle-1 pa-6 d-flex justify-space-between">
                            <p>Don't have an account?</p>
                            <router-link :to="{name: 'register'}" class="text-decoration-none">Sign Up</router-link>
                        </div>
                        <div v-if="validationErrors" class="pa-6">
                            <v-alert
                                style="margin: 15px 0;"
                                v-for="(value, index) in validationErrors"
                                :key="index"
                                prominent
                                type="warning"
                                variant="outlined"
                                density="compact"
                                closable
                                close-label="Close Alert"
                                color="red"
                            >
                                {{ value }}
                            </v-alert>
                        </div>
                        <v-card-text>
                            <v-form ref="loginForm">
                                <v-text-field
                                    variant="outlined"
                                    clearable
                                    label="Email"
                                    name="email"
                                    type="email"
                                    v-model="user.email"
                                />
                                <v-text-field
                                    :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                                    :type="show ? 'text' : 'password'"
                                    variant="outlined"
                                    clearable
                                    @click:append="show = !show"
                                    id="password"
                                    label="Password"
                                    name="password"
                                    type="password"
                                    v-model="user.password"
                                />
                            </v-form>
<!--                            <v-btn @click="loginGithub" color="info">Login with github</v-btn>-->
                        </v-card-text>
                        <v-card-actions class="pa-5">
                            <v-spacer/>
                            <v-btn
                                block
                                color="secondary"
                                @click="loginUser"
                                variant="outlined"
                            >Sign In</v-btn>
                        </v-card-actions>
                        <div class="text-center mt-6">
                            <div class="d-flex align-center justify-center gap">
                                <v-btn class="bg-secondary mx-3"  icon="mdi-github" ></v-btn>
                                <v-btn class="bg-secondary mx-3"  icon="mdi-vk" ></v-btn>
                            </div>
                        </div>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
    name: 'Login',
    data() {
        return {
            user: {
                email: '',
                password: ''
            },
            show: false,
        }
    },
    computed: {
        ...mapGetters({
            validationErrors: 'user/errors'
        })
    },
    methods: {
        ...mapActions({
            login: 'user/loginUser'
        }),
        loginUser() {
            if (this.$refs.loginForm.validate()){
                this.login(this.user)
                    .then(() => {
                        this.$router.push({name: 'dashboard'})
                    })
            }
        },
    },
    created() {
        console.log(this.$store.state)
    }
}
</script>
