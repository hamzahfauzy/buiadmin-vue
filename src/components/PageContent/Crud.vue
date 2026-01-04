<script setup>
import DataTable from '../DataTable.vue';
import PageTitle from '../PageTitle.vue';
import Modal from '../Modal.vue';
import Form from '../Form.vue';
import CrudService from '@/libraries/services/crud.service';
import Swal from 'sweetalert2'
import { onMounted, ref } from 'vue';
import { getNested } from '@/libraries/utility';
import { useAppStore } from '@/libraries/app';
import DetailData from '../DetailData.vue';

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
    $('#create-modal').modal('show')
}

const handleCreate = async function() {
    crudProperties.submitLabel = 'Silahkan Tunggu...'
    try {
        await CrudService.create(props.page.content.value.endpoint, createFormData.value)
        createFormData.value = {}
        dataTable.value.initTableData()
        Swal.fire({
            title: 'Berhasil',
            text: 'Data berhasil disimpan',
            icon: 'success',
            confirmButtonText: 'OK'
        })
        $('#create-modal').modal('hide')
    } catch (error) {
        console.log(error)
        if(error?.response?.data?.message)
        {
            const msg = error?.response?.data?.message
            const errors = error?.response?.data?.errors
            Swal.fire({
                title: msg,
                text: Object.values(errors).join(' '),
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

const viewData = ref({})
const openViewModal = async function(id, index = 0) {
    try {
        const endpoint = props.page.content.value.endpoint + '/' + id
        const {data} = await CrudService.get(endpoint)
        viewData.value = data.data
        $('#view-modal').modal('show')
    } catch (error) {
        
    }
}

const editFormData = ref({})
const openEditModal = async function(id, index = 0) {
    try {
        editFormData.value.id = id
        const endpoint = props.page.content.value.endpoint + '/' + id
        const {data} = await CrudService.get(endpoint)
        props.page.content.value.actions[index].fields.forEach(field => {
            if (field.type == 'file') return
            editFormData.value[field.name] = getNested(data.data, field.fieldValue ?? field.name)
        })
        $('#edit-modal').modal('show')
    } catch (error) {
        
    }
}

const handleEdit = async function() {
    crudProperties.submitLabel = 'Silahkan Tunggu...'
    try {
        const id = editFormData.value.id
        const endpoint = props.page.content.value.endpoint + '/' + id
        const payload = {...editFormData.value}
        delete payload.id
        await CrudService.edit(endpoint, payload)
        editFormData.value = {}
        dataTable.value.initTableData()
        Swal.fire({
            title: 'Berhasil',
            text: 'Data berhasil diupdate',
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
            text: errors,
            icon: 'warning',
            confirmButtonText: 'OK'
        })
    }
    crudProperties.submitLabel = 'Submit'
}

const handleDelete = async function(id) {
    Swal.fire({
        title: 'Konfirmasi',
        text: 'Apakah kamu yakin akan menghapus data ini ?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'OK'
    }).then(async (result) => {
        if (result.isConfirmed) {
            await CrudService.delete(props.page.content.value.endpoint + '/' + id)
            dataTable.value.initTableData()
            Swal.fire({
                title: "Terhapus!",
                text: "Data berhasil dihapus.",
                icon: "success"
            });
        }
    })
    
}

const dataInitCallback = function() {
    $(document).on('click', "[data-type='view']", async function(){
        const id = $(this).data('id')
        const index = $(this).data('index')
        await openViewModal(id, index)
    })

    $(document).on('click', "[data-type='edit']", async function(){
        const id = $(this).data('id')
        const index = $(this).data('index')
        await openEditModal(id, index)
    })
    
    $(document).on('click', "[data-type='delete']", async function(){
        const id = $(this).data('id')
        await handleDelete(id)
    })
}

onMounted(() => {
    actions.value = props.page.content.value.actions.filter(action => appStore.hasPermission(action.permission))
})
</script>
<template>
    <div class="crud-container">
        <PageTitle :title="page.title" :actions="[createButton]" />

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
                {{page.content.value.create.title ?? 'Form Tambah Data'}}
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
                {{page.content.value.actions.find(action => action.type == 'view').title ?? 'Form View Data'}}
            </template>

            <template v-slot:modalBody>
                <DetailData :fields="page.content.value.actions.find(action => action.type == 'view').fields" v-model="viewData"/>
            </template>
        </Modal>

        <Modal id="edit-modal" v-if="page.content.value.actions.find(action => action.type == 'edit')" :modalClass="page.content.value.create.modalClass">
            <template v-slot:modalHeader>
                {{page.content.value.actions.find(action => action.type == 'edit').title ?? 'Form Edit Data'}}
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