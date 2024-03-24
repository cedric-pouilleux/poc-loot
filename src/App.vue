<template>
  <WishlistCreator/>
  <WishlistsViewer :wishlists="wishlists"/>
  <RaidInfos :itemsCount="itemsCount" :raidsCount="raidsCount" @simulate="runRaidSimulation"/>
  <ItemsList :items="orderedLoots"/>
</template>

<script lang="ts" setup>
import {gnomeregan} from "@/fixtures/raids";
import {useRandomizeRaid} from "@/composables/useRandomizeRaid";
import {useWishlists} from "@/stores/wishlists.store";
import {storeToRefs} from "pinia";
import RaidInfos from "@/components/RaidInfos.vue";
import ItemsList from "@/components/ItemsList.vue";
import WishlistsViewer from "@/components/WishlistsViewer.vue";
import WishlistCreator from "@/components/WishlistCreator.vue";

const wishlistStore = useWishlists();
const {wishlists} = storeToRefs(wishlistStore);

const {
  orderedLoots,
  raidsCount,
  runRaidSimulation,
  itemsCount
} = useRandomizeRaid(gnomeregan);
</script>

