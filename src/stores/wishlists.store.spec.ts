import {computed} from "vue";
import {describe, expect, it} from "vitest";
import {usePriorities} from "@/composables/usePriorities";

describe('usePriorities composable', () => {

    it('Should return one result with first position', () => {
        const {getPriorityLootTableByItem} = usePriorities(computed(() => [
            {
                player: 'player1',
                wish: [
                    "ceinture-de-decoction-volatile",
                    "bracelets-ornes-en-sombrefer",
                ],
            },
            {
                player: 'player2',
                wish: [
                    "bracelets-ornes-en-sombrefer",
                    "ceinturon-de-sombre-vision",
                ],
            }
        ]));
        const test = getPriorityLootTableByItem("bracelets-ornes-en-sombrefer");
        expect(test).toHaveLength(1);
    });

    it('Should return one result with random position', () => {
        const {getPriorityLootTableByItem} = usePriorities(computed(() => [
            {
                player: 'player1',
                wish: [
                    "ceinture-de-decoction-volatile",
                    "bracelets-ornes-en-sombrefer",
                ],
            },
            {
                player: 'player2',
                wish: [
                    "bracelets-ornes-en-sombrefer",
                    "ceinturon-de-sombre-vision",
                ],
            }
        ]));
        const test = getPriorityLootTableByItem("ceinturon-de-sombre-vision");
        expect(test).toHaveLength(1);
    });

    it('Should return 2 results', () => {
        const {getPriorityLootTableByItem} = usePriorities(computed(() => [
            {
                player: 'player1',
                wish: [
                    "bracelets-ornes-en-sombrefer",
                    "coupe-tete-supercharge",
                ],
            },
            {
                player: 'player2',
                wish: [
                    "bracelets-ornes-en-sombrefer",
                    "ceinturon-de-sombre-vision",
                ],
            }
        ]));
        const test = getPriorityLootTableByItem("bracelets-ornes-en-sombrefer");
        expect(test).toHaveLength(2);
    });

    it('Should return 3 results', () => {
        const {getPriorityLootTableByItem} = usePriorities(computed(() => [
            {
                player: 'player1',
                wish: [
                    "bracelets-ornes-en-sombrefer",
                    "coupe-tete-supercharge",
                ],
            },
            {
                player: 'player2',
                wish: [
                    "bracelets-ornes-en-sombrefer",
                    "ceinturon-de-sombre-vision",
                ],
            },
            {
                player: 'player3',
                wish: [
                    "bracelets-ornes-en-sombrefer",
                    "ceinturon-de-sombre-vision",
                ],
            }
        ]));
        const test = getPriorityLootTableByItem("bracelets-ornes-en-sombrefer");
        expect(test).toHaveLength(3);
    });

})
