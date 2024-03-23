import {describe, expect, it, vi} from "vitest";
import {setActivePinia} from "pinia";
import {createTestingPinia} from "@pinia/testing";
import {useWishlists} from "@/stores/wishlists.store";

describe('wishlists store loots attributions', () => {

    it('Should return one result with first position', () => {
        const wishlists = [
            {player: 'player1', wish: ["ceinture-de-decoction-volatile", "bracelets-ornes-en-sombrefer"]},
            {player: 'player2', wish: ["bracelets-ornes-en-sombrefer", "ceinturon-de-sombre-vision"]}
        ];

        setActivePinia(createTestingPinia({
            createSpy: vi.fn,
            stubActions: false,
            initialState: {'wishlists': {wishlists}}
        }));

        expect(
            useWishlists().generateMapByPriority("bracelets-ornes-en-sombrefer")
        ).toHaveLength(1);
    });

    it('Should return one result with random position', () => {
        const wishlists = [
            {player: 'player1', wish: ["ceinture-de-decoction-volatile", "bracelets-ornes-en-sombrefer"]},
            {player: 'player2', wish: ["bracelets-ornes-en-sombrefer", "ceinturon-de-sombre-vision"]}
        ];

        setActivePinia(createTestingPinia({
            createSpy: vi.fn,
            stubActions: false,
            initialState: {'wishlists': {wishlists}}
        }));

        expect(
            useWishlists().generateMapByPriority("ceinturon-de-sombre-vision")
        ).toHaveLength(1);
    });

    it('Should return 2 results', () => {
        const wishlists = [
            {player: 'player1', wish: ["bracelets-ornes-en-sombrefer", "coupe-tete-supercharge"]},
            {player: 'player2', wish: ["bracelets-ornes-en-sombrefer", "ceinturon-de-sombre-vision"]}
        ];

        setActivePinia(createTestingPinia({
            createSpy: vi.fn,
            stubActions: false,
            initialState: {'wishlists': {wishlists}}
        }));

        expect(
            useWishlists().generateMapByPriority("bracelets-ornes-en-sombrefer")
        ).toHaveLength(2);
    });

    it('Should return 3 results', () => {
        const wishlists = [
            {player: 'player1', wish: ["bracelets-ornes-en-sombrefer", "coupe-tete-supercharge"]},
            {player: 'player2', wish: ["bracelets-ornes-en-sombrefer", "ceinturon-de-sombre-vision"]},
            {player: 'player3', wish: ["bracelets-ornes-en-sombrefer", "ceinturon-de-sombre-vision"]}
        ];

        setActivePinia(createTestingPinia({
            createSpy: vi.fn,
            stubActions: false,
            initialState: {'wishlists': {wishlists}}
        }));

        expect(
            useWishlists().generateMapByPriority("bracelets-ornes-en-sombrefer")
        ).toHaveLength(3);
    });

    it('Should iterate depend of wishlist size', async () => {
        const wishlists = [
            {
                player: 'player1',
                wish: ["bracelets-ornes-en-sombrefer", "coupe-tete-supercharge", "gantelets-crasseux-de-grubbis", "le-necro-gnomicon"]
            },
            {player: 'player2', wish: ["bracelets-ornes-en-sombrefer", "ceinturon-de-sombre-vision"]},
        ];

        setActivePinia(createTestingPinia({
            createSpy: vi.fn,
            stubActions: false,
            initialState: {'wishlists': {wishlists}}
        }));

        const store = useWishlists();
        expect(store.getMaxPriorityDeep).toBe(4);
    });

    it('Should edit correctly the state after attribution', async () => {
        const wishlists = [
            {player: 'player1', wish: ["bracelets-ornes-en-sombrefer", "coupe-tete-supercharge"]},
            {player: 'player2', wish: ["bracelets-ornes-en-sombrefer", "ceinturon-de-sombre-vision"]},
        ];

        setActivePinia(createTestingPinia({
            createSpy: vi.fn,
            stubActions: false,
            initialState: {'wishlists': {wishlists}}
        }));

        const store = useWishlists();
        
        store.removeItemFromWishlist({
            player: 'player1',
            priority: 1,
            itemKey: "bracelets-ornes-en-sombrefer",
        });

        expect(JSON.stringify(store.wishlists[0].wish)).toBe(JSON.stringify([
            null,
            "coupe-tete-supercharge",
        ]));
    });

});
