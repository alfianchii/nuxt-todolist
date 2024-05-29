<script setup lang="ts"></script>

<template>
    <div class="container min-w-full px-10 lg:px-32">
        <MainHeader />
        <BaseToast />
        <TodoList :message="message" />
    </div>
</template>
