import {computed, ref} from "vue";
import {defineStore} from 'pinia'
import {wishlistsFixtures} from "@/fixtures/whislist";
import type {ItemName, PriorityItem, PriorityStep, Wishlist} from "@/types";

export const useWishlists = defineStore('wishlists', () => {
    const wishlists = ref<Wishlist[]>(wishlistsFixtures);

    const getMaxPriorityDeep = computed(() => Math.max(...wishlists.value.map(list => list.wish.length)));

    const sortLootByPriority = computed((): Array<PriorityStep>[] => {
        const tab: Array<PriorityStep>[] = [];
        for (let i = 0; i < getMaxPriorityDeep.value; i++) {
            const value = wishlists.value.map(item => ({
                itemKey: item.wish[i],
                playerName: item.player,
            }));
            tab.push(value);
        }
        return tab;
    });

    function removeItemFromWishlist(playerItem: PriorityItem): void {
        wishlists.value.find((item, wishlistIndex) => {
            if (item.player === playerItem.player) {
                const wishId = wishlists.value[wishlistIndex].wish.findIndex(i => i === playerItem.itemKey);
                wishlists.value[wishlistIndex].wish[wishId] = null;
            }
        });
    }

    function generateMapByPriority(item: ItemName): PriorityItem[] {
        let priority = 1;
        const val: PriorityItem[] = [];
        let itemInPriorityAdded: boolean | number = false;
        sortLootByPriority.value.every(loots => {
            loots.find(loot => {
                if (loot.itemKey === item) {
                    val.push({
                        player: loot.playerName,
                        priority: priority,
                        itemKey: loot.itemKey
                    });
                    itemInPriorityAdded = priority;
                }
            })
            priority++;
            return !(itemInPriorityAdded && itemInPriorityAdded < priority);
        });
        return val;
    }

    return {
        wishlists,
        generateMapByPriority,
        removeItemFromWishlist,
        getMaxPriorityDeep
    }
})
