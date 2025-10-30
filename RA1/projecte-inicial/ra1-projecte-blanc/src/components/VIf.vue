<template>
    <div>
        <h2>V-IF - V-ELSE</h2>
        <p v-if="isLoggedIn">Benvingut, usuari</p>
        <p v-else>Si us plau, inicia sessió</p>
    </div>
</template>

<script setup>
    import { ref } from 'vue'

    const isLoggedIn = ref(false);
</script>