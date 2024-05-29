<script setup lang="ts"></script>

<template>
    <div
        class="fixed top-0 right-0 mt-4 transition-all duration-300 opacity-0 mx-4"
        id="toast"
    >
        <div class="flex items-center justify-center">
            <div
                id="toast-body"
                class="flex items-center justify-center px-5 py-6 text-white rounded-lg"
            >
                <div>
                    <span class="font-bold capitalize" id="toast-type"></span>!
                    <span class="text-center" id="toast-message"></span>
                </div>

                <button
                    id="toast-btn"
                    class="p-2 transition-all duration-300 rounded-md ms-3"
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
</template>
