import {readonly} from "vue";
import Slugify from 'slugify';
import parse from "node-html-parser";
import type {Item} from "@/types";

type ItemList = Record<string, Item>;

/**
 * Extraction and make data structure from wow head mob data table
 * @param domString Exemple "<div>test</div>"
 * @param domQuery Selector for all extract elements
 */

export function useWowHeadTableExtractData(domString: string, domQuery: string = '.listview-row') {
    const root = parse(domString);
    const extractedData = root.querySelectorAll(domQuery).map((item) => {
        const imgRawUrl: string = item.childNodes[1].childNodes[0].firstChild.attrs.style;
        const img: string = imgRawUrl.replace('background-image: url("', '').replace('");', '');
        const wowHeadLink: string = item.childNodes[1].childNodes[0].childNodes[2].attrs.href;
        const id: number = +new RegExp('item=(.*)/').exec(wowHeadLink)![1];

        return {
            id,
            img,
            link: wowHeadLink,
            title: item.childNodes[2].text,
            slot: item.childNodes[7].text,
            type: item.childNodes[9].text,
            rate: item.childNodes[12].text,
        };
    })

    return {
        data: readonly(extractedData),
    }
}

/**
 * Make hash data structure from multiple extracted raw data from wow head
 * First use useWowHeadTableExtractData;
 * @param tables
 */
export function useUniqHashTable(tables: any[]): ItemList {
    const arr: ItemList = {};
    tables.forEach(table => {
        table.forEach(item => {
            const slug = Slugify(item.title, {
                lower: true,
                strict: true
            });
            arr[slug] = {
                img: item.img,
                link: item.link,
                slot: item.slot,
                title: item.title,
                type: item.type,
                id: item.id
            };
        })
    });
    return arr;
}

