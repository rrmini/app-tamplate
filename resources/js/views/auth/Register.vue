<template>
    <div>
        <v-container class="fill-height" fluid>
            <v-row align="center" justify="center">
                <v-col cols="12" md="4" sm="8">
                    <v-card class="elevation-12 my-4 pb-6">
                        <div class="text-h4 pa-6">Sign Up</div>
                        <div class="text-subtitle-1 pa-6 d-flex justify-space-between">
                            <p>Already have an account?</p>
                                <router-link :to="{name: 'login'}" class="text-decoration-none">Sign in</router-link>
                        </div>
                        <v-card-text>
                            <v-form ref="registerForm">
                                <v-text-field
                                    variant="outlined"
                                    clearable
                                    label="Name"
                                    name="name"
                                    type="text"
                                    v-model="user.name"
                                />
                                <v-text-field
                                    variant="outlined"
                                    clearable
                                    label="Email"
                                    name="email"
                                    type="email"
                                    v-model="user.email"
                                />
                                <v-text-field
                                    :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                                    :type="show1 ? 'text' : 'password'"
                                    variant="outlined"
                                    clearable
                                    id="password"
                                    label="Password"
                                    name="password"
                                    v-model="user.password"
                                    @click:append="show1 = !show1"
                                />
                                <v-text-field
                                    :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                                    :type="show2 ? 'text' : 'password'"
                                    variant="outlined"
                                    clearable
                                    id="password_confirmation"
                                    label="Password Confirmation"
                                    name="password_confirmation"
                                    v-model="user.password_confirmation"
                                    @click:append="show2 = !show2"
                                />
                            </v-form>
                        </v-card-text>
                        <v-card-actions class="pa-5">
                            <v-spacer/>
                            <v-btn
                                block
                                color="secondary"
                                @click="registerUser"
                                variant="outlined"
                            >Sign Up</v-btn>
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
    name: "Register",
    data() {
        return {
            show1: false,
            show2: false,
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
            addNotification: 'application/addNotification'
        }),
        registerUser() {
            if(this.$refs.registerForm.validate()) {
                this.register( this.user)
                    .then((response) => {
                        if (response.data && response.data.success){
                            this.addNotification({
                                show: true,
                                text: response.data.message,
                                color: 'success',
                            })
                                .then(() => {
                                    this.$router.push({name: 'login'});
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
