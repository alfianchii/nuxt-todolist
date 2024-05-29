<script setup lang="ts">
const { modelValue } = defineProps(['modelValue']);
const emit = defineEmits<{
    'update:modelValue': [value: string];
}>();

function handleInput(event: Event) {
    emit('update:modelValue', (event.target as HTMLInputElement).value);
}
</script>

<template>
    <input
        :value="modelValue"
        @input="handleInput($event)"
        type="text"
        class="w-full p-2 text-gray-800 placeholder-gray-400 transition-all duration-300 border border-gray-300 outline-none rounded-s focus:border-gray-500"
    />
</template>
