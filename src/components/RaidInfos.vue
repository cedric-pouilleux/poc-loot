<template>
  <div class="raid-infos">
    <button @click="$emit('simulate')">Simulate next raid</button>
    <p> {{ raidsCount }} total raids</p>
    <p> {{ itemsCount }} total items</p>
  </div>
</template>

<script lang="ts" setup>
import {defineEmits, defineProps} from "vue";

defineProps<{
  raidsCount: number;
  itemsCount: number;
}>();

defineEmits<{
  (e: 'simulate'): void;
}>();
</script>

