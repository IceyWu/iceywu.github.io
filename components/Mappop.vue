<script setup lang="ts">
// const dataList = ref([])
</script>

<template>
  <div class="dark:bg-black rounded-md bg-white p-5">
    <header class="header-part">
      <h3 class="header-title">
        萨拉曼卡
      </h3>
      <span class="header-subTitle">西班牙</span><button class="close">
        <span aria-hidden="true"><i class="xmark" /></span>
      </button>
    </header>
  </div>
</template>

<style>
.mapboxgl-popup-tip {
  display: none;
}
.mapboxgl-popup-content {
  padding: 0;
  background: transparent;
}
.header-part {
  width: 100%;
  display: flex;
  flex-direction: column;

  align-items: flex-start;
  background: red;
  min-width: 375px;
}
.header-title {
}
</style>
