import {ref} from "vue";

export type Item = {
    id: number,
    title: string,
    img: string,
    link: string,
    slot: string,
    type: string
}

export type ItemName = "transfigurateur-de-trogg-3000" | "ceinture-de-decoction-volatile";

export type MobItem = ref<Array<string | number>[]>

export type Player = {
    name: string;
    wish: string[];
}

export type PriorityStep = {
    itemKey?: string;
    playerName: string;
}

export type PriorityItem = {
    player: string;
    priority: number;
    itemKey: string;
}

export type Wish = (string | null)[];

export type Wishlist = {
    player: string;
    wish: Wish;
}

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
