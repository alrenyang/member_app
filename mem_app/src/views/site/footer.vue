<template>
    <v-footer padless color="grey darken-4" dark absolute :footer="footer">
      <v-col
        class="text-center"
        cols="12"
      >
        {{ new Date().getFullYear() }} — <strong>{{footer}}</strong>
      </v-col>
    </v-footer>
</template>

<script>
export default {
    props: ['footer']
}
</script>