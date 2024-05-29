<script setup lang="ts">
const { todos } = defineProps<{
    todos: Todo[];
}>();

const emit = defineEmits<{
    'update:todo': [todo: Todo];
    'remove:todo': [todo: Todo];
    'done:todo': [todo: Todo];
}>();

function isDoneTodo(todo: Todo) {
    return todo.isDone ? 'Done' : 'Progress';
}

function handleUpdateTodo(todo: Todo) {
    const input = document.querySelector('#todo-input') as HTMLInputElement;
    activity.value = todo.activity;
    input.focus();
    input.setAttribute('todo-id', todo.id.toString());
    isEdit.value = true;
}

function handleRemoveTodo(todo: Todo) {
    emit('remove:todo', todo);
}

function handleDoneTodo(todo: Todo) {
    emit('done:todo', todo);
}
</script>

<template>
    <tbody class="divide-y divide-gray-200">
        <template v-if="todos.length">
            <tr v-for="todo in todos" :key="todo.id">
                <td
                    class="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap"
                >
                    <span v-if="!todo.isDone">{{ todo.activity }}</span>
                    <span v-if="todo.isDone" class="line-through">{{
                        todo.activity
                    }}</span>
                </td>
                <td class="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                    <span class="px-2 py-1 border border-gray-500 rounded">
                        {{ isDoneTodo(todo) }}
                    </span>
                </td>
                <td
                    class="px-6 py-4 text-sm font-medium text-center whitespace-nowrap"
                >
                    <button
                        v-if="!todo.isDone"
                        @click="handleDoneTodo(todo)"
                        type="button"
                        class="inline-flex items-center text-sm font-semibold text-green-500 transition-all duration-300 border border-transparent rounded-lg gap-x-2 hover:text-green-700 disabled:opacity-50 disabled:pointer-events-none"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            class="size-6"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="m4.5 12.75 6 6 9-13.5"
                            />
                        </svg>
                    </button>
                    <button
                        @click="handleUpdateTodo(todo)"
                        type="button"
                        class="inline-flex items-center text-sm font-semibold text-yellow-500 transition-all duration-300 border border-transparent rounded-lg gap-x-2 hover:text-yellow-700 disabled:opacity-50 disabled:pointer-events-none"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            class="size-6"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                            />
                        </svg>
                    </button>
                    <button
                        @click="handleRemoveTodo(todo)"
                        type="button"
                        class="inline-flex items-center text-sm font-semibold text-red-500 transition-all duration-300 border border-transparent rounded-lg gap-x-2 hover:text-red-700 disabled:opacity-50 disabled:pointer-events-none"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            class="size-6"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M6 18 18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                </td>
            </tr>
        </template>

        <tr v-else>
            <td
                colspan="3"
                class="px-6 py-4 text-sm font-medium text-center text-gray-800 whitespace-nowrap"
            >
                <span class="italic">There is no activity :(</span>
            </td>
        </tr>
    </tbody>
</template>
