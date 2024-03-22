<template>
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
</template>

<script lang="ts" setup>
import {gnomeregan} from "@/fixtures/raids";
import {useRandomizeRaid} from "@/composables/useRandomizeRaid";

const {orderedLoots, raidsCount, runRaidSimulation, itemsCount} = useRandomizeRaid(gnomeregan);
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
