import {defineStore} from 'pinia'
import {wishlistsFixtures} from "@/fixtures/whislist";
import {computed, readonly, ref} from "vue";
import type {ItemName, PriorityItem, PriorityStep} from "@/types";

export const useWishlists = defineStore('wishlists', () => {
    const wishlists = ref(wishlistsFixtures);
    const deepPrioritySearch = ref<number>(0);

    const sortLootByPriority = computed((): Array<PriorityStep>[] => {
        const tab: Array<PriorityStep>[] = [];
        for (let i = 0; i < deepPrioritySearch.value; i++) {
            const value = wishlists.value.map(item => ({
                itemKey: item.wish[i],
                playerName: item.player,
            }));
            tab.push(value);
        }
        return tab;
    });

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
        wishlists: readonly(wishlists),
        generateMapByPriority
    }
})
