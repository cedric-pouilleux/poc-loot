<template>
  <div class="wishlist-creator">
    <div class="wishlist-creator__left">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
    <div class="wishlist-creator__bottom">
      <div></div>
      <div></div>
      <div></div>
    </div>
    <div class="wishlist-creator__right">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
.wishlist-creator {
  width: 200px;
  height: 300px;
  display: flex;
  gap: 10px;

  &__left, &__right, &__bottom {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  div {
    div {
      width: 30px;
      height: 30px;
      background-color: #333;
      cursor: pointer;
    }
  }
}
</style>
