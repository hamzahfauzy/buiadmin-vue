<script setup>
import { onBeforeUnmount, onMounted, ref, watch } from 'vue';
import { useId } from 'vue';
import CrudService from '@/libraries/services/crud.service';

const props = defineProps({
  modelValue: [String, Number],
  formData: { type: Object, default: () => ({}) },
  field: Object,
})
const elId = props.field.name +'-'+ useId()
const emit = defineEmits(["update:modelValue"])
const selectRef = ref(null);
const options = ref([])

const resetSelect = e => {
  const $el = $(selectRef.value);
  $el.val('').trigger("change");
}

watch(
  () => props.modelValue,
  async (val) => {
    const $el = $(selectRef.value)

    if (!$el.data('select2')) return

    if(props.modelValue && props.field.ajax.initList)
    {
      const listUrl = props.field.ajax.initList.url + '/' + props.formData[props.field.ajax.initList.key]
      const {data} = await CrudService.get(listUrl)

      $el.append(`<option value="${data.data[props.field.ajax.initList.response.id]}">${data.data[props.field.ajax.initList.response.text]}</option>`)
    }

    $el.val(val).trigger('change.select2')
  }
)

defineExpose({ selectRef, resetSelect })

onMounted(() => {
  const $el = $(selectRef.value);

  const ajax = {}

  if(props.field.ajax)
  {
    ajax.url = props.field.ajax.url

    ajax.data = function(params) {
      var query = {}

      query[props.field.ajax.term] = {
        value: params.term,
      }

      if(props.field.ajax.urlParams){
        props.field.ajax.urlParams.forEach(param => {
          query[param.key] = param.type == 'raw' ? param.value : props.formData[param.value] 
        })
      }

      return query;
    }
    ajax.processResults = function(data, page){
      // return { results: data.data }
      return {
          results: [
              { id: "", text: "" },
              ...data.data.map(d => {
                  return { id: d[props.field.ajax.response.id], text: d[props.field.ajax.response.text], data: d }
              })
          ]
      };
    }

    if(props.field.ajax.useBearer)
    {
      ajax.headers = {
          "Authorization": "Bearer " + localStorage.getItem('token'),
          "Content-Type": "application/json",
      }
    }
  }

  const select2Param = {
    placeholder: props.field.placeholder ?? 'Choose...',
    width: "100%",
    theme: 'bootstrap-5',
    ajax: ajax ?? null,
    dropdownParent: props.field.dropdownParent ? $(props.field.dropdownParent) : null,
    allowClear: true
  }

  $el.select2(select2Param);

  $el.val(props.modelValue).trigger("change");

  $el.on("change", () => {
    emit("update:modelValue", $el.val());

    // if (props.field.events?.change) {
      // props.field.events.change($el.val())
    // }
  });

  $el.on('select2:select', function (e) {
    const item = e.params.data;

    if (props.field.events?.change) {
      const change = props.field.events?.change
      const fieldToSet = change.set;     // "amount"
      const valueField = change.value;   // "remaining_amount"
      props.formData[fieldToSet] = item.data[valueField]; 
    }

    // console.log(item.id);
    // console.log(item.text);
    // console.log(item.data); // object asli dari backend
  });
});

onBeforeUnmount(() => {
  $(selectRef.value).select2("destroy");
});
</script>
<template>
  <div class="mb-2">
        <label v-if="field?.label" :for="elId" class="form-label">
            {{ field.label }}
        </label>
        <select ref="selectRef" :id="elId" v-bind="field?.props ?? {}" :value="modelValue" @change="emit('update:modelValue', $event.target.value);" :required="field?.required" class="form-select">
            <option value="">
                {{ field?.placeholder || "Choose..." }}
            </option>
            <option
                v-for="opt in field?.options || []"
                :key="opt.value"
                :value="opt.value"
            >
                {{ opt.label }}
            </option>
        </select>
    </div>
</template>