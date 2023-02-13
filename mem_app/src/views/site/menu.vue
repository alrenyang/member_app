<template>
    <div>
        <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="font-weight-black text-h6">
            Customer management
          </v-list-item-title>
          <v-list-item-subtitle>
            DataBase Programs
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-divider></v-divider>
      <v-list dense nav>
        <v-list-group
          v-for="(item, i) in items"
          :key="i"
          v-model="item.active"
          :prepend-icon="item.icon"
          no-action
        >
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title v-text="item.title"></v-list-item-title>
            </v-list-item-content>
          </template>
  
          <v-list-item
            v-for="subItem in item.subItems"
            :key="subItem.title"
            :to="subItem.to"
          >
            <v-list-item-content>
              <v-list-item-title v-text="subItem.title"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
      </v-list>
    </div>
  </template>
  <script>
  export default {
    props: ['footer'],
    data () {
      return {
        items: [
          {
            title: 'home',
            icon: 'mdi-home',
            subItems: [
              {
                title: 'Dashboard',
                to: '/'
              },
              {
                title: 'About',
                to: '/about'
              }
            ]
          },
          {
            title: '고객관리',
            active: true,
            icon: 'mdi-account',
            subItems: [
              {
                title: '고객정보',
                to: '/Member01'
              }
            ]
          }
        ]
      }
    }
  }
  </script>