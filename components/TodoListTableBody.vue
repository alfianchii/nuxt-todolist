<script setup lang="ts">
const { todos } = defineProps<{
    todos: Todo[];
}>();

function isDoneTodo(todo: Todo) {
    return todo.isDone ? 'Done' : 'Progress';
}
</script>

<template>
    <tbody class="divide-y divide-gray-200">
        <template v-if="todos.length">
            <tr v-for="todo in todos" :key="todo.id">
                <td
                    class="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap"
                >
                    {{ todo.activity }}
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
                        type="button"
                        class="inline-flex items-center text-sm font-semibold text-gray-800 border border-transparent rounded-lg gap-x-2 hover:text-gray-600 disabled:opacity-50 disabled:pointer-events-none"
                    >
                        Delete
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
