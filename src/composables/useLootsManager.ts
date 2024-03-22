import {readonly, ref} from "vue";
import type {PriorityItem, Wishlist} from "@/types";

export function useLootsManager(wishlists: Wishlist[]) {
    const wishlist = ref(wishlists);

    function lootAttribution(playerItem: PriorityItem) {
        wishlist.value.find((item, index) => {
            if (item.player === playerItem.player) {
                wishlist.value[index].wish[0] = null;
            }
        });
        console.log(wishlist.value);
    }

    return {
        allWishlists: readonly(wishlist),
        lootAttribution
    }
}
