<script setup lang="ts">
import Greet from "./components/Greet.vue";
import Titlebar, { SuperTab } from "./components/Titlebar.vue";

const MENU: SuperTab[] = [
  { title: "Save", callbackFunction: () => console.log("Save") },
];
</script>

<template>
  <titlebar :tabs="MENU"></titlebar>
  <p>Hej</p>
</template>

<style scoped lang="scss"></style>
