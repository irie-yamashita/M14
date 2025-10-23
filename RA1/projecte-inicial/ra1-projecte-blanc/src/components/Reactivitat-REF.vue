<script setup>
import { ref } from "vue";

const missatge = ref("Hola món! :P");
const num = ref(0);

const canviarMissatge = () => {
  missatge.value = "Hola Vue! :D";
};

const incrementar = () => {
  num.value++;
};

const decrementar = () => {
  num.value--;
};
</script>

<template>
  <div class="message-container">
    <h1>{{ missatge }}</h1>
    <button @click="canviarMissatge">Canviar missatge</button>
  </div>

  <div class="comptador-container">
    <p>Comptador</p>
    <div class="comptador-content">
      <button @click="decrementar">-</button>
      <p>{{ num }}</p>
      <button @click="incrementar">+</button>
    </div>
  </div>
</template>

<style scoped>
div {
    text-align: center;
    justify-content: center;
    align-items: center;
    width: 100%;
}
.message-container {
    display: flex;
    gap: 10px;
}

.comptador-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.comptador-content {
  display: flex;
  justify-content: center;
  align-items: center;

  gap: 10px;
}

p {
  margin: 0;
}
</style>
