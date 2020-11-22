<template>
  <div>
    <ServiceTitle title="Firebase Authentication" />
    <SubTitle title="SignUp / LogIn" />
    <Form>
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="email">
          Email
        </label>
        <input
          v-model="formData.email"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Email"
          type="email"
          autocomplete="username"
        />
      </div>
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="email">
          Password
        </label>
        <input
          v-model="formData.password"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Password"
          type="password"
          autocomplete="current-password"
        />
      </div>
      <Btn @click="signInUser">Sign In</Btn>
    </Form>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState, mapGetters } from 'vuex'

export default Vue.extend({
  computed: {
    ...mapState({
      authUser: (state: any) => state.authUser,
    }),
    ...mapGetters({
      isLoggedIn: 'isLoggedIn',
    }),
  },
  // fetch() {
  //   // INFO -> this.$fire.auth user etc. are accessible
  //   // INFO -> this.$store.state.authUser is accessible even on server-side
  // },
  data: () => ({
    formData: {
      email: '',
      password: '',
    },
  }),
  methods: {
    async signInUser() {
      try {
        await this.$fire.auth.signInWithEmailAndPassword(
          this.formData.email,
          this.formData.password
				);
				this.$router.replace({ name: 'dashboard' })
      } catch (e) {
        alert(e)
      }
    }
  },
})
</script>
