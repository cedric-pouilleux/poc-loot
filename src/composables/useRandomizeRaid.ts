import type {Mobs, OrderedLootTable, Raid, Wishlist} from "@/types";
import type {ComputedRef} from 'vue';
import {readonly, ref} from 'vue';
import {items} from "@/fixtures/items";
import {usePriorities} from "@/composables/usePriorities";
import {useLootsManager} from "@/composables/useLootsManager";

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

export function useRandomizeRaid(raid: Raid, wishlist: ComputedRef<Wishlist[]>) {
    const orderedLoots = ref<OrderedLootTable[]>([]);
    const raidsCount = ref<number>(0);
    const itemsCount = ref<number>(0);

    const {getPriorityLootTableByItem} = usePriorities(wishlist);
    const {editPlayerWishlist} = useLootsManager(wishlist);

    function extractMobLoot(mob: Mobs): string[] {
        const obj: string[] = [];
        mob.always && obj.push(mob.always);
        mob.tokens && obj.push(mob.tokens[getRandomInt(mob.tokens.length)][0]);
        mob.epic && obj.push(mob.epic[getRandomInt(mob.epic.length)][0]);
        obj.push(mob.items[getRandomInt(mob.items.length)][0]);
        obj.push(mob.items[getRandomInt(mob.items.length)][0]);
        return obj;
    }

    function generateTotalLoot() {
        const loots = [];
        raid.mobs.forEach(mob => {
            const mobLoot = extractMobLoot(mob);
            mobLoot.forEach(item => {
                const loot = getPriorityLootTableByItem(item);
                if (loot.length) {
                    const random = getRandomInt(loot.length);
                    console.info(`${loot[random].player} win ${loot[random].itemKey} with ${loot[random].priority} priority`);
                    editPlayerWishlist(loot[loot.length > 1 ? random : 0]);
                }
            })
            // attributeLoot();
            loots.push(...mobLoot);
        });
        return loots;
    }

    function runRaidSimulation() {
        const loots = generateTotalLoot();
        itemsCount.value += loots.length;
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
    }

    return {
        raidsCount: readonly(raidsCount),
        orderedLoots: readonly(orderedLoots),
        itemsCount: readonly(itemsCount),
        runRaidSimulation
    }
}

