<script setup>
import DataTable from '../DataTable.vue';
import PageTitle from '../PageTitle.vue';
import Modal from '../Modal.vue';
import Form from '../Form.vue';
import CrudService from '@/libraries/services/crud.service';
import Swal from 'sweetalert2'
import { onMounted, onUnmounted, ref } from 'vue';
import { getNested } from '@/libraries/utility';
import { useAppStore } from '@/libraries/app';
import DetailData from '../DetailData.vue';
import { useRoute } from 'vue-router'

const route = useRoute()
const appStore = useAppStore()
const props = defineProps({
    page: {
        type: Object,
        default: {}
    }
})

const actions = ref([])

const crudProperties = ref({
    submitLabel: 'Submit'
})

const dataTable = ref(null)

const createFormData = ref({})
const openCreateModal = function() {
    props.page.content.value.create.fields.forEach(f => {
        if(f.hasOwnProperty('defaultValue'))
        {
            if(f.defaultFrom && f.defaultFrom == 'queryParam')
            {
                createFormData.value[f.name] = route.query['filters['+f.defaultValue+']']
            }
            else
            {
                createFormData.value[f.name] = f.defaultValue
            }
        }
    })
    $('#create-modal').modal('show')
}

function getEndpoint(additional_string = '')
{
    const endpoint = props.page.content.value.endpoint

    if(!endpoint.includes('?')) return endpoint + additional_string

    const parseEndpoint = endpoint.split('?')

    return parseEndpoint[0] + additional_string + '?' + parseEndpoint[1]
}

const handleCreate = async function() {
    crudProperties.submitLabel = 'Please wait...'
    try {
        await CrudService.create(getEndpoint(), createFormData.value)
        createFormData.value = {}
        dataTable.value.initTableData()
        Swal.fire({
            title: 'Success',
            text: 'Data saved successfuly',
            icon: 'success',
            confirmButtonText: 'OK'
        })
        $('#create-modal').modal('hide')
    } catch (error) {
        if(error?.response?.data?.message)
        {
            const msg = error?.response?.data?.message
            const errors = error?.response?.data?.errors
            Swal.fire({
                title: msg,
                html: Object.values(errors).join('<br>'),
                icon: 'warning',
                confirmButtonText: 'OK'
            })
        }
    }
    crudProperties.submitLabel = 'Submit'
}

const createButton = props.page.content.value.create && appStore.hasPermission(props.page.content.value.create.permission) ? {
    type: 'button', 
    label: props.page.content.value.create.label,
    icon: props.page.content.value.create.icon,
    to: props.page.content.value.create.to ?? '',
    clickEvent: openCreateModal
} : {};

const afterCreateButton = ref([])

const viewData = ref({})
const openViewModal = async function(id) {
    try {
        const endpoint = getEndpoint('/' + id)
        const {data} = await CrudService.get(endpoint)
        viewData.value = data.data
        $('#view-modal').modal('show')
    } catch (error) {
        
    }
}

const editFormData = ref({})
const openEditModal = async function(id) {
    try {
        editFormData.value.id = id
        const endpoint = getEndpoint('/' + id)
        const {data} = await CrudService.get(endpoint)
        const index = props.page.content.value.actions.findIndex(action => action.type == 'edit')
        props.page.content.value.actions[index].fields.forEach(field => {
            if (field.type == 'file') return
            editFormData.value[field.name] = getNested(data.data, field.fieldValue ?? field.name)
        })
        $('#edit-modal').modal('show')
    } catch (error) {
        
    }
}

const handleEdit = async function() {
    crudProperties.submitLabel = 'Please wait...'
    try {
        const id = editFormData.value.id
        const endpoint = getEndpoint( '/' + id)
        const payload = {...editFormData.value}
        delete payload.id
        await CrudService.edit(endpoint, payload)
        editFormData.value = {}
        dataTable.value.initTableData()
        Swal.fire({
            title: 'Success',
            text: 'Data updated successfuly',
            icon: 'success',
            confirmButtonText: 'OK'
        })
        $('#edit-modal').modal('hide')
    } catch (error) {
        var msg = error?.response?.data?.message
        var errors = null
        if(error?.response?.data?.errors)
        {
            errors = Object.values(error?.response?.data?.errors).join('<br>')
        }
        
        Swal.fire({
            title: msg,
            html: errors,
            icon: 'warning',
            confirmButtonText: 'OK'
        })
    }
    crudProperties.submitLabel = 'Submit'
}

