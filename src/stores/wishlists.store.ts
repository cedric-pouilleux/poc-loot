import {defineStore} from 'pinia'
import {wishlistsFixtures} from "@/fixtures/whislist";
import type {ItemName, PriorityItem, PriorityStep} from "@/types";


export const useWishlists = defineStore('wishlists-store', {

    state: () => ({
        wishlists: wishlistsFixtures,
    }),

    getters: {
        getMaxPriorityDeep(state): number {
            return Math.max(...state.wishlists.map(list => list.wish.length))
        },

        sortLootByPriority(state): Array<PriorityStep>[] {
            const tab: Array<PriorityStep>[] = [];
            for (let i = 0; i < this.getMaxPriorityDeep; i++) {
                const value = state.wishlists.map(item => ({
                    itemKey: item.wish[i],
                    playerName: item.player,
                }));
                tab.push(value);
            }
            return tab;
        },
    },

    actions: {
        resetPriorities() {
            this.wishlists.forEach(item => {
                item.wish = item.wish.filter(n => n);
            })
        },

        removeItemFromWishlist(playerItem: PriorityItem): void {
            this.wishlists.find((item, wishlistIndex) => {
                if (item.player === playerItem.player) {
                    const wishId = this.wishlists[wishlistIndex].wish.findIndex(i => i === playerItem.itemKey);
                    this.wishlists[wishlistIndex].wish[wishId] = null;
                }
            });
        },

        generateMapByPriority(item: ItemName): PriorityItem[] {
            let priority = 1;
            const val: PriorityItem[] = [];
            let itemInPriorityAdded: boolean | number = false;
            this.sortLootByPriority.every(loots => {
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
    }
 
})

