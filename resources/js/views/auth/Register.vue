<template>
    <div>
        <v-container class="fill-height" fluid>
            <v-row align="center" justify="center">
                <v-col cols="12" md="4" sm="8">
                    <v-card class="elevation-12">
                        <v-toolbar color="primary" dark flat>
                            <v-toolbar-title>Register form</v-toolbar-title>
                            <v-spacer/>
                        </v-toolbar>
<!--                        -->
                        <div v-if="validationErrors">
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
                            <v-form ref="registerForm">
                                <v-text-field
                                    label="Email"
                                    name="email"
                                    type="email"
                                    v-model="user.email"
                                />
                                <v-text-field
                                    label="Name"
                                    name="name"
                                    type="text"
                                    v-model="user.name"
                                />
                                <v-text-field
                                    id="password"
                                    label="Password"
                                    name="password"
                                    type="password"
                                    v-model="user.password"
                                />
                                <v-text-field
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
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
    name: "Register",
    data() {
        return {
            user: {
                email: '',
                name: '',
                password: '',
                password_confirmation: ''
            },
        }
    },
    computed: {
        ...mapGetters({
            validationErrors: 'user/errors'
        })
    },
    methods: {
        ...mapActions({
            register: 'user/registerUser',
        }),
        registerUser() {
            if(this.$refs.registerForm.validate()) {
                this.register( this.user)
            }
        },
    },
}
</script>

<style scoped>

</style>
