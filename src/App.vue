<template>
  <WishlistCreator :wishlist="wishlistFixture.list" @wishlist-change="wishlistFixture.list = $event"/>
  <WishlistCreator :wishlist="[]"/>
  <WishlistRead :wishlist="wishlistFixture.list"/>
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
import WishlistRead from "@/components/WishlistRead.vue";
import {items} from "@/fixtures/items/itemsFixtures";
import {ref} from "vue";

const wishlistFixture = ref({
  player: {
    name: 'Mino'
  },
  list: [
    {
      slotId: 1,
      item: items["reflective-skullcap"],
      priority: 1
    }
  ]
});

const wishlistStore = useWishlists();
const {wishlists} = storeToRefs(wishlistStore);

const {
  orderedLoots,
  raidsCount,
  runRaidSimulation,
  itemsCount
} = useRandomizeRaid(gnomeregan);
</script>

