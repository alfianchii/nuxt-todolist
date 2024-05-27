<script setup lang="ts">
const { txt } = defineProps<{
    txt: string;
}>();

const ok = {
    nama: 'Alfian',
    nami: 'Alfian',
    namu: 'Alfian',
    name: 'Alfian',
    namo: 'Alfian',
    namaa: 'Alfian',
    namaaa: 'Alfian',
    nam: 'Alfian',
};
</script>

<template>
    <div>
        <span
            class="mx-1 bg-blue-500"
            v-text="`dw`"
            :class="txt"
            text-ok
            flex
            border
            px1
            py2
        ></span>
    </div>
</template>
