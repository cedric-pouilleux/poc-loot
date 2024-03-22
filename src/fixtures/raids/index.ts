import {grubis} from "@/fixtures/mobs/grubis";
import {retombeeVisqueuse} from "@/fixtures/mobs/retombee-visqueuse";
import {disperserDeFoule} from "@/fixtures/mobs/disperser-de-foule";
import {electrocutioner} from "@/fixtures/mobs/electrocutioner";
import {menagerie} from "@/fixtures/mobs/menagerie";
import {thermonjoncteur} from "@/fixtures/mobs/thermojoncteur";
import type {Raid} from "@/types";

export const gnomeregan: Raid = {
    mobs: [
        grubis,
        retombeeVisqueuse,
        disperserDeFoule,
        electrocutioner,
        menagerie,
        thermonjoncteur
    ]
}
