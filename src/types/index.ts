import {ref} from "vue";

type Slot = {
    id: number,
    title: string,
    slug: string,
}

export type Item = {
    id: number,
    title: string,
    img: string,
    link: string,
    slot: Slot,
    type: string
}

export type MobItem = ref<Array<ItemName | number>[]>

export type Player = {
    name: string;
    wish: ItemName[];
}

export type PriorityStep = {
    itemKey: ItemName | null;
    playerName: string;
}

export type PriorityItem = {
    player: string;
    priority: number;
    itemKey: ItemName;
}

export type Wish = (string | null)[];

export type Wishlist = {
    player: string;
    wish: Wish;
}

export type OrderedLootTable = {
    count: number;
    itemKey: ItemName;
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
    always?: ItemName,
    epic?: MobItem,
}

export type Raid = {
    mobs: Mobs[]
}

export type WishlistSlot = {
    slotId: number;
    item?: Item;
    priority: number;
}

export type ItemName =
    "transfigurateur-de-trogg-3000" |
    "ceinture-de-decoction-volatile" |
    "corde-de-la-terre-profonde" |
    "gantelets-crasseux-de-grubbis" |
    "idole-de-colere" |
    "le-necro-gnomicon" |
    "baudrier-darnaque" |
    "espauliers-de-tuerie-de-troggs" |
    "grand-bouclier-irradie" |
    "solerets-des-basses-cavernes" |
    "ceinture-du-trogg-berserker" |
    "libram-de-benediction" |
    "ceinturon-de-recuperation" |
    "corde-cintree-electromagnetique" |
    "totem-de-flamme-revigorante" |
    "drape-de-demantelement" |
    "aiguillon-de-falco" |
    "grace-de-soigne-pignon" |
    "hydrobaton" |
    "godillots-acides" |
    "mantelet-de-negociation-rusee" |
    "pantalon-petrolifere" |
    "manchettes-tachees-dhuile-de-lev" |
    "mantelet-synthetique" |
    "baton-de-defibrillation" |
    "protege-epaules-genereusement-matelasses" |
    "vengeresse-toxique-ii" |
    "tranchoir-bidulotronique" |
    "vibrolame-ultrasonique" |
    "griffe-du-maitre-des-rouages" |
    "macro-ajusteur-gyromatique" |
    "manuel-de-reparation-9-60" |
    "bottes-doperation-des-gnomebots" |
    "couvre-bras-de-bricoleuse" |
    "garde-mains-de-maestro-des-marrons" |
    "plaques-depaule-usinees-en-alliage" |
    "stabilisateurs-de-visee-experimentaux" |
    "rapetisseur-de-monde" |
    "roueur-automatiquechaman-druide-paladin" |
    "bouclier-de-securite-dielectrique" |
    "power-depleted-boots" |
    "power-depleted-chest" |
    "power-depleted-legs" |
    "aragriars-whimsical-world-warper" |
    "electrocutioner-hexnut" |
    "hi-tech-supergun-mkvii" |
    "machinists-gloves" |
    "mechbuilders-overalls" |
    "staff-of-the-evil-genius" |
    "cloak-of-invention" |
    "fighter-ace-gloves" |
    "mech-menders-sash" |
    "mechanostrider-gear-shifter" |
    "mechanostrider-muffler" |
    "electrocutioners-needle" |
    "irradiated-robe" |
    "irradiated-boots" |
    "irradiated-trousers" |
    "welded-truesilver-ringlets" |
    "reflective-skullcap" |
    "pulveri-marteau-oscillant" |
    "bidulame-rougeoyante" |
    "boute-feu-inextinguible-dizzleflick" |
    "bracelets-ornes-en-sombrefer" |
    "ceinturon-de-sombre-vision" |
    "coupe-tete-supercharge" |
    "ceinture-de-levage-assistee" |
    "couverture-dingeniosite" |
    "doigts-de-precision-des-arcanes" |
    "prototype-de-cape-parachute" |
    "visioscope-de-tir-delite" |
    "camail-en-filament-de-vrai-argent" |
    "spallieres-paratonnerres" |
    "notes-dingenierie-de-thermojoncteur" |
    "poulet-dattaque-domestique" |
    "chambre-de-combustion-miniature" |
    "experience-gyromatique-420b" |
    "engrenage-dinnovation-en-surcharge" |
    "flacon-de-pilules-de-gniode" |
    "dechiqueteur-arcanique-de-mekkatorque" |
    "engrenage-de-deflagration-en-surcharge" |
    "engrenage-de-devastation-en-surcharge" |
    "fendoir-a-propulsion-de-thermojoncteur" |
    "petoire-personnalisee-de-thermojoncteur" |
    "noyau-durci-de-wirdal" |
    "reactivateur-dhyperflux-electromagnetique";
