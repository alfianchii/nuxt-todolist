<script setup lang="ts">
const { data } = defineProps<{
    data: string;
}>();

const emit = defineEmits(['update:data', 'addTodo']);

function addTodo() {
    emit('addTodo');
}

function handleUpdateActivity(newActivity: string) {
    emit('update:data', newActivity);
}
</script>

<template>
    <main class="mt-12">
        <div class="flex">
            <BaseInput
                autofocus
                :model-value="data"
                @keyup.enter="addTodo"
                placeholder="Write your activity here ..."
                @update:model-value="handleUpdateActivity"
            />

            <BaseButton @click="addTodo" txt="Add" />
        </div>
    </main>
</template>