const handleDelete = async function(id) {
    Swal.fire({
        title: 'Confirm',
        text: 'Are you sure to delete this data ?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'OK'
    }).then(async (result) => {
        if (result.isConfirmed) {
            const endpoint = getEndpoint( '/' + id)
            await CrudService.delete(endpoint)
            dataTable.value.initTableData()
            Swal.fire({
                title: "Deleted!",
                text: "Data deleted successfuly.",
                icon: "success"
            });
        }
    })
    
}

let viewEventMounted = false;

const dataInitCallback = function() {

    if (viewEventMounted) return;
    viewEventMounted = true;

    $('body')
    .off('click.action')
    .on('click.action', '[data-type]', async function () {
        const type = $(this).data('type');
        const id = $(this).data('id');

        switch (type) {
        case 'view':
            await openViewModal(id);
            break;

        case 'edit':
            await openEditModal(id);
            break;

        case 'delete':
            await handleDelete(id);
            break;
        }
    });
}

onUnmounted(() => {

})

onMounted(() => {
    actions.value = props.page.content.value.actions.filter(action => appStore.hasPermission(action.permission))

    props.page.content.value.afterCreate?.forEach(btn => {
        afterCreateButton.value.push({
            type: btn.type, 
            label: btn.label,
            icon: btn.icon,
            className: btn.className,
            to: btn.to ?? '',
        })
    })
})
</script>
<template>
    <div class="crud-container">
        <PageTitle :title="page.title" :actions="[createButton, ...afterCreateButton]" />

        <DataTable 
            :columns="page.content.value.columns" 
            :search="page.content.value.search" 
            :filters="page.content.value.filters"
            :actions="actions" 
            :endpoint="page.content.value.endpoint"
            :init-callback="dataInitCallback"
            ref="dataTable"/>

        <Modal id="create-modal" v-if="page.content.value.create" :modalClass="page.content.value.create.modalClass">
            <template v-slot:modalHeader>
                {{page.content.value.create.title ?? 'Create Data Form'}}
            </template>

            <template v-slot:modalBody>
                <Form :fields="page.content.value.create.fields" v-model="createFormData" :has-submit-button="false"></Form>
            </template>

            <template v-slot:modalFooter>
                <button class="btn btn-primary" @click="handleCreate()" :disabled="crudProperties.submitLabel != 'Submit' ? 'disabled' : false">{{crudProperties.submitLabel}}</button>
            </template>
        </Modal>

        <Modal id="view-modal" v-if="page.content.value.actions.find(action => action.type == 'view')" :modalClass="page.content.value.create.modalClass">
            <template v-slot:modalHeader>
                {{page.content.value.actions.find(action => action.type == 'view').title ?? 'Detail Data'}}
            </template>

            <template v-slot:modalBody>
                <DetailData :fields="page.content.value.actions.find(action => action.type == 'view').fields" v-model="viewData"/>
            </template>
        </Modal>

        <Modal id="edit-modal" v-if="page.content.value.actions.find(action => action.type == 'edit')" :modalClass="page.content.value.create.modalClass">
            <template v-slot:modalHeader>
                {{page.content.value.actions.find(action => action.type == 'edit').title ?? 'Edit Data Form'}}
            </template>

            <template v-slot:modalBody>
                <Form :fields="page.content.value.actions.find(action => action.type == 'edit').fields" v-model="editFormData" :has-submit-button="false"></Form>
            </template>

            <template v-slot:modalFooter>
                <button class="btn btn-primary" @click="handleEdit()" :disabled="crudProperties.submitLabel != 'Submit' ? 'disabled' : false">{{crudProperties.submitLabel}}</button>
            </template>
        </Modal>

    </div>
</template>