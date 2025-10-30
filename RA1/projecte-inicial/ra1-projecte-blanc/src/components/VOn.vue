<template>
    <h1>Hola {{ name }}</h1>
    <button v-on:click="handleClick('Botó 1')">Click aquí</button>
    <button @click="handleClick('Botó 2')">Click aquí</button>

    <button @click="salutacio">Fes click per saludar</button>
</template>


<script setup>
    const name = "v-on";

    const handleClick = (missatge) => {
        console.log(missatge);
    }

    const salutacio = () => {
        alert('Hola, benvingudi!');
    }

</script>