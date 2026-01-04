<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue';
import $ from 'jquery'
import select2 from 'select2';

window.$ = $
window.jQuery = $

select2($)

const props = defineProps({
  modelValue: [String, Number],
  field: Object,
})
const emit = defineEmits(["update:modelValue"])
const selectRef = ref(null);

const resetSelect = e => {
  const $el = $(selectRef.value);
  $el.val('').trigger("change");
}

defineExpose({ selectRef, resetSelect })

onMounted(() => {
  const $el = $(selectRef.value);

  $el.select2({
    placeholder: props.field.placeholder ?? 'Pilih...',
    width: "100%",
    theme: 'bootstrap',
    ajax: props.field.ajax ?? null,
    dropdownParent: props.field.dropdownParent ? $(props.field.dropdownParent) : null
    // allowClear: true
  });

  $el.val(props.modelValue).trigger("change");

  $el.on("change", () => {
    emit("update:modelValue", $el.val());

    if (props.field.events?.change) {
      props.field.events.change($el.val())
    }
  });
});

onBeforeUnmount(() => {
  $(selectRef.value).select2("destroy");
});
</script>
<template>
  <div class="mb-3">
    <label v-if="field?.label" :for="field.name" class="form-label">
      {{ field.label }}
    </label>
    <div class="relative z-20 bg-transparent">
      <select ref="selectRef" :id="field?.name" v-bind="field?.props ?? {}" :value="modelValue"
        @change="emit('update:modelValue', $event.target.value);" :required="field?.required"
        class="dark:bg-dark-900 shadow-theme-xs focus:border-brand-300 focus:ring-brand-500/10 dark:focus:border-brand-800 h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent bg-none px-4 py-2.5 pr-11 text-sm text-gray-800 placeholder:text-gray-400 focus:ring-3 focus:outline-hidden dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30">
        <option>
          {{ field?.placeholder || "Pilih..." }}
        </option>
        <option v-for="opt in field?.options || []" :key="opt.value" :value="opt.value">
          {{ opt.label }}
        </option>
      </select>
    </div>
  </div>
</template>