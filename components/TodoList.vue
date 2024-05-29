<script setup lang="ts">
function addTodo() {
    if (timeoutId.value) clearInterval(timeoutId.value);
    setMessage('error', '');

    if (!activity.value) {
        toastColors.value = getToastColors('bg-red-500', 'hover:bg-red-400');
        setMessage('error', 'Activity cannot be empty.');
        activateToast(toastColors.value, message.value);
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
    setMessage('success', 'Activity added successfully.');
    activateToast(toastColors.value, message.value);
}

function updateTodo(todo: Todo) {
    setMessage('error', '');

    if (!activity.value) {
        toastColors.value = getToastColors('bg-red-500', 'hover:bg-red-400');
        setMessage('error', 'Activity cannot be empty.');
        activateToast(toastColors.value, message.value);
        activity.value = todo.activity;
        return;
    }

    if (activity.value === todo.activity) {
        toastColors.value = getToastColors(
            'bg-yellow-500',
            'hover:bg-yellow-400',
        );
        setMessage('warning', 'You have not made any changes to the activity.');
        activateToast(toastColors.value, message.value);
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
    setMessage('success', 'Activity updated successfully.');
    activateToast(toastColors.value, message.value);

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
    setMessage('success', 'Your activity has been marked as done.');
    activateToast(toastColors.value, message.value);
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
