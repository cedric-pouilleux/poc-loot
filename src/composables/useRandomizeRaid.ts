import type {ItemName, Mobs, OrderedLootTable, Raid} from "@/types";
import {readonly, ref} from 'vue';
import {items} from "@/fixtures/items/itemsFixtures";
import {useWishlists} from "@/stores/wishlists.store";
import {getRandomInt} from "@/utils";

export function useRandomizeRaid(raid: Raid) {
    const orderedLoots = ref<OrderedLootTable[]>([]);
    const raidsCount = ref<number>(0);
    const itemsCount = ref<number>(0);

    const wishlistStore = useWishlists();

    function extractMobLoot(mob: Mobs): ItemName[] {
        const obj: ItemName[] = [];
        mob.always && obj.push(mob.always);
        mob.tokens && obj.push(mob.tokens[getRandomInt(mob.tokens.length)][0]);
        mob.epic && obj.push(mob.epic[getRandomInt(mob.epic.length)][0]);
        obj.push(mob.items[getRandomInt(mob.items.length)][0]);
        obj.push(mob.items[getRandomInt(mob.items.length)][0]);
        return obj;
    }

    function generateTotalLoot(): ItemName[] {
        const loots: ItemName[] = [];
        raid.mobs.forEach(mob => {
            const mobLoot = extractMobLoot(mob);
            mobLoot.forEach(item => {
                const loot = wishlistStore.generateMapByPriority(item);
                if (loot.length) {
                    // console.info(`${loot[random].player} win ${loot[random].itemKey} with ${loot[random].priority} priority`);
                    wishlistStore.removeItemFromWishlist(loot[loot.length > 1 ? getRandomInt(loot.length) : 0]);
                }
            })
            loots.push(...mobLoot);
        });
        return loots;
    }

    function runRaidSimulation(): void {
        const loots = generateTotalLoot();
        itemsCount.value += loots.length - 1;
        loots.forEach(item => {
            const exist = orderedLoots.value.findIndex(loot => loot.itemKey === item);
            if (exist !== -1) {
                orderedLoots.value[exist].count++;
            } else {
                orderedLoots.value.push({
                    count: 1,
                    itemKey: item,
                    metadata: items[item]
                });
            }
        });
        raidsCount.value = raidsCount.value + 1;
        wishlistStore.resetPriorities();
    }

    return {
        raidsCount: readonly(raidsCount),
        orderedLoots: readonly(orderedLoots),
        itemsCount: readonly(itemsCount),
        runRaidSimulation
    }
}

