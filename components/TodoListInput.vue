<script setup lang="ts">
const { data } = defineProps<{
    data: string;
}>();

const emit = defineEmits<{
    'update:data': [data: string];
    addTodo: [];
    cancelTodo: [];
    'update:todo': [todo: Todo];
}>();

function addTodo() {
    emit('addTodo');
}

function updateTodo() {
    const input = document.querySelector('#todo-input') as HTMLInputElement;
    const todoId = input.getAttribute('todo-id') ?? (0 as number);
    const todo: Todo = todos.value.filter((i: Todo) => i.id == todoId)[0];
    emit('update:todo', todo);
}

function enteredInput() {
    isEdit.value ? updateTodo() : addTodo();
}

function cancelTodo() {
    emit('cancelTodo');
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
                @keyup.enter="enteredInput"
                placeholder="Write your activity here >_<"
                @update:model-value="handleUpdateActivity"
            />

            <BaseDivider />

            <BaseButton
                v-if="!isEdit"
                @click="addTodo"
                txt="Add"
                class="rounded-e-lg"
            />

            <template v-if="isEdit">
                <BaseButton @click="updateTodo" txt="Edit" />
                <BaseDivider />
                <BaseButton
                    @click="cancelTodo"
                    txt="Cancel"
                    class="rounded-e-lg"
                />
            </template>
        </div>
    </main>
</template>
