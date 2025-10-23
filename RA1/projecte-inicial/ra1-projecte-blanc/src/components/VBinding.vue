<script setup>
const titol = 'Hola, aquest títol és dinàmic!'
const imatgeURL = "https://plus.unsplash.com/premium_photo-1760705088738-32f7a991dba7?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=880&quot";
</script>
<template>
    <article>
        <h1>Binding</h1>
        <h2 v-bind:title="titol">Passa el ratolí per aquest text</h2>
        <img :src="imatgeURL" alt="imatge dinàmica" /> <!-- v-bind és igual a : -->
    </article>
</template>
