<script setup>
import { RouterView } from 'vue-router';
import { RouterLink } from 'vue-router';


</script>

<template>
  <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/frameworks">Frameworkus</RouterLink>
  </nav>
  <RouterView/>
</template>

<style scoped>
  .flex {
    display: flex;
  }

  .gap {
    gap:20px;
  }

  nav {
    display: flex;
    gap: 20px;
  }
</style>
