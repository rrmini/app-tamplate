<template>
    <div>
        <v-container class="fill-height" fluid>
            <v-row align="center" justify="center">
                <v-col cols="12" md="4" sm="8">
                    <v-card class="elevation-12">
                        <v-toolbar color="primary" dark flat>
                            <v-toolbar-title>Forgot password</v-toolbar-title>
                            <v-spacer/>
                        </v-toolbar>
                        <v-card-text>
                            <v-form ref="forgotPasswordForm">
                                <v-text-field
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

<!--                        <v-card-actions>-->
<!--                            <v-spacer/>-->
<!--                            <v-btn color="primary">-->
<!--                                <router-link :to="{name: 'register'}">Register</router-link>-->
<!--                            </v-btn>-->
<!--                        </v-card-actions>-->
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
    name: "ForgotPassword",
    data() {
        return {
                email: ''
        }
    },
    methods: {
        ...mapActions({
            forgotPassword: 'user/forgotPassword'
        }),
        sendForgotPassword() {
            if (this.$refs.forgotPasswordForm.validate()){
                console.log(this.email)
                this.forgotPassword({email: this.email})
                    .then((response) => {
                        console.log(response.data);
                    })
            }
        },
    },
}
</script>

<style scoped>

</style>
