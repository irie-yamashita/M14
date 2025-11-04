<script setup lang="ts">
    import TeaCard from './components/TeaCard.vue';

    const teas = ['Verds', 'Negres', 'Vermells', 'Blancs']
</script>

<template>
    <div class="content">
        <h1 class="title">Subscripcions disponibles</h1>
        <h2 class="subtitle">
            Disposem dels millor tes del món
        </h2>
        <div class="plans">
            <TeaCard v-for="tea in teas" :name="tea" :key="tea" />

        </div>
    </div>
</template>