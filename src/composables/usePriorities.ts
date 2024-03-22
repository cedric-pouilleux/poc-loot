import {computed, ref} from "vue";
import type {PriorityItem, PriorityStep, Wishlist} from "@/types";

export function usePriorities(wishlists: Wishlist[]) {

    // TODO => Ensure reactive wishlist
    const allWishlists = ref<Wishlist[]>(wishlists);

    const sortedPriorityLoots = computed((): Array<PriorityStep>[] => {
        const tab: Array<PriorityStep>[] = [];
        const currentSize = 4;
        for (let i = 0; i < currentSize; i++) {
            tab.push(allWishlists.value.map(item => ({
                itemKey: item.wish[i],
                playerName: item.player,
            })))
        }
        return tab;
    });

    function getPriorityLootTableByItem(item: string): PriorityItem[] {
        let priority = 1;
        const val: PriorityItem[] = [];
        let itemInPriorityAdded: boolean | number = false;
        sortedPriorityLoots.value.every(loots => {
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
        getPriorityLootTableByItem,
    }
}
