<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <v-app-bar-nav-icon @click="drawer = !drawer"/>
      <site-title :title="title"></site-title>
      <v-spacer/>
      <v-btn icon to="/about">
        <v-icon @click="testclick">mdi-magnify</v-icon>
      </v-btn>
    </v-app-bar>
    <v-navigation-drawer app v-model="drawer">
      <v-divider></v-divider>
      <site-menu></site-menu>
    </v-navigation-drawer>
    <v-content>
      <router-view/>
    </v-content>
    <site-footer :footer="footer"></site-footer>
  </v-app>
</template>

<script>
import SiteTitle from '@/views/site/title.vue'
import SiteFooter from '@/views/site/footer.vue'
import SiteMenu from '@/views/site/menu'
import auth from '@/plugins/firebase'
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const provider = new GoogleAuthProvider();

export default {
  components: {SiteTitle, SiteFooter, SiteMenu},
  name: 'App',
  data: () => ({
      drawer: false,
      items: [],
      title: '고객 관리 프로그램',
      footer: 'Made by Alren Yang Korea'
  }),
  
  methods: {
    testclick() {
      signInWithPopup(auth, provider)
      console.log('testconsol')
    },
  },

  
}
</script>
