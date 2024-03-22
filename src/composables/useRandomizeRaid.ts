import type {Mobs, OrderedLootTable, Raid} from "@/types";
import {readonly, ref} from 'vue';
import {items} from "@/fixtures/items";

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

export type PriorityStep = {
    itemKey: string;
    playerName: string;
}

export function useRandomizeRaid(raid: Raid) {
    const orderedLoots = ref<OrderedLootTable[]>([]);
    const raidsCount = ref<number>(0);
    const itemsCount = ref<number>(0);

    function extractLootFromMob(mob: Mobs): string[] {
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
            const mobLoot = extractLootFromMob(mob);
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

