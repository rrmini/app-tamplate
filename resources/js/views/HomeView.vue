<template>
    <v-app>
        <v-app-bar app >
            <v-toolbar-title class="headline text-uppercase">
                <span>Admin</span>
                <span class="font-weight-light">Panel</span>
            </v-toolbar-title>
            <v-spacer></v-spacer>
        </v-app-bar>
        <v-content>
            <router-view></router-view>
        </v-content>
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
  }
}
</script>
