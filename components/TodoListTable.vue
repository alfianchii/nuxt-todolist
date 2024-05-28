<script setup lang="ts">
const { todos } = defineProps<{
    todos: Todo[];
}>();
</script>

<template>
    <div class="mt-8">
        <div class="flex flex-col">
            <div class="-m-1.5 overflow-x-auto">
                <div class="p-1.5 min-w-full inline-block align-middle">
                    <div class="overflow-hidden border rounded-lg shadow">
                        <table class="min-w-full divide-y divide-gray-200">
                            <TodoListTableHeader />
                            <TodoListTableBody :todos="todos" />
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
