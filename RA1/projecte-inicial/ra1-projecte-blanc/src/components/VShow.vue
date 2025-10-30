<template>

    <button @click="mostrar = !mostrar">Alternar visibilitat</button>
    <p v-show="mostrar">Aquest text es mostra o amaga sense elimnar-lo del DOM</p>
</template>

<script setup>
    import { ref } from 'vue'

    const mostrar = ref(false);

</script>