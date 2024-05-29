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
    message = errorMessage('');
    emit('update:todo-message', message);

    if (!activity.value) {
        toastColors.value = getToastColors('bg-red-500', 'hover:bg-red-400');
        message = errorMessage('Activity cannot be empty.');
        emit('update:todo-message', message);
        timeoutId.value = activateToast(toastColors.value, message);
        activity.value = todo.activity;
        return;
    }

    if (activity.value === todo.activity) {
        toastColors.value = getToastColors(
            'bg-yellow-500',
            'hover:bg-yellow-400',
        );
        message = warningMessage(
            'You have not made any changes to the activity.',
        );
        emit('update:todo-message', message);
        timeoutId.value = activateToast(toastColors.value, message);
        activity.value = '';
        isEdit.value = false;
        return;
    }

    const newTodo = { ...todo, activity: activity.value };
    todos.value = todos.value.map((todo: Todo) =>
        todo.id === newTodo.id ? newTodo : todo,
    );
    activity.value = '';

    toastColors.value = getToastColors('bg-blue-500', 'hover:bg-blue-400');
    message = successMessage('Activity updated successfully.');
    emit('update:todo-message', message);
    timeoutId.value = activateToast(toastColors.value, message);

    isEdit.value = false;
}

function cancelTodo() {
    isEdit.value = false;
    const todoInput: HTMLInputElement = document.querySelector(
        '#todo-input',
    ) as HTMLInputElement;
    activity.value = '';
    todoInput.value = '';
}

function removeTodo(todo: Todo) {
    todos.value = todos.value.filter((i: Todo) => i.id !== todo.id);
    isEdit ?? cancelTodo();
}

function doneTodo(todo: Todo) {
    todos.value = todos.value.map((i: Todo) =>
        i.id === todo.id ? { ...i, isDone: !i.isDone } : i,
    );

    toastColors.value = getToastColors('bg-green-500', 'hover:bg-green-400');
    message = successMessage('Your activity has been marked as done.');
    emit('update:todo-message', message);
    timeoutId.value = activateToast(toastColors.value, message);
}

function handleUpdateActivity(newActivity: string) {
    activity.value = newActivity;
}
</script>

<template>
    <TodoListInput
        :data="activity"
        @update:data="handleUpdateActivity"
        @addTodo="addTodo"
        @cancelTodo="cancelTodo"
        @update:todo="updateTodo"
    />
    <TodoListTable
        :todos="todos"
        @remove:todo="removeTodo"
        @update:todo="updateTodo"
        @done:todo="doneTodo"
    />
</template>
