<template>
    <div>
        <v-container class="fill-height" fluid>
            <v-row align="center" justify="center">
                <v-col cols="12" md="4" sm="8">
                    <v-card class="elevation-12">
                        <v-toolbar color="primary" dark flat>
                            <v-toolbar-title>Login form</v-toolbar-title>
                            <v-spacer/>
                        </v-toolbar>
                        <v-card-text>
                            <v-form :value="formValid" ref="registerForm">
                                <v-text-field
                                    :rules="emailRules"
                                    label="Email"
                                    name="email"
                                    type="email"
                                    v-model="user.email"
                                />
                                <v-text-field
                                    :rules="nameRules"
                                    label="Name"
                                    name="name"
                                    type="text"
                                    v-model="user.name"
                                />
                                <v-text-field
                                    :rules="passwordRules"
                                    id="password"
                                    label="Password"
                                    name="password"
                                    type="password"
                                    v-model="user.password"
                                />
                                <v-text-field
                                    :rules="passwordRules"
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
                            <v-btn @click="registerUser" color="primary">Register</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
        <v-snackbar
            v-model="registerSnackbar"
            multi-line
        >
            {{ text }}

            <template v-slot:actions>
                <v-btn
                    color="red"
                    variant="text"
                    @click="registerSnackbar = false"
                >
                    Close
                </v-btn>
            </template>
        </v-snackbar>
    </div>
</template>

<script>
import axios from "axios";
export default {
    name: "Register",
    data() {
        return {
            formValid: false,
            registerSnackbar: false,
            text: '',
            color: '',
            user: {
                email: '',
                name: '',
                password: '',
                password_confirmation: ''
            },
        }
    },
    methods: {
        registerUser() {
            if(this.$refs.registerForm.validate()) {
                axios
                    .post('/api/register', this.user)
                .then((response) => {
                    if (response.data && response.data.success) {
                        // this.registerSnackbar = true
                        // this.text ='Success'
                        // this.color=  'success'
                        this.$router.push ({
                            name: 'login'
                        })
                    }
                })
                .catch(() => {
                    this.registerSnackbar = true
                    this.text ='Failed'
                    this.color=  'danger'
                })
            }
        },
    },
}
</script>

<style scoped>

</style>
