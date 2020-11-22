<template>
  <div class="max-w-full">
    <Logo />
    <div v-for="component in exampleComponents" :key="component.__file">
      <hr class="mt-5 mb-5" />
      <component :is="component"></component>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Logo from '~/components/Logo/index.vue'
import Auth from '~/components/examples/Auth.vue'
import Firestore from '~/components/examples/Firestore.vue'
import Storage from '~/components/examples/Storage.vue'
import VuexStore from '~/components/examples/VuexStore.vue'
import Analytics from '~/components/examples/Analytics.vue'

export default Vue.extend({
  components: {
    Logo,
    Auth,
    Firestore,
    Storage,
    VuexStore,
    Analytics,
  },
  asyncData({ app }) {
    // INFO -> app.$fire.firestore etc. are accessible
  },
  data: () => ({
    exampleComponents: [
      Auth,
      Firestore,
      Storage,
      Analytics,
      VuexStore,
    ],
  }),
})
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
</style>
