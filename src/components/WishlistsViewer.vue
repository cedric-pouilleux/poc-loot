<template>
  <div class="wishlists-viewer">
    <div v-for="(wishlist) in wishlists" :key="wishlist.player" class="wishlists">
      <h3>{{ wishlist.player }}</h3>
      <ul>
        <li v-for="(item, index) in wishlist.wish" :key="item" class="wishlists-viewer__items">
          <div class="wishlists-viewer__counter">{{ index + 1 }}</div>
          <div class="wishlists-viewer__icon">
            <img :src="items[item].img"/>
          </div>
          <a :href="items[item].link" target="_blank">{{ items[item].title }}</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {defineProps} from "vue";
import {Wishlist} from "@/types";
import {items} from "@/fixtures/items";

defineProps<{
  wishlists: Wishlist[]
}>();
</script>

<style lang="scss" scoped>
.wishlists-viewer {
  padding: 20px;
  box-sizing: border-box;
  overflow: auto;
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
      width: 20px;
      margin: 0;
      height: 20px;
    }
  }
}
</style>
