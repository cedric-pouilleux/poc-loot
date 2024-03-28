<template>
  <div class="wishlist-creator">
    <template v-for="slot in sorted" :key="slot.slotId">
      <div v-if="slot.item">
        <div :class="{ highlight: slot.priority === 1}" class="wishlist-creator__priority">
          {{ slot.priority }}
        </div>
        <WishlistCreatorSlot :item-image-url="slot.item?.img"/>
      </div>
    </template>
  </div>
</template>

<script lang="ts" setup>
import {computed, defineProps} from 'vue';
import {WishlistSlot} from "@/types";
import WishlistCreatorSlot from '@/components/WishlistCreatorSlot.vue';

const props = defineProps<{
  wishlist: WishlistSlot[];
}>();

const sorted = computed(() =>
    props.wishlist
        .map(item => item)
        .sort((a, b) => a.priority - b.priority)
);


</script>

<style lang="scss" scoped>
.wishlist-creator {
  background-color: #fff;
  padding: 10px;
  display: flex;
  flex-wrap: wrap;
  gap: 6px;

  &__priority {
    text-align: center;
    line-height: 26px;
    font-size: 16px;
    height: 30px;
    color: #333;

    &.highlight {
      font-weight: 700;
    }
  }


  &__left, &__right, &__bottom {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
}
</style>
