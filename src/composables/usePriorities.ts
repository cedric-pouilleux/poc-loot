import type {ComputedRef} from "vue";
import {computed} from "vue";
import type {ItemName, PriorityItem, PriorityStep, Wishlist} from "@/types";

export function usePriorities(wishlists: ComputedRef<Wishlist[]>) {

    const sortedPriorityLoots = computed((): Array<PriorityStep>[] => {
        const tab: Array<PriorityStep>[] = [];
        const currentSize = 6;
        for (let i = 0; i < currentSize; i++) {
            const value = wishlists.value.map(item => ({
                itemKey: item.wish[i],
                playerName: item.player,
            }));
            tab.push(value);
        }
        return tab;
    });

    function getPriorityLootTableByItem(item: ItemName): PriorityItem[] {
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
