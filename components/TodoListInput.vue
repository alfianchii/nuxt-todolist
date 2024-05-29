<script setup lang="ts">
const { data, editable } = defineProps<{
    data: string;
    editable: boolean;
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
    <main class="mt-8">
        <div class="flex">
            <BaseInput
                id="todo-input"
                autofocus
                :model-value="data"
                @keyup.enter="addTodo"
                placeholder="Write your activity here ..."
                @update:model-value="handleUpdateActivity"
            />

            <BaseDivider />

            <BaseButton
                v-if="!editable"
                @click="addTodo"
                txt="Add"
                class="rounded-e-lg"
            />

            <template v-if="editable">
                <BaseButton @click="addTodo" txt="Edit" />
                <BaseDivider />
                <BaseButton
                    @click="addTodo"
                    txt="Cancel"
                    class="rounded-e-lg"
                />
            </template>
        </div>
    </main>
</template>
