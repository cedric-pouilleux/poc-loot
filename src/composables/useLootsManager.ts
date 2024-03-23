import type {ComputedRef} from "vue";
import type {PriorityItem, Wishlist} from "@/types";

export function useLootsManager(wishlists: ComputedRef<Wishlist[]>) {

    function editPlayerWishlist(playerItem: PriorityItem): void {
        wishlists.value.find((item, wishlistIndex) => {
            if (item.player === playerItem.player) {
                const wishId = wishlists.value[wishlistIndex].wish.findIndex(i => i === playerItem.itemKey);
                wishlists.value[wishlistIndex].wish[wishId] = null;
            }
        });
    }

    return {
        editPlayerWishlist
    }
}
