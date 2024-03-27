<template>
  <div class="raid-infos">
    <Button label="Simulate next raid" @click="$emit('simulate')"/>
    <p> {{ raidsCount }} total raids</p>
    <p> {{ itemsCount }} total items</p>
  </div>
</template>

<script lang="ts" setup>
import {defineEmits, defineProps} from "vue";
import Button from 'primevue/button';


defineProps<{
  raidsCount: number;
  itemsCount: number;
}>();

defineEmits<{
  (e: 'simulate'): void;
}>();
</script>

