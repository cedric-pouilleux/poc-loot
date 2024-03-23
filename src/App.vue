<template>

  <pre>
    {{ wishlists }}
  </pre>

  <div>
    <button @click="runRaidSimulation">Simulate next raid</button>
    <p> {{ raidsCount }} total raids</p>
    <p> {{ itemsCount }} total items</p>
  </div>
  <div class="scrollable">
    <ul>
      <li v-for="loot in orderedLoots" :key="loot.itemKey" class="list">
        <div class="counter">{{ loot.count }}</div>
        <div class="icon">
          <img :src="loot.metadata.img"/>
        </div>
        <a :href="loot.metadata.link" target="_blank">{{ loot.metadata.title }}</a>
      </li>
    </ul>
  </div>

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
import {gnomeregan} from "@/fixtures/raids";
import {useRandomizeRaid} from "@/composables/useRandomizeRaid";
// import {usePriorities} from "@/composables/usePriorities";
import {items} from "@/fixtures/items";
import type {ItemName, PriorityItem} from "@/types";
import {useWishlists} from "@/stores/wishlists.store";
import {storeToRefs} from "pinia";

const wishlistStore = useWishlists();
const {wishlists} = storeToRefs(wishlistStore);


const {
  orderedLoots,
  raidsCount,
  runRaidSimulation,
  itemsCount
} = useRandomizeRaid(gnomeregan);


// const {getPriorityLootTableByItem} = usePriorities(computed(() => wish.value));

const selectedItem = ref<ItemName>();
const results = ref<PriorityItem[]>([]);

function handleLootAttribution(item: PriorityItem) {
  console.log(wishlistStore);
  // wishlistStore.removeItemFromWishlist(item);
  // results.value = getPriorityLootTableByItem(selectedItem.value);
}

watch(() => selectedItem.value, (newValue) => {
  // results.value = getPriorityLootTableByItem(newValue);
  // console.log(results.value);
})


</script>

<style scoped>
.scrollable {
  padding: 20px;
  box-sizing: border-box;
  position: absolute;
  right: 0;
  top: 0;
  overflow: auto;
  height: 100vh;
  width: 500px;
}

.list {
  display: flex;
  gap: 8px;
  align-items: center;
}

.counter {
  color: #333;
  border-radius: 4px;
}

.icon {
  margin: 0;
  padding: 0;
}

.icon img {
  border-radius: 4px;
  width: 25px;
  margin: 0;
  height: 25px;
}
</style>
