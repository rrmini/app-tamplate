<template>
    <div>
        <v-container class="fill-height" fluid>
            <v-row align="center" justify="center">
                <v-col cols="12" md="4" sm="8">
                    <v-card class="elevation-12">
                        <div class="text-h4 pa-6">Reset password</div>
                        <v-card-text>
                            <v-form  ref="resetPasswordForm">
                                <v-text-field
                                    variant="outlined"
                                    clearable
                                    label="Email"
                                    name="email"
                                    type="email"
                                    v-model="user.email"
                                    :rules="[...requiredRules, ...emailRules]"
                                />
                                <v-text-field
                                    :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                                    :type="show1 ? 'text' : 'password'"
                                    @click:append="show1 = !show1"
                                    variant="outlined"
                                    clearable
                                    id="password"
                                    label="Password"
                                    name="password"
                                    type="password"
                                    v-model="user.password"
                                    :rules="[...requiredRules, ...passwordRules]"
                                />
                                <v-text-field
                                    :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                                    :type="show2 ? 'text' : 'password'"
                                    @click:append="show2 = !show2"
                                    variant="outlined"
                                    clearable
                                    id="password_confirmation"
                                    label="Password Confirmation"
                                    name="password_confirmation"
                                    type="password"
                                    v-model="user.password_confirmation"
                                    :rules="[...requiredRules, ...passwordRules, newPasswordValidator]"
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
    </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex';
import ValidationMixin from "../../../mixins/validationMixin";

export default {
    name: "ResetPassword",
    mixins: [ValidationMixin],
    data() {
        return {
            show1: false,
            show2: false,
            user: {
                email: '',
                password: '',
                password_confirmation: '',
            },
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
            resetPassword: 'user/resetPassword',
            addNotification: 'application/addNotification'
        }),
        sendResetPassword() {
            if (this.$refs.resetPasswordForm.validate()) {
                const token = this.$route.params.token;
                this.resetPassword({...this.user, token})
                    .then((response) => {
                        console.log(response.data)
                        if (response.data && response.data.success) {

                            this.addNotification({
                                show: true,
                                text: response.data.message,
                                color: 'success',
                            })
                                .then(() => {
                                    window.location.replace('/login')
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
                                text: error.response.data.errors[0],
                                color: 'error'
                            })
                        }
                    })
            }
        },
        newPasswordValidator() {
            return (this.user.newPasswordConfirmation === this.user.newPassword) || 'New password is not confirmed';
        },
    },
}
</script>

<style scoped>

</style>
