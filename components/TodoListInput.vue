<script setup lang="ts">
const { data, editable } = defineProps<{
    data: string;
    editable: boolean;
}>();

const emit = defineEmits(['update:data', 'addTodo']);

function addTodo() {
    emit('addTodo');
}

function handleUpdateActivity(newActivity: string) {
    emit('update:data', newActivity);
}
</script>

<template>
    <main class="mt-12">
        <div class="relative w-full mx-auto">
            <div
                class="relative w-[40%] mx-auto sm:w-[35%] md:w-[30%] lg:w-[25%] xl:w-[20%] 2xl:w-[20%]"
            >
                <div
                    class="absolute left-0 right-0 bottom-10 before:block before:absolute before:-inset-[1px] before:bg-gray-900"
                ></div>
            </div>
            <div
                class="relative w-[38px] right-0 left-[59.2%] sm:left-[58.8%] md:left-[57.7%] lg:left-[55.3%] xl:left-[54.5s%] 2xl:left-[55.5%]"
            >
                <div
                    class="absolute left-0 rounded-full right-0 bottom-5 before:block before:absolute before:-inset-[1px] before:rotate-90 before:bg-gray-900"
                ></div>
            </div>
            <div
                class="relative w-[38px] right-0 left-[32.8%] sm:left-[35.6%] md:left-[37.9%] lg:left-[40.48%] xl:left-[42%] 2xl:left-[42.5%]"
            >
                <div
                    class="absolute left-0 rounded-full right-0 bottom-5 before:block before:absolute before:-inset-[1px] before:rotate-90 before:bg-gray-900"
                ></div>
            </div>
        </div>

        <div class="flex">
            <BaseInput
                id="todo-input"
                autofocus
                :model-value="data"
                @keyup.enter="addTodo"
                placeholder="Write your activity here ..."
                @update:model-value="handleUpdateActivity"
            />

            <BaseDivider />

            <BaseButton
                v-if="!editable"
                @click="addTodo"
                txt="Add"
                class="rounded-e-lg"
            />

            <template v-if="editable">
                <BaseButton @click="addTodo" txt="Edit" />
                <BaseDivider />
                <BaseButton
                    @click="addTodo"
                    txt="Cancel"
                    class="rounded-e-lg"
                />
            </template>
        </div>
    </main>
</template>
