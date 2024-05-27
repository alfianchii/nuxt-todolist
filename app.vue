<script setup lang="ts">
interface Todo {
    id: number;
    activity: string;
    isDone: boolean;
}

interface Msg {
    status: string;
    desc: string;
}

const todos = ref<Todo[]>([]);
const activity = ref<string>('');
const initMsg = { status: '', desc: '' };
const msg = ref<Msg>(initMsg);

function addTodo() {
    if (!activity.value)
        return (msg.value = {
            status: 'Error',
            desc: 'Activity should not be empty!',
        });

    const id: number = new Date().getTime();
    const todo: Todo = {
        id,
        activity: activity.value,
        isDone: false,
    };

    todos.value.unshift(todo);
    activity.value = '';
}

function isDoneTodo(todo: Todo) {
    return todo.isDone ? 'Done' : 'Progress';
}

function removeToast() {
    const toast: HTMLElement = document.querySelector('#toast') as HTMLElement;
    toast.classList.remove('opacity-100');
    toast.classList.add('opacity-0');
    setTimeout(() => (msg.value = initMsg), 300);
}
</script>

<template>
    <div class="container min-w-full px-10 lg:px-32">
        <header class="mt-24">
            <div class="flex flex-col items-center justify-center">
                <h1 class="text-3xl text-gray-800">
                    <span class="flex items-center justify-center gap-x-2">
                        Simple Todo-App

                        <span class="font-bold text-sky-500/80">
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
                                    d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0 1 18 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3 1.5 1.5 3-3.75"
                                />
                            </svg>
                        </span>
                    </span>
                </h1>
                <p class="mt-6 font-mono text-center text-gray-600">
                    A simple todo-app built with
                    <span>
                        <img
                            width="25"
                            src="https://nuxt.com/icon.png"
                            alt="Nuxt"
                            class="inline-block"
                        />
                        <span class="text-black -ms-1 align-sub"> Nuxt </span>
                    </span>
                    and
                    <span>
                        <img
                            width="25"
                            src="https://vitejs.dev/logo-with-shadow.png"
                            alt="Vite"
                            class="inline-block"
                        />
                        <span class="text-black -ms-1 align-sub"> Vite </span>
                    </span>
                    with
                    <span>
                        <img
                            width="25"
                            src="https://www.typescriptlang.org/icons/icon-512x512.png"
                            alt="Vite"
                            class="inline-block"
                        />
                        <span class="text-black -ms-1 align-sub">
                            Typescript.
                        </span>
                    </span>
                </p>
            </div>
        </header>

        <div
            :class="[
                'fixed top-0 right-0 mt-4 transition-all duration-300 me-4',
                msg.status ? 'opacity-100' : 'opacity-0',
            ]"
            id="toast"
        >
            <div class="flex items-center justify-center">
                <div
                    class="flex items-center justify-center px-5 py-6 text-white bg-red-500 rounded-lg"
                >
                    <div class="space-x-1">
                        <span class="font-bold">{{ msg.status }}</span>
                        <span class="text-center">{{ msg.desc }}</span>
                    </div>

                    <button
                        @click="removeToast"
                        class="p-2 transition-all duration-300 rounded-md hover:bg-red-400 ms-3"
                    >
                        <svg
                            class="flex-shrink-0 size-4"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        >
                            <path d="M18 6 6 18"></path>
                            <path d="m6 6 12 12"></path>
                        </svg>
                    </button>
                </div>
            </div>
        </div>

        <main class="mt-12">
            <div class="flex">
                <input
                    autofocus
                    v-model="activity"
                    @keyup.enter="addTodo"
                    type="text"
                    class="w-full p-2 text-gray-800 placeholder-gray-400 transition-all duration-300 border border-gray-300 outline-none rounded-s focus:border-gray-500"
                    placeholder="Write your activity here ..."
                />

                <button
                    @click="addTodo"
                    class="text-white transition-all duration-300 bg-gray-900 hover:bg-gray-700 rounded-e-lg px-7 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-gray-50"
                >
                    Add
                </button>
            </div>
        </main>

        <div class="mt-8">
            <div class="flex flex-col">
                <div class="-m-1.5 overflow-x-auto">
                    <div class="p-1.5 min-w-full inline-block align-middle">
                        <div class="overflow-hidden border rounded-lg shadow">
                            <table class="min-w-full divide-y divide-gray-200">
                                <thead>
                                    <tr class="divide-x divide-gray-200">
                                        <th
                                            scope="col"
                                            class="w-4/5 px-6 py-3 text-xs font-medium text-gray-500 uppercase text-start"
                                        >
                                            Activity
                                        </th>
                                        <th
                                            scope="col"
                                            class="w-[12.5%] px-6 py-3 text-xs font-medium text-gray-500 uppercase text-start"
                                        >
                                            Status
                                        </th>
                                        <th
                                            scope="col"
                                            class="w-[12.5%] px-6 py-3 text-xs font-medium text-gray-500 uppercase text-start"
                                        >
                                            Action
                                        </th>
                                    </tr>
                                </thead>
                                <tbody class="divide-y divide-gray-200">
                                    <tr
                                        v-if="todos.length"
                                        v-for="todo in todos"
                                        :key="todo.id"
                                    >
                                        <td
                                            class="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap"
                                        >
                                            {{ todo.activity }}
                                        </td>
                                        <td
                                            class="px-6 py-4 text-sm text-gray-800 whitespace-nowrap"
                                        >
                                            <span
                                                class="px-2 py-1 border border-gray-500 rounded"
                                            >
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

                                    <tr v-if="!todos.length">
                                        <td
                                            colspan="3"
                                            class="px-6 py-4 text-sm font-medium text-center text-gray-800 whitespace-nowrap"
                                        >
                                            <span class="italic"
                                                >There is no activity :(</span
                                            >
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
