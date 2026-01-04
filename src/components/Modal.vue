<script setup>
const props = defineProps({
    modalId: {type:String, default: 'default-modal'},
    modalClass: {type:String, default: 'modal-lg'}
})

</script>
<template>
<div class="modal fade" :id="modalId" tabindex="-1" role="dialog" :aria-labelledby="modalId + 'Label'" aria-hidden="true">
    <div class="modal-dialog" :class="modalClass" role="document">
        <div class="modal-content">
            <div class="modal-header position-relative">
                <slot name="modalHeader"></slot>
            </div>
            <div class="modal-body">
                <slot name="modalBody"></slot>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <slot name="modalFooter"></slot>
            </div>
        </div>
    </div>
</div>
</template>