<template>
    <div class="">
        <v-row>
            <v-col cols="12" md="5" lg="4">
                <v-card>
                    <v-card-text>
                        <h6 class="text-h6">Details</h6>
                        <v-divider/>
                        <v-list>
                            <v-list-item>
                                <v-list-item-subtitle class="font-weight-medium text-sm-h6">Name: <span class="text-body-2">{{userDetails.name}}</span></v-list-item-subtitle>
                            </v-list-item>
                            <v-list-item>
                                <v-list-item-subtitle class="font-weight-medium text-sm-h6">Email: <span class="text-body-2">{{userDetails.email}}</span></v-list-item-subtitle>
                            </v-list-item>
                            <v-list-item>
                                <v-list-item-subtitle class="font-weight-medium text-sm-h6">Joined: <span class="text-body-2">{{userDetails.created_at}}</span></v-list-item-subtitle>
                            </v-list-item>
                        </v-list>
                    </v-card-text>
                    <v-card-text class="d-flex justify-center">
                        <v-btn id="overlay" color="secondary">EDIt</v-btn>
                    </v-card-text>
                </v-card>
            </v-col>
            <v-col cols="12" md="7" lg="8">
                <v-card>
                    <v-tabs
                        v-model="tab"
                        background-color="primary"
                    >
                        <v-tab value="one">
                            <v-icon start>
                                mdi-lock
                            </v-icon>
                            security
                        </v-tab>
                        <v-tab value="two">Item Two</v-tab>
                        <v-tab value="three">Item Three</v-tab>
                    </v-tabs>
                    <v-card-text>
                        <v-window v-model="tab">
                            <v-window-item value="one">
                                <v-row>
                                    <v-col cols="12">
                                        <v-card>
                                            <v-card-item>
                                                <v-card-title>Change Password</v-card-title>
                                            </v-card-item>
                                            <v-card-text>
                                                <v-alert
                                                    color="yellow-darken-4"
                                                    class="mb-6"
                                                    variant="flat"
                                                    title="Ensure that these requirements are met"
                                                >Minimum 8 characters long, uppercase & symbol</v-alert>
                                                <v-form ref="changePasswordForm">
                                                    <v-row>
                                                        <v-col cols="12" >
                                                            <v-text-field
                                                                :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                                                                :type="show ? 'text' : 'password'"
                                                                variant="outlined"
                                                                clearable
                                                                id="password"
                                                                label="Password"
                                                                name="password"
                                                                v-model="user.oldPassword"
                                                                @click:append="show = !show"
                                                            />
                                                        </v-col>
                                                        <v-col cols="12" md="6">
                                                            <v-text-field
                                                                :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                                                                :type="show1 ? 'text' : 'password'"
                                                                variant="outlined"
                                                                clearable
                                                                id="newPassword"
                                                                label="New Password"
                                                                name="newPassword"
                                                                v-model="user.newPassword"
                                                                @click:append="show1 = !show1"
                                                            />
                                                        </v-col>
                                                        <v-col cols="12" md="6">
                                                            <v-text-field
                                                                :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                                                                :type="show2 ? 'text' : 'password'"
                                                                variant="outlined"
                                                                clearable
                                                                id="password_confirmation"
                                                                label="Password Confirmation"
                                                                name="password_confirmation"
                                                                v-model="user.newPasswordConfirmation"
                                                                @click:append="show2 = !show2"
                                                            />
                                                        </v-col>
                                                        <v-col cols="12" >
                                                            <v-btn
                                                                color="primary"
                                                                variant="flat"
                                                                @click="changePassword"
                                                            >change password</v-btn>
                                                        </v-col>
                                                    </v-row>
                                                </v-form>
                                            </v-card-text>
                                        </v-card>
                                    </v-col>
                                </v-row>
                            </v-window-item>

                            <v-window-item value="two">
                                Two
                            </v-window-item>

                            <v-window-item value="three">
                                Three
                            </v-window-item>
                        </v-window>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
        <v-overlay activator="#overlay" v-model="overlay" contained class="align-center justify-center">
            <v-card class="pa-sm-9 pa-5">
                <v-card-item class="text-center">
                    <v-card-title class="text-h5">Edit User Information</v-card-title>
                    <v-card-subtitle>Updating user details will receive a privacy audit.</v-card-subtitle>
                </v-card-item>
                <v-card-text>
                    <v-form class="mt-6" ref="changeDetailsForm">
                        <v-row>
                            <v-col cols="12" md="6">
                                <v-text-field
                                    v-model="userDetails.name"
                                    density="comfortable"
                                    variant="outlined"
                                    label="Name"
                                    type="text"
                                >
                                </v-text-field>
                            </v-col>
                            <v-col cols="12" md="6">
                                <v-text-field
                                    v-model="userDetails.email"
                                    density="comfortable"
                                    variant="outlined"
                                    label="Email"
                                    name="email"
                                    type="email"
                                >
                                </v-text-field>
                            </v-col>
                            <v-col cols="12"  class="d-flex flex-wrap justify-center" style="gap: 1rem;">
                                <v-btn @click="changeDetails" color="primary" >Save</v-btn>
                                <v-btn @click="cancel" color="grey" type="button">Cancel</v-btn>
                            </v-col>
                        </v-row>
                    </v-form>
                </v-card-text>
            </v-card>
        </v-overlay>
    </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'

export default {
    name: "Profile",
    data() {
        return {
            user: {
                name: '',
                email: '',
                oldPassword: '',
                newPassword: '',
                newPasswordConfirmation: '',
            },
            tab: null,
            show: false,
            show1: false,
            show2: false,
            overlay: false,
        }
    },
    computed: {
        ...mapGetters({
            userDetails: "user/userDetails"
        })
    },
    methods: {
        ...mapActions({
            currentUser: 'user/currentUser',
            updateDetails: "user/updateDetails",
            changeUserPassword: "user/changePassword"
        }),
        changeDetails() {
            if (!this.$refs.changeDetailsForm.validate()) {
                return false;
            }

            this.updateDetails(this.userDetails)
                .then()
                .catch()

            this.overlay = false;
        },
        changePassword() {
            if (!this.$refs.changePasswordForm.validate()) {
                return false;
            }
            this.changeUserPassword()
            console.log('changePassword')
        },
        cancel() {
            this.currentUser();
            this.overlay = false;
        },
    },
    created() {
        this.currentUser();
    }
}
</script>

<style scoped>

</style>
