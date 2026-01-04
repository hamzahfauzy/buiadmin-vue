<script setup>
import { ref } from 'vue';
import { useId } from 'vue';

const props = defineProps({
  modelValue: String,
  field: Object
})
const emit = defineEmits(["update:modelValue"])
const showPassword = ref(false)
const elId = props.field.name +'-'+useId()
</script>
<template>
    <div class="mb-3">
        <label v-if="field?.label" :for="elId" class="form-label">
            {{field.label}}
        </label>
        <div class="form-password position-relative">
            <input :type="showPassword ? 'text' : 'password'" v-bind="field?.props ?? {}" :id="elId" :placeholder="field?.placeholder || ''" :value="modelValue" :required="field?.required" @input="emit('update:modelValue', $event.target.value)" class="form-control">
            <button type="button" class="btn toggle-password-btn" aria-label="Toggle password visibility" @click="showPassword = !showPassword">
                <i class="ft ft-eye" v-if="!showPassword"></i>
                <i class="ft ft-eye-off" v-if="showPassword"></i>
            </button>
        </div>
    </div>
</template>