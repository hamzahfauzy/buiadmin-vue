<script setup>
import { useId } from 'vue';
const props = defineProps({
  modelValue: { type: [Boolean, String, Number], default: false },
  field: Object
})
const emit = defineEmits(["update:modelValue"])
const elId = props.field.name +'-'+useId()
</script>
<template>
    <div class="mb-3">
        <label v-if="field?.label" class="form-label">
            {{ field.label }}
        </label>
        <div class="flex flex-wrap items-center gap-8">
            <div v-for="opt in field?.options || []" :key="opt.value">
                <label class="flex cursor-pointer items-center text-sm font-medium text-gray-700 select-none dark:text-gray-400">
                    <div class="position-relative">
                        <input :id="elId" type="checkbox" v-bind="field?.props ?? {}" class="sr-only" :required="field?.required" :name="field.name" :value="opt.value" :checked="modelValue === opt.value" @change="emit('update:modelValue', opt.value)">
                        <div :class="modelValue === opt.value ? 'border-brand-500 bg-brand-500' : 'bg-transparent border-gray-300 dark:border-gray-700'" class="hover:border-brand-500 dark:hover:border-brand-500 mr-3 flex h-5 w-5 items-center justify-center rounded-full border-[1.25px]">
                            <span class="h-2 w-2 rounded-full bg-white" :class="modelValue === opt.value ? 'bg-white' : 'bg-white dark:bg-[#171f2e]'"></span>
                        </div>
                    </div>
                    {{ opt.label }}
                </label>
            </div>
        </div>
    </div>
</template>