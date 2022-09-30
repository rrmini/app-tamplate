<template>
    <v-app>
        <v-app-bar app >
            <v-toolbar-title class="headline text-uppercase">
                <span>Admin</span>
                <span class="font-weight-light">Panel</span>
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn small @click="logout" v-if="loggedIn">Logout</v-btn>
        </v-app-bar>
        <v-main>
            <v-container fluid>
                <router-view></router-view>
            </v-container>
        </v-main>

<!--        <v-main>-->
<!--            <HelloWorld/>-->
<!--        </v-main>-->
    </v-app>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {

    name: 'HomeView',
    components: {
        HelloWorld
    },
    data: () => ({
        loggedIn: false,
    }),
    created() {
        if (localStorage.getItem('token')){
            this.loggedIn = true
        }
    },
    methods: {
        logout () {
            localStorage.removeItem('token')
            this.$router.push({name: 'login'})
        }
    }
}
</script>
