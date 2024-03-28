<template>
  <div :style="{ 'background-image': `url(${emptyImageUrl})`}" class="slot">
    <img v-if="itemImageUrl" :src="itemImageUrl"/>
  </div>
</template>

<script lang="ts" setup>
import {defineProps} from 'vue'

defineProps<{
  emptyImageUrl: string
  itemImageUrl?: string
}>();

</script>

<style lang="scss" scoped>
.slot {
  background-size: 36px;
  border-radius: 4px;
  width: 36px;
  height: 36px;
  box-sizing: border-box;
  background-color: #333;
  cursor: pointer;
}
</style>
