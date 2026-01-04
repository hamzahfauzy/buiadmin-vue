<script setup>
import { onMounted, ref, useId } from 'vue';
import CrudService from '@/libraries/services/crud.service';

const props = defineProps({
  modelValue: { type: [Array], default: [] },
  field: Object
})
const emit = defineEmits(["update:modelValue"])
const elId = props.field.name +'-'+ useId()
const finalOptions = ref([])

const toggle = (value) => {
  let newValue = [...props.modelValue]
  if (newValue.includes(value)) {
    newValue = newValue.filter((v) => v !== value)
  } else {
    newValue.push(value)
  }
  emit("update:modelValue", newValue)
}

onMounted(async () => {
  if(props.field.options.constructor === Array)
  {
    finalOptions.value = props.field.options
  }
  else
  {
    const options = props.field.options
    const {data} = await CrudService.get(options.url)
    finalOptions.value = data.data.map(d => {
      return {label: d[options.map.label], value: d[options.map.value]}
    })
  }
})

</script>

<template>
    <div class="mb-3">
        <label v-if="field?.label" class="form-label">
            {{ field.label }}
        </label>
        <div class="d-flex flex-wrap gap-2">
            <div class="form-check" v-for="(opt, index) in finalOptions || []">
              <input :id="elId + '' + index" v-bind="field?.props ?? {}" :name="field?.name" :checked="modelValue.includes(opt.value)" :value="opt?.value" type="checkbox" class="form-check-input" @change="toggle(opt.value)">
              <label :for="elId + '' + index" class="form-check-label">{{ opt.label }}</label>
            </div>
        </div>
    </div>
</template>