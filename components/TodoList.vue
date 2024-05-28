<script setup lang="ts">
const todos = ref<Todo[]>([]);
const activity = ref<string>('');
let { message } = defineProps<{
    message: Message;
}>();
const emit = defineEmits<{
    'update:todo-message': [message: Message];
}>();

function addTodo() {
    if (!activity.value) {
        message = { type: 'error', msg: 'Activity cannot be empty!' };
        return emit('update:todo-message', message);
    }

    const id: number = new Date().getTime();
    const todo: Todo = {
        id,
        activity: activity.value,
        isDone: false,
    };

    todos.value.unshift(todo);
    activity.value = '';
}

function handleUpdateMessage(newMessage: Message) {
    message = newMessage;
    emit('update:todo-message', message);
}

function handleUpdateActivity(newActivity: string) {
    activity.value = newActivity;
}
</script>

<template>
    <BaseToast :data="message" @update:message="handleUpdateMessage" />
    <TodoListInput
        :data="activity"
        @update:data="handleUpdateActivity"
        @addTodo="addTodo"
    />
    <TodoListTable :todos="todos" />
</template>
