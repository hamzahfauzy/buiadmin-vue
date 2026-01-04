<script setup>
import { useId } from 'vue';
const props = defineProps({
  modelValue: { type: [Boolean, String, Number], default: false },
  field: Object
})
const emit = defineEmits(["update:modelValue"])
const elId = props.field.name + '-' + useId()
</script>

<template>
    <div>
        <label :for="elId" class="d-flex cursor-pointer align-items-center gap-3">
            <div class="relative">
                <input :id="elId" :checked="modelValue" type="checkbox" class="sr-only" @change="emit('update:modelValue', $event.target.checked)">
                <div class="block h-6 w-11 rounded-full" :class="modelValue ? 'bg-brand-500 dark:bg-brand-500' : 'bg-gray-200 dark:bg-white/10'"></div>
                <div :class="modelValue ? 'translate-x-full': 'translate-x-0'" class="shadow-theme-sm absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white duration-300 ease-linear"></div>
            </div>

            {{field.label}}
        </label>
    </div>
</template>