<template>
    <div>
        <v-container class="fill-height" fluid>
            <v-row align="center" justify="center">
                <v-col cols="12" md="4" sm="8">
                    <v-card class="elevation-12">
                        <div class="text-h4 pa-6">Forgot password</div>
                        <div class="text-subtitle-1 pa-6 d-flex justify-space-between">
                            <p>Don't have an account?</p>
                            <router-link :to="{name: 'register'}" class="text-decoration-none">Sign Up</router-link>
                        </div>
                        <v-card-text>
                            <v-form ref="forgotPasswordForm">
                                <v-text-field
                                    variant="outlined"
                                    clearable
                                    label="Email"
                                    name="email"
                                    type="email"
                                    v-model="email"
                                />
                            </v-form>
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer/>
                            <v-btn @click="sendForgotPassword" color="primary">Send email</v-btn>
                        </v-card-actions>
                        <div  class="text-subtitle-1 pa-6 d-flex justify-space-between">
                            <p>Try again</p>
                            <router-link :to="{name: 'login'}" class="text-decoration-none">Sign in</router-link>
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
    name: "ForgotPassword",
    data() {
        return {
                email: '',
        }
    },
    methods: {
        ...mapActions({
            forgotPassword: 'user/forgotPassword',
            addNotification: 'application/addNotification'
        }),
        sendForgotPassword() {
            if (this.$refs.forgotPasswordForm.validate()){
                this.forgotPassword({email: this.email})
                    .then((response) => {
                        if (response.data){
                            this.addNotification({
                                show: true,
                                text: response.data.message,
                                color: 'success',
                            })
                        }
                    })
                    .catch((error) => {
                        if (error.response.data.error){
                            this.addNotification({
                                show: true,
                                text: error.response.data.error,
                                color: 'error'
                            })
                        } else if (error.response.data.errors){
                            this.addNotification({
                                show: true,
                                text: error.response.data.message,
                                color: 'error'
                            })
                        }
                    })
            }
        },
    },
}
</script>

<style scoped>

</style>
