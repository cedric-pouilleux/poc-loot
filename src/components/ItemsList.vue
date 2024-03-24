<template>
  <div class="items-list">
    <ul>
      <li v-for="item in items" :key="item.itemKey" class="items-list__items">
        <div class="items-list__counter">{{ item.count }}</div>
        <div class="items-list__icon">
          <img :src="item.metadata.img"/>
        </div>
        <a :href="item.metadata.link" target="_blank">{{ item.metadata.title }}</a>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import {defineProps} from "vue";
import {OrderedLootTable} from "@/types";

defineProps<{
  items: OrderedLootTable[]
}>();
</script>

<style lang="scss" scoped>
.items-list {
  padding: 20px;
  box-sizing: border-box;
  position: absolute;
  right: 0;
  top: 0;
  overflow: auto;
  height: 100vh;
  width: 500px;

  &__items {
    display: flex;
    gap: 8px;
    align-items: center;
  }

  &__counter {
    color: #333;
    border-radius: 4px;
  }

  &__icon {
    margin: 0;
    padding: 0;

    img {
      border-radius: 4px;
      width: 25px;
      margin: 0;
      height: 25px;
    }
  }
}
</style>
