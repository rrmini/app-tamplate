<template>
    <div class="">
        <v-row>
            <v-col>
                <v-card>
                    <v-card-text>
                        <h6 class="text-h6">Details</h6>
                        <v-divider/>
                        <v-list>
                            <v-list-item>
                                <v-list-item-content>
                                    <v-list-item-subtitle>Username: <span class="text-body-2">{{userDetails.name}}</span></v-list-item-subtitle>
                                </v-list-item-content>
                            </v-list-item>
                            <v-list-item>
                                <v-list-item-content>
                                    <v-list-item-subtitle>Email: <span class="text-body-2">{{userDetails.email}}</span></v-list-item-subtitle>
                                </v-list-item-content>
                            </v-list-item>
                            <v-list-item>
                                <v-list-item-content>
                                    <v-list-item-subtitle>Joined: <span class="text-body-2">{{userDetails.created_at}}</span></v-list-item-subtitle>
                                </v-list-item-content>
                            </v-list-item>
                        </v-list>
                    </v-card-text>
                    <v-card-text class="d-flex justify-center">
                        <v-btn id="overlay" color="secondary">EDIt</v-btn>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
        <v-overlay activator="#overlay" contained class="align-center justify-center">
            <v-card class="pa-sm-9 pa-5">
                <v-card-item class="text-center">
                    <v-card-title class="text-h5">Edit User Information</v-card-title>
                    <v-card-subtitle>Updating user details will receive a privacy audit.</v-card-subtitle>
                </v-card-item>
                <v-card-text>
                    <v-form class="mt-6">
                        <v-row>
                            <v-col cols="12" md="6">
                                <v-text-field
                                    model-value="John Doe"
                                    density="comfortable"
                                    variant="outlined"
                                    label="Name"
                                    name="name"
                                    type="text"
                                >
                                </v-text-field>
                            </v-col>
                            <v-col cols="12" md="6">
                                <v-text-field
                                    model-value=""
                                    density="comfortable"
                                    variant="outlined"
                                    label="Email"
                                    name="email"
                                    type="email"
                                >
                                </v-text-field>
                            </v-col>
                            <v-col cols="12"  class="d-flex flex-wrap justify-center" style="gap: 1rem;">
                                <v-btn color="primary" type="submit">Save</v-btn>
                                <v-btn color="grey" type="button">Cancel</v-btn>
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
                oldPassword: '',
                newPassword: '',
                newPasswordConfirmation: '',
            }
        }
    },
    computed: {
        ...mapGetters({
            userDetails: "user/userDetails"
        })
    },
}
</script>

<style scoped>

</style>
