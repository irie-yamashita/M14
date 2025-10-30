<template>
    <div>
        <p>Nom: {{ nom }}</p>
        <p>Nom en majúscules: {{ majNom }}</p>


        <div>
            <h2>Calculadora de descompte</h2>
            <label>
                Preu original:
                <input type="text" v-model="preu"> €
            </label>
            <label>
                Descompte:
                <input type="text" v-model="descompte"> %
            </label>

            <hr>
            <p>Preu final: <strong>{{ preuFinal }}</strong> €</p>
            <p>{{ missatgeDescompte }}</p>
        </div>


    </div>
</template>

<script setup>
    import { ref, computed} from 'vue';

    const nom = ref('Joan');
    const majNom = computed(() => nom.value.toUpperCase());

    const preu = ref(100);
    const descompte = ref(10);

    const preuFinal = computed(() => {
        const total = preu.value - (preu.value * descompte.value / 100);
        return total.toFixed(2);
    });

    const missatgeDescompte = computed(() => {
        if (descompte.value === 0) return 'Sense descompte aplicat'
        if (descompte.value < 20) return 'Petit descompte'
        return 'Gran descompte!'
        
    });

</script>