<template>
    <v-app>
<!--    <div>-->
<!--    <v-content>-->
        <v-app-bar app >
            <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
            <v-toolbar-title class="headline text-uppercase">
                <span>Admin App</span>
                <span class="font-weight-light">Panel</span>
            </v-toolbar-title>
            <v-spacer></v-spacer>
<!--            <v-btn small @click="login" v-if="loggedIn">Login</v-btn>-->
            <v-btn small @click="logout" v-if="loggedIn">Logout</v-btn>
        </v-app-bar>
        <v-navigation-drawer v-model="drawer"
                             :mini-variant.sync="drawer"
                             bottom
                             temporary>

        </v-navigation-drawer>

        <h1>APP LAYOUT</h1>
        <v-main>
            <v-container fluid>
                <router-view></router-view>
            </v-container>
        </v-main>

<!--    </v-content>-->
<!--    </div>-->
    </v-app>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
export default {
    name: "AppLayout",
    data: () => ({
        drawer: false,
    }),
    computed: {
        ...mapGetters({
            loggedIn: 'user/loggedIn',
        })
    },
    methods: {
        ...mapActions({
            logoutUser: 'user/logoutUser'
        }),
        logout () {
            this.logoutUser()
                .then(() => {
                    this.$router.push({name: 'login'})
                })
        },
    },
}
</script>

<style scoped>

</style>
