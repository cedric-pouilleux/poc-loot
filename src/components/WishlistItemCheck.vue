<template>
  <div>
    <h2>Individual item priorities check</h2>
    <select v-model="selectedItem">
      <option v-for="(item, key ) in items" :key="item.id" :value="key">{{ item.title }}</option>
    </select>

    <ul v-if="results.length">
      <li v-for="result in results" :key="result">
        {{ result.player }} with {{ result.priority }} priority score
        <button @click="handleLootAttribution(result)">Attribuer</button>
      </li>
    </ul>
    <div v-else>
      Pas de prioritées
    </div>

  </div>
</template>

<script lang="ts" setup>
import {ref, watch} from 'vue';
import {items} from "@/fixtures/items";
import {PriorityItem} from "@/types";

const selectedItem = ref();
const results = ref<PriorityItem[]>([]);

function handleLootAttribution(item: PriorityItem) {
  console.log(item);
  // wishlistStore.removeItemFromWishlist(item);
  // results.value = getPriorityLootTableByItem(selectedItem.value);
}

watch(() => selectedItem.value, (newValue) => {
  // results.value = getPriorityLootTableByItem(newValue);
  // console.log(results.value);
})
</script>
