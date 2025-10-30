<template>
    <h2>V-FOR</h2>

    <ul>
        <li v-for="producte in productes" :key="producte.id">
            {{ producte.nom }} - {{ producte.preu }}€
        </li>
    </ul>
  
</template>

<script setup>
    const productes = [
        { id: 1, nom: 'Ordinador', preu: 1000 },
        { id: 2, nom: 'Telèfon', preu: 500 },
        { id: 3, nom: 'Tablet', preu: 300 },
    ];
</script>