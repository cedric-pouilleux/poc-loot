<template>
  <div class="wishlist-creator">
    <div v-for="slot in wishlistSlotsMap" :key="slot.key"
         :class="{double: getDoublePriority}"
         @click="handleClick($event, slot.id)">
      <div :class="{ highlight: slotsItem[slot.id - 1].priority === 1}" class="wishlist-creator__priority">
        {{ getSlotItemById(slot.id) }}
      </div>
      <WishlistCreatorSlot :empty-image-url="slot.emptyImg" :item-image-url="slotsItem[slot.id - 1].item?.img"/>
      <OverlayPanel :key="slot.id" :ref="el => { refs[slot.id] = el }" append-to="body">
        <p>{{ slots.get(slot.key).title }}</p>
        <WishlistCreatorSlotItemsList v-model:selected="slotsItem[slot.id -1].item"
                                      :items="filterItemsById(slot.key)"
                                      @update:selected.once="handleItemSelection"/>
        <div class="wishlist-creator__form-priority">
          <label :for="`inputId${slot.key}`">Priorité</label>
          <InputNumber v-model="slotsItem[slot.id -1].priority"
                       :inputId="`inputId${slot.key}`"
                       :inputStyle="{width: '80px'}"
                       :max="18"
                       :min="1"
                       showButtons
                       @input="handleClickIncrement"/>
        </div>
      </OverlayPanel>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {computed, defineEmits, defineProps, reactive, ref, watch} from 'vue';
import {items} from "@/fixtures/items/itemsFixtures";
import {wishlistSlotsMap} from "@/fixtures/items/wishlistSlotsItems";
import {Item, WishlistSlot} from "@/types";
import WishlistCreatorSlot from '@/components/WishlistCreatorSlot.vue';
import WishlistCreatorSlotItemsList from '@/components/WishlistCreatorSlotItemsList.vue';
import {slots} from "@/fixtures/items/slotsFixtures";

const refs = ref([]);

const props = defineProps<{ wishlist: WishlistSlot[] }>();
const emits = defineEmits<{
  (e: 'wishlistChange', value: WishlistSlot[]): void;
}>();

const cursor = ref(props.wishlist.length + 1);
const acceptIncrement = ref<boolean>(true);
const selectedSlot = ref<number>();
const slotsItem = reactive<WishlistSlot[]>(wishlistSlotsMap.map((item, index) => {
  return {
    slotId: props.wishlist[index]?.slotId || item.id,
    item: props.wishlist[index]?.item || undefined,
    priority: props.wishlist[index]?.priority || 0
  }
}));

const allPriorities = computed(() => slotsItem.filter(item => item.item).map(item => item.priority).filter(item => item > 0));
const getDoublePriority = computed(() => {
  // TODO => Fix this function, we need highlight item with same priority
  return allPriorities.value.filter(item => item === selectedSlot.value).length > 1;
});

function getSlotItemById(id: number): number | undefined {
  return slotsItem[id - 1].priority && slotsItem[id - 1].item
      ? slotsItem[id - 1].priority
      : undefined
}

function handleClickIncrement() {
  acceptIncrement.value = false;
}

function handleItemSelection() {
  if (acceptIncrement.value) {
    cursor.value++;
  }
}

function filterItemsById(key): [string, Item][] {
  //CARE => StarWith used because key name slot is Bijou and Bijou2, and we search items from item.key
  return Object.entries(items).filter((item) => key.startsWith(item[1].slot.slug));
}

function handleClick(event: Event, key: number): void {
  const findItem = slotsItem.find(item => item.slotId === key);
  if (!findItem.item) {
    findItem.priority = cursor.value;
  }
  acceptIncrement.value = !findItem.item;
  refs.value[key].toggle(event);
  selectedSlot.value = findItem.priority;
}

watch(slotsItem, (newValue) => {
  emits('wishlistChange', slotsItem);
})
</script>

<style lang="scss" scoped>
.wishlist-creator {
  background-color: #fff;
  padding: 10px;
  display: flex;
  flex-wrap: wrap;
  gap: 6px;

  &__form-priority {
    margin-top: 20px;
    display: flex;
    align-items: center;
    justify-content: flex-end;

    label {
      margin-right: 10px;
    }
  }

  &__priority {
    text-align: center;
    line-height: 26px;
    font-size: 16px;
    height: 30px;
    color: #333;

    &.highlight {
      font-weight: 700;
    }
  }


  &__left, &__right, &__bottom {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
}
</style>
