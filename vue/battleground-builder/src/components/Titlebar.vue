<script setup lang="ts">
import { backgroundDark } from '../utils/Styling';
type Tab = (string | { tabName: string, subMenu: Tab })[];
const props = defineProps<{
    tabs: (string)[]
}>()
</script>

<template>
    <nav>
        <div class="titlebar-tab">1</div>
        <div class="titlebar-tab">2</div>
        <div class="titlebar-tab filler">Hej</div>
        <div class="titlebar-tab close">exit</div>
    </nav>
</template>

<style scoped>
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
        padding: .125rem .75rem;
        transition: .2s;
        user-select: none;
        z-index: 1;
    }

    .filler {
        flex-grow: 1;
        -webkit-app-region: drag;
    }
}
</style>