<script setup lang="ts">
    import { ref } from 'vue';
    import TeaCard from './components/TeaCard.vue';

    const teas = ['Verds', 'Negres', 'Vermells', 'Blancs'];

    const tea = ref('tea');

    const gestionaNom = (nom) => {
        tea.value = nom;
        console.log('pare', nom);
    }

    const colorMap = {
        
    }

</script>

<template>
    <div class="content">
        <h1 class="title">Subscripcions disponibles</h1>
        <h2 class="subtitle">
            Disposem dels millor tes del món
        </h2>

        
        <div class="plans">
            <p >{{ tea }}</p>
            <TeaCard @sendName="gestionaNom" v-for="tea in teas" :nom="tea" :key="tea" />
        </div>
    </div>
</template>