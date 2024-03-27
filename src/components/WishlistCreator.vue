<template>
  <div class="wishlist-creator">
    <div v-for="slot in wishlistSlotsMap" :key="slot.key" :class="slot.key" @click="handleClick($event, slot.key)">
      <div :style="{ 'background-image': `url(${slot.emptyImg})`}" class="slot">
        <img v-if="slotItems[slot.key]" :src="slotItems[slot.key].img"/>
      </div>
      <OverlayPanel :key="slot.key" :ref="el => { refs[slot.key] = el }" append-to="body">
        {{ slots.get(slot.key).title }}
        <div v-for="item in itemsSlots(slot.key)" :id="item[1].id" :key="item" class="wishlist-creator__panel-list">
          <RadioButton v-model="slotItems[slot.key]" :name="item[1].title" :value="item[1]"/>
          <label style="margin-left: 8px">
            <a :data-wowhead="item[1].link" :href="item[1].link" target="_blank">{{ item[1].title }}</a>
          </label>
        </div>
      </OverlayPanel>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {reactive, ref} from 'vue';
import {items} from "@/fixtures/items/itemsFixtures";
import {wishlistSlotsMap} from "@/fixtures/items/wishlistSlotsItems";
import {Item} from "@/types";
import {slots} from "@/fixtures/items/slotsFixtures";

const refs = ref([]);

const slotItems = reactive({
  tete: items["reflective-skullcap"],
  cou: items["notes-dingenierie-de-thermojoncteur"],
});

function itemsSlots(key): [string, Item][] {
  //CARE => StarWith used because key name slot is Bijou and Bijou2, and we search items from item.key
  return Object.entries(items).filter((item) => key.startsWith(item[1].slot.slug));
}

function handleClick(event: Event, key: string): void {
  refs.value[key].toggle(event);
}
</script>

<style lang="scss" scoped>
.wishlist-creator {
  background-color: #222;
  padding: 10px;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;

  &__panel-list {
    padding: 4px 0;
  }

  &__left, &__right, &__bottom {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .slot {
    background-size: 36px;
    border-radius: 4px;
    width: 36px;
    overflow: hidden;
    height: 36px;
    box-sizing: border-box;
    background-color: #333;
    cursor: pointer;
  }
}
</style>
