<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <v-app-bar-nav-icon @click="drawer = !drawer"/>
      <v-toolbar-title>고객 관리 프로그램</v-toolbar-title>
      <v-spacer/>
      <v-btn icon to="/about">
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer">
    </v-navigation-drawer>
    <v-content>
      <router-view/>
    </v-content>
    <v-footer padless color="primary" dark absolute>
      <v-col
        class="text-center"
        cols="12"
      >
        {{ new Date().getFullYear() }} — <strong>Made by Alren Yang</strong>
      </v-col>
    </v-footer>
  </v-app>
</template>

<script>

export default {
  name: 'App',
  data: () => ({
      drawer: false,
      group: null,
    }),
  
}
</script>
