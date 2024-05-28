<script setup lang="ts">
type CheckTypeElement = 'bg' | 'hover';

let { data } = defineProps<{
    data: Message;
}>();

const emit = defineEmits<{
    'update:message': [data: Message];
}>();

function checkType(element: CheckTypeElement) {
    if (element === 'bg') {
        if (data.type === 'error') return 'bg-red-500';
        if (data.type === 'success') return 'bg-green-500';
    }

    if (element === 'hover') {
        if (data.type === 'error') return 'hover:bg-red-400';
        if (data.type === 'success') return 'hover:bg-green-400';
    }
}

function removeToast() {
    const toast: HTMLElement = document.querySelector('#toast') as HTMLElement;
    toast.classList.remove('opacity-100');
    toast.classList.add('opacity-0');
    setTimeout(() => {
        data = { type: 'error', msg: '' };
        emit('update:message', data);
    }, 300);
}
</script>

<template>
    <div
        :class="[
            'fixed top-0 right-0 mt-4 transition-all duration-300 me-4',
            data.msg ? 'opacity-100' : 'opacity-0',
        ]"
        id="toast"
    >
        <div class="flex items-center justify-center">
            <div
                :class="[
                    checkType('bg'),
                    'flex items-center justify-center px-5 py-6 text-white rounded-lg',
                ]"
            >
                <div class="space-x-1">
                    <span class="font-bold capitalize">{{ data.type }}!</span>
                    <span class="text-center">{{ data.msg }}</span>
                </div>

                <button
                    @click="removeToast"
                    :class="[
                        checkType('hover'),
                        'p-2 transition-all duration-300 rounded-md ms-3',
                    ]"
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
