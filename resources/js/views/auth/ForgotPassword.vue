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
                        <div v-if="invalidCredentials" class="pa-6">
                            <v-alert
                                style="margin: 15px 0;"
                                prominent
                                type="warning"
                                variant="outlined"
                                density="compact"
                                closable
                                close-label="Close Alert"
                                color="red"
                            >
                                {{ invalidCredentials }}
                            </v-alert>
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
                        <div v-if="result" class="pa-6">
                            <v-alert
                                style="margin: 15px 0;"
                                prominent
                                type="success"
                                variant="outlined"
                                density="compact"
                                closable
                                close-label="Close Alert"
                            >
                                Check your email
                            </v-alert>
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
                        <div v-if="result" class="text-subtitle-1 pa-6 d-flex justify-space-between">
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
                result: false
        }
    },
    computed: {
        ...mapGetters({
            validationErrors: 'user/errors',
            invalidCredentials: 'user/invalidCredentials'
        })
    },
    methods: {
        ...mapActions({
            forgotPassword: 'user/forgotPassword',
        }),
        sendForgotPassword() {
            if (this.$refs.forgotPasswordForm.validate()){
                // console.log(this.email)
                this.forgotPassword({email: this.email})
                    .then((response) => {
                        if (response.data){
                            this.result = true
                            console.log(response.data);
                        }
                    })
            }
        },
    },
}
</script>

<style scoped>

</style>
