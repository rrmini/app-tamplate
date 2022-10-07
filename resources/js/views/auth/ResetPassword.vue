<template>
    <div>
        <v-container class="fill-height" fluid>
            <v-row align="center" justify="center">
                <v-col cols="12" md="4" sm="8">
                    <v-card class="elevation-12">
<!--                        <v-toolbar color="primary" dark flat>-->
<!--                            <v-toolbar-title>Login form</v-toolbar-title>-->
<!--                            <v-spacer/>-->
<!--                        </v-toolbar>-->
                        <div class="text-h4 pa-6">Reset password</div>
<!--                        <div class="text-subtitle-1 pa-6 d-flex justify-space-between">-->
<!--                            <p>Already have an account?</p>-->
<!--                            <router-link :to="{name: 'login'}" class="text-decoration-none">Sign in</router-link>-->
<!--                        </div>-->
                        <v-card-text>
                            <v-form  ref="resetPasswordForm">
                                <v-text-field
                                    variant="outlined"
                                    clearable
                                    label="Email"
                                    name="email"
                                    type="email"
                                    v-model="user.email"
                                />
                                <v-text-field
                                    variant="outlined"
                                    clearable
                                    id="password"
                                    label="Password"
                                    name="password"
                                    type="password"
                                    v-model="user.password"
                                />
                                <v-text-field
                                    variant="outlined"
                                    clearable
                                    id="password_confirmation"
                                    label="Password Confirmation"
                                    name="password_confirmation"
                                    type="password"
                                    v-model="user.password_confirmation"
                                />
                            </v-form>
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer/>
                            <v-btn @click="sendResetPassword" color="primary">Reset password</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
<!--        <router-link :to="{name: 'login'}">Login</router-link>-->
    </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
    name: "ResetPassword",
    data () {
        return{
            user: {
                email: '',
                password: '',
                password_confirmation: '',
            },
        }
    },
    methods: {
        ...mapActions({
            resetPassword: 'user/resetPassword'
        }),
        sendResetPassword() {
            if (this.$refs.resetPasswordForm.validate()) {
                const token = this.$route.params.token;
                this.resetPassword({...this.user, token})
                    .then(() => {
                        window.location.replace('/login')
                    })
            }
        },
    },
}
</script>

<style scoped>

</style>
