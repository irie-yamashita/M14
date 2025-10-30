    <script setup>
    import { ref } from 'vue'

    const nomUsuari = ref('')
    const selected = ref('')
    const texte = ref('')
    </script>
    <template>
    <div>
    <!--input-->
    <p>Nom de l'usuari: {{ nomUsuari }}</p>
    <input v-model="nomUsuari" placeholder="Escriu el teu nom" />
    <!--select-->
    <div>Selected: {{ selected }}</div>
    <select v-model="selected">
    <option disabled value="">Please select one</option>
    <option>A</option>
    <option>B</option>
    <option>C</option>
    </select>
    <!--textarea-->
    <p>{{ texte }}</p>
    <textarea v-model="texte"></textarea>
    </div>
    </template>