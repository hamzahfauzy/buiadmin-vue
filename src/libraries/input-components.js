import { defineAsyncComponent } from 'vue'

export default {
    checkbox: defineAsyncComponent(() => import("@/components/Fields/CheckboxInput.vue")),
    multiCheckbox: defineAsyncComponent(() => import("@/components/Fields/MultiCheckboxInput.vue")),
    datePicker: defineAsyncComponent(() => import("@/components/Fields/DatePickerInput.vue")),
    file: defineAsyncComponent(() => import("@/components/Fields/FileInput.vue")),
    password: defineAsyncComponent(() => import("@/components/Fields/PasswordInput.vue")),
    select: defineAsyncComponent(() => import("@/components/Fields/SelectInput.vue")),
    select2: defineAsyncComponent(() => import("@/components/Fields/Select2.vue")),
    textArea: defineAsyncComponent(() => import("@/components/Fields/TextAreaInput.vue")),
    hidden: defineAsyncComponent(() => import("@/components/Fields/HiddenInput.vue")),
    text: defineAsyncComponent(() => import("@/components/Fields/TextInput.vue")),
    timePicker: defineAsyncComponent(() => import("@/components/Fields/TimePickerInput.vue")),
    toggle: defineAsyncComponent(() => import("@/components/Fields/ToggleInput.vue")),
    radio: defineAsyncComponent(() => import("@/components/Fields/RadioInput.vue")),
    number: defineAsyncComponent(() => import("@/components/Fields/NumberInput.vue"))
}