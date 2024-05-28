<script setup lang="ts">
const initMsg: Message = errorMessage('');
const message = ref<Message>(initMsg);

function handleUpdateMessage(newMessage: Message) {
    message.value = newMessage;
}
</script>

<template>
    <div class="container min-w-full px-10 lg:px-32">
        <MainHeader />

        <BaseToast />
        <TodoList
            :message="message"
            @update:todo-message="handleUpdateMessage"
        />
    </div>
</template>
