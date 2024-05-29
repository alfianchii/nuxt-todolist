<script setup lang="ts">
const { todos } = defineProps<{
    todos: Todo[];
}>();

const emit = defineEmits<{
    'update:todo': [todo: Todo];
    'remove:todo': [todo: Todo];
    'done:todo': [todo: Todo];
}>();

function handleUpdateTodo(todo: Todo) {
    emit('update:todo', todo);
}

function handleRemoveTodo(todo: Todo) {
    emit('remove:todo', todo);
}

function handleDoneTodo(todo: Todo) {
    emit('done:todo', todo);
}
</script>

<template>
    <div class="mt-8">
        <div class="flex flex-col">
            <div class="-m-1.5 overflow-x-auto">
                <div class="p-1.5 min-w-full inline-block align-middle">
                    <div class="overflow-hidden border rounded-lg shadow">
                        <table class="min-w-full divide-y divide-gray-200">
                            <TodoListTableHeader />
                            <TodoListTableBody
                                :todos="todos"
                                @update:todo="handleUpdateTodo"
                                @remove:todo="handleRemoveTodo"
                                @done:todo="handleDoneTodo"
                            />
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
