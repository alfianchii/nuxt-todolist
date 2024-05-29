<script setup lang="ts">
let { message } = defineProps<{
    message: Message;
}>();
const emit = defineEmits<{
    'update:todo-message': [message: Message];
}>();

function addTodo() {
    if (timeoutId.value) clearInterval(timeoutId.value);
    message = errorMessage('');
    emit('update:todo-message', message);

    if (!activity.value) {
        toastColors.value = getToastColors('bg-red-500', 'hover:bg-red-400');
        message = errorMessage('Activity cannot be empty.');
        emit('update:todo-message', message);
        timeoutId.value = activateToast(toastColors.value, message);
        return;
    }

    const id: number = new Date().getTime();
    const todo: Todo = {
        id,
        activity: activity.value,
        isDone: false,
    };

    todos.value.unshift(todo);
    activity.value = '';

    toastColors.value = getToastColors('bg-green-500', 'hover:bg-green-400');
    message = successMessage('Activity added successfully.');
    emit('update:todo-message', message);
    timeoutId.value = activateToast(toastColors.value, message);
}

function updateTodo(todo: Todo) {
    isEdit.value = true;
    const todoInput: HTMLInputElement = document.querySelector(
        '#todo-input',
    ) as HTMLInputElement;
    todoInput.focus();
    todoInput.value = todo.activity;
}

function removeTodo(todo: Todo) {
    todos.value = todos.value.filter((i: Todo) => i.id !== todo.id);
    isEdit.value = false;
    activity.value = '';
}

function handleUpdateActivity(newActivity: string) {
    activity.value = newActivity;
}
</script>

<template>
    <TodoListInput
        :data="activity"
        :editable="isEdit"
        @update:data="handleUpdateActivity"
        @addTodo="addTodo"
    />
    <TodoListTable
        :todos="todos"
        @remove:todo="removeTodo"
        @update:todo="updateTodo"
    />
</template>
