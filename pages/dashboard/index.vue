<template>
  <div>
    <div>
      <p>You are logged in with {{ authUser.email }}.</p>
      <Btn color="primary" outlined @click="logout">Logout</Btn>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState, mapGetters } from 'vuex'

export default Vue.extend({
  computed: {
    ...mapState({
      authUser: (state: any) => state.authUser,
    })/* ,
    ...mapGetters({
      isLoggedIn: 'isLoggedIn',
    }), */
  },
  // fetch() {
  //   // INFO -> this.$fire.auth user etc. are accessible
  //   // INFO -> this.$store.state.authUser is accessible even on server-side
  // },
  /* data: () => ({
    formData: {
      email: '',
      password: '',
    },
  }), */
  methods: {
    async logout() {
      try {
        await this.$fire.auth.signOut()
      } catch (e) {
        alert(e)
      }
    },
  },
})
</script>
