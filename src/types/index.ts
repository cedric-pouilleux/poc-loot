import {ref} from "vue";

export type Item = {
    id: number,
    title: string,
    img: string,
    link: string,
    slot: string,
    type: string
}

export type MobItem = ref<Array<string | number>[]>

export type OrderedLootTable = {
    count: number;
    itemKey: string;
    metadata: Item;
}

// Only used with wow head table extraction
export type RawItem = {
    id: number,
    title: string,
    img: string,
    link: string,
    slot: string,
    type: string,
    rate: string
}

export type Mobs = {
    tokens?: MobItem,
    items: MobItem,
    always?: string,
    epic?: MobItem,
}

export type Raid = {
    mobs: Mobs[]
}
