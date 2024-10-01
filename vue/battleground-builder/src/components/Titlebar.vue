<script setup lang="ts">
export type SuperTab = MenuButton | { title: string; subMenu: MediumTab[] };
type MediumTab = MenuButton | { title: string; subMenu: MenuButton[] };
type MenuButton = { title: string; callbackFunction: () => any };

// type SubTab =
const props = defineProps<{
  tabs: SuperTab[];
}>();
</script>

<template>
  <nav>
    <div
      v-for="(tab, index) in tabs"
      :key="index"
      class="titlebar-tab"
      @click="'callbackFunction' in tab ? tab.callbackFunction : null"
    >
      {{ tab.title }}
      <div v-if="'subMenu' in tab" class=""></div>
    </div>
    <div class="titlebar-tab filler">FILLER</div>
    <div class="titlebar-tab close">EXIT</div>
  </nav>
</template>

<style scoped lang="scss">
@import "../utils/GlobalStyling";
nav {
  display: flex;
  width: 100%;
  position: relative;
  height: 2rem;
  background-color: var(--contrast-dark);
  cursor: default;

  .titlebar-tab {
    display: flex;
    align-items: center;
    padding: 0.125rem 0.75rem;
    transition: 0.2s;
    user-select: none;
    z-index: 1;
  }

  .filler {
    flex-grow: 1;
  }
}
div {
  color: $colour-text-dark;
}
</style>
