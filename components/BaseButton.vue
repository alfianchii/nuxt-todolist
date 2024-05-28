<script setup lang="ts">
const { txt } = defineProps<{
    txt: string;
}>();
</script>

<template>
    <button
        class="text-white transition-all duration-300 bg-gray-900 hover:bg-gray-700 rounded-e-lg px-7 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-gray-50"
    >
        {{ txt }}
    </button>
</template>
