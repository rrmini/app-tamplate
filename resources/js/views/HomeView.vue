<template>
    <v-app>
        <v-app-bar app >
            <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
            <v-toolbar-title class="headline text-uppercase">
                <span>Admin</span>
                <span class="font-weight-light">Panel</span>
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn small @click="logout" v-if="loggedIn">Logout</v-btn>
        </v-app-bar>
        <v-navigation-drawer v-model="drawer"
                             :mini-variant.sync="drawer"
                             bottom
                             temporary></v-navigation-drawer>
        <v-main >
            <v-container fluid>
                <router-view></router-view>
            </v-container>
        </v-main>
    </v-app>
</template>

<script>
// @ is an alias to /src

import { mapGetters, mapActions} from 'vuex'

export default {

    name: 'HomeView',
    components: {},
    data: () => ({
        drawer: false,
    }),
    created() {
        this.checkUserState().then(() =>{
            if (this.loggedIn) {
                this.currentUser();
            }
        });
    },
    computed: {
        ...mapGetters({
            loggedIn: 'user/loggedIn'
        })
    },
    methods: {
        ...mapActions({
            logoutUser: 'user/logoutUser',
            checkUserState: 'user/setLoggedInState',
            currentUser: 'user/currentUser'
        }),
        logout () {
            this.logoutUser()
                .then(() => {
                    this.$router.push({name: 'login'})
                })
        }
    }
}
</script>
