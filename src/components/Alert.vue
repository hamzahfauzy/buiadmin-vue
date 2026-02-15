<script setup>
import { ref } from 'vue';


const alertModel = ref({
    type: 'alert-primary',
    text: 'sample alert text',
    isShow: false
})

function show(type, text, timeout = 5000)
{
    alertModel.value.isShow = true
    alertModel.value.text = text
    alertModel.value.type = type

    setTimeout(e => {
        alertModel.value.isShow = false
    }, timeout)
}

defineExpose({
    show
});

</script>
<template>
    <div class="alert" :class="alertModel.type" role="alert" v-show="alertModel.isShow">
        <span v-html="alertModel.text"></span>
    </div>
</template>