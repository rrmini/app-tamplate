<template>
    <v-app>
        <router-view></router-view>
        <v-snackbar
            :key="index"
            @input="updateNotification($event, index)"
            v-for="(snackbar, index) in allNotifications"
            v-model="snackbar.show"
            :color="snackbar.color"
            variant="outlined"
            @afterLeave="updateNotification($event, index)"
        >
            {{ snackbar.text }}
            <template v-slot:actions>
                <v-btn
                    @click="removeNotification(index)"
                    color="snackbar.color"
                    text
                >Close</v-btn>
            </template>
        </v-snackbar>
    </v-app>
</template>

<script>

import { mapGetters, mapActions} from 'vuex'

export default {

    name: 'App',
    data: () => ({
        drawer: false,
    }),
    created() {
        this.checkUserState()
    },
    computed: {
        ...mapGetters({
            loggedIn: 'user/loggedIn',
            allNotifications: "application/notifications"
        }),
    },
    methods: {
        ...mapActions({
            checkUserState: 'user/setLoggedInState',
            addNotification: 'application/addNotification',
            removeNotification: 'application/removeNotification',
            currentUser: 'user/currentUser'
        }),
        updateNotification(show, index) {
            if (!show) {
                this.removeNotification(index)
            }
        }
    }
}
</script>
