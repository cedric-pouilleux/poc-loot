<template>
  <div v-for="item in items" :id="item[1].id" :key="item" class="wishlist-creator__panel-list">
    <RadioButton v-model="selected" :name="item[1].title" :value="item[1]"/>
    <label style="margin-left: 8px">
      <a :data-wowhead="item[1].link" :href="item[1].link" target="_blank">{{ item[1].title }}</a>
    </label>
  </div>
</template>

<script lang="ts" setup>
import {defineEmits, defineModel, defineProps} from 'vue'
import {Item} from "@/types";

defineProps<{
  items: [string, Item][],
}>();

defineEmits<{
  (e: 'selected'): void
}>();

const selected = defineModel('selected')

</script>

<style lang="scss" scoped>
.wishlist-creator__panel-list {
  padding: 4px 0;
}
</style>
