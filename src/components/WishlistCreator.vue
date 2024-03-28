<template>
  <div class="wishlist-creator">
    <div v-for="slot in wishlistSlotsMap" :key="slot.key" @click="handleClick($event, slot.id)">
      <div class="wishlist-creator__priority">{{ slotItems[slot.id - 1].priority }}</div>
      <WishlistCreatorSlot :empty-image-url="slot.emptyImg" :item-image-url="slotItems[slot.id - 1].item?.img"/>
      <OverlayPanel :key="slot.id" :ref="el => { refs[slot.id] = el }" append-to="body">
        {{ slots.get(slot.key).title }}
        <InputNumber v-model="slotItems[slot.id -1].priority" :inputId="`inputId${slot.key}`" :max="18" :min="0"
                     showButtons/>
        <WishlistCreatorSlotItemsList v-model:selected="slotItems[slot.id -1].item" :items="itemsSlots(slot.key)"/>
      </OverlayPanel>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {defineProps, reactive, ref, withDefaults} from 'vue';
import {items} from "@/fixtures/items/itemsFixtures";
import {wishlistSlotsMap} from "@/fixtures/items/wishlistSlotsItems";
import {Item} from "@/types";
import WishlistCreatorSlot from '@/components/WishlistCreatorSlot.vue';
import WishlistCreatorSlotItemsList from '@/components/WishlistCreatorSlotItemsList.vue';
import {slots} from "@/fixtures/items/slotsFixtures";

const refs = ref([]);

export type WishlistSlot = {
  slotId: number;
  item?: Item;
  priority: number;
}

const props = withDefaults(defineProps<{ wishlist: any }>(), {
  wishlist: () => wishlistSlotsMap.map(item => ({
    slotId: item.id,
    item: undefined,
    priority: 0
  })),
});

const slotItems = reactive<WishlistSlot[]>(props.wishlist);

function itemsSlots(key): [string, Item][] {
  //CARE => StarWith used because key name slot is Bijou and Bijou2, and we search items from item.key
  return Object.entries(items).filter((item) => key.startsWith(item[1].slot.slug));
}

function handleClick(event: Event, key: number): void {
  refs.value[key].toggle(event);
}
</script>

<style lang="scss" scoped>
.wishlist-creator {
  background-color: #222;
  padding: 10px;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;

  &__priority {
    text-align: center;
    line-height: 26px;
    font-size: 12px;
    color: #ccc;
  }


  &__left, &__right, &__bottom {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
}
</style>
