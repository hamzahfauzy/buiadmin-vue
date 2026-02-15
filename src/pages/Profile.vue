<script setup>
import Blank from '@/layouts/Blank.vue';
import { onMounted, ref } from 'vue';
import Form from '@/components/Form.vue';
import { useAppStore } from '@/libraries/app';
import StatusBadge from '@/components/StatusBadge.vue';
import MultiBadge from '@/components/MultiBadge.vue';
import CrudService from '@/libraries/services/crud.service';
import Swal from 'sweetalert2';

const appStore = useAppStore()
const fileInput = ref(null)

const accountModel = ref({
    fields: [
        { name: "name", label: "Name", type: "text" },
        { name: "username", label: "Username", type: "text"},
        { name: "password", label: "Password", type: "password"},
    ],
    data: {
        name: null,
        username: null,
        password: null,
    }
})

async function handleSubmit(d){
    const payload = {...accountModel.value.data}
    const {data} = await CrudService.edit('/profile/update', payload)

    accountModel.value.data.password = null

    appStore.updateAccount(data.data)

    d.callback()

    Swal.fire({
        title: 'Success',
        text: 'Account updated successfuly',
        icon: 'success',
        confirmButtonText: 'OK'
    })
}

function openFileInput(){
    fileInput.value.click()
}

async function uploadFile(){
    const fd = new FormData
    fd.append('pic', fileInput.value.files[0])
    const {data} = await CrudService.edit('/profile/picture', fd)
    fileInput.value.value = ""
    appStore.updateAccount(data.data)
    Swal.fire({
        title: 'Success',
        text: 'Profile picture updated successfuly',
        icon: 'success',
        confirmButtonText: 'OK'
    })
}

onMounted(() => {
    document.title = "My Account"
    accountModel.value.data = {
        name: appStore.ui?.user?.name,
        username: appStore.ui?.user?.username,
    }
})
</script>
<template>
    <Blank>
        <div class="m-auto" style="max-width: 720px;">
            <h1>My Account</h1>
            
            <div class="row">
                <div class="col-12 col-md-4 text-center">
                    <img :src="appStore.getPicUrl()" alt="user-image" width="100%" height="250px" class="mb-3 object-fit-cover">

                    <button class="btn btn-primary" @click="openFileInput">Change Photo</button>
                    <input type="file" name="" id="" class="opacity-0" ref="fileInput" @change="uploadFile">
                </div>
                <div class="col-12 col-md-8">
                    <Form :fields="accountModel.fields" v-model="accountModel.data" @submit="handleSubmit">

                        <div class="mb-3">
                            <label for="">Status</label>
                            <p class="m-0">
                                <StatusBadge :data="appStore.ui?.user?.isActive" :map="{
                                    color:{'1': 'success', '0': 'danger'}, 
                                    label:{'1':'Aktif', '0':'Tidak Aktif'}
                                }" />
                            </p>
                        </div>
                        
                        <div class="mb-3">
                            <label for="">Role</label>
                            <p class="m-0">
                                <MultiBadge :data="appStore.ui?.user?.roles" :map="{color: 'success', labelKey: 'name'}" />
                            </p>
                        </div>

                    </Form>
                </div>
            </div>
        </div>
    </Blank>
</template>