<script setup lang="ts">
const todos = ref<Todo[]>([]);
const activity = ref<string>('');
let { message } = defineProps<{
    message: Message;
}>();
const emit = defineEmits<{
    'update:todo-message': [message: Message];
}>();

const timeoutId = ref<NodeJS.Timeout>();
const toastColors = ref<ToastColors>();

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
    message = { type: 'success', msg: 'Activity added successfully!' };
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
    />
    <TodoListTable :todos="todos" />
</template>
