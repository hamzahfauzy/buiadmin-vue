<script setup>
import MultiBadge from './MultiBadge.vue';
import StatusBadge from './StatusBadge.vue';
import Search from '@/components/Filter/Search.vue';
import Options from '@/components/Filter/Options.vue';
import CrudService from '@/libraries/services/crud.service';
import { computed, onMounted, ref, watch } from 'vue';
import Spinner from './Spinner.vue';
import { useAppStore } from '@/libraries/app';

const appStore = useAppStore()
const props = defineProps({
    dataLengtOptions: {
        type: Object,
        default: {
            key: "data_length",
            options: [
                {label: '10', value: 10},
                {label: '25', value: 25},
                {label: '50', value: 50},
                {label: '100', value: 100},
            ]
        }
    },
    actions: {type: Object, default: {}},
    search: {type: Object, default: {label: 'Search...'}},
    columns: {
        type: Array,
        default: []
    },
    filters: {
        type: Array,
        default: []
    },
    data: {
        type: Array,
        default: []
    },
    endpoint: {type: String, default: null},
    initCallback: null
})

const serialize = function(obj, prefix) {
  var str = [],
    p;
  for (p in obj) {
    if (obj.hasOwnProperty(p)) {
      var k = prefix ? prefix + "[" + p + "]" : p,
        v = obj[p];
      str.push((v !== null && typeof v === "object") ?
        serialize(v, k) :
        encodeURIComponent(k) + "=" + encodeURIComponent(v));
    }
  }
  return str.join("&");
}

const dataTableModel = ref({
    tableData: [],
    pagination: {},
    search: '',
    filters: {},
    sort:{
        column: '_id',
        dir: 'asc'
    },
    currentPage: 1,
    dataLength: 25,
    isLoading: false
})

const indexStart = computed(() => {
    return (dataTableModel.value.currentPage - 1) *
           dataTableModel.value.dataLength
})

function sorting(column){
    dataTableModel.value.sort = {
        column: column.key,
        dir: dataTableModel.value.sort.dir == 'asc' ? 'desc' : 'asc'
    }

    initTableData()
}

async function initTableData(dataPage = 1){
    dataTableModel.value.pagination.page = dataPage
    dataTableModel.value.currentPage = dataPage
    if(props.endpoint)
    {
        dataTableModel.value.isLoading = true
        const params = {
            page: dataTableModel.value.currentPage,
            order: dataTableModel.value.sort,
            limit: dataTableModel.value.dataLength
        }
        if(dataTableModel.value.search)
        {
            params.search = dataTableModel.value.search
        }
        
        if(dataTableModel.value.filters)
        {
            params.filters = dataTableModel.value.filters
        }

        const queryString = serialize(params)
        const request = await CrudService.get(props.endpoint + '?' + queryString)
        if(request.statusText == 'OK')
        {
            dataTableModel.value.tableData = request.data.data
            dataTableModel.value.pagination = request.data.pagination
            dataTableModel.value.isLoading = false
        }
    }
    else
    {
        dataTableModel.value.tableData = props.data
    }

    if(props.initCallback)
    {
        props.initCallback()
    }
}

const visiblePages = computed(() => {
    const { page, totalPages } = dataTableModel.value.pagination
    const delta = 2
    const range = []

    const start = Math.max(2, page - delta)
    const end   = Math.min(totalPages - 1, page + delta)

    range.push(1)

    if (start > 2) range.push('...')

    for (let i = start; i <= end; i++) {
        range.push(i)
    }

    if (end < totalPages - 1) range.push('...')

    if (totalPages > 1) range.push(totalPages)

    return range
})

const showingText = computed(() => {
    const { total, page, limit } = dataTableModel.value.pagination

    if (total === 0) return 'Showing 0 to 0 of 0 entries'

    const from = (page - 1) * limit + 1
    const to   = Math.min(page * limit, total)

    return `Showing ${from} to ${to} of ${total} entries`
})

let searchTimeout = null
watch(
  () => dataTableModel.value.search,
  (val) => {
    clearTimeout(searchTimeout)

    searchTimeout = setTimeout(() => {
      initTableData()
    }, 400)
  }
)

defineExpose({initTableData})

onMounted(() => {
    initTableData()
})
</script>
<template>
    <div class="data-table-header d-flex justify-content-between align-items-center">
        <div class="d-flex justify-content-between gap-2 align-items-center">
            <Options :field="dataLengtOptions" v-model="dataTableModel.dataLength" style="width: 74px;" @change="initTableData()" />
            <label for="">Data per page</label>
        </div>
        <div class="filter-section d-flex gap-2">
            <Search v-if="search" v-model="dataTableModel.search"/>

            <div class="dropdown" v-if="filters.length">
                <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <i class="ft ft-filter"></i>
                </button>
                <ul class="dropdown-menu shadow p-3">
                    <li>
                        <template v-for="filter in filters">
                            <Options v-if="filter.type == 'options'" :field="filter" v-model="dataTableModel.filters[filter.key]" @change="initTableData()"/>
                        </template>
                    </li>
                </ul>
            </div>
        </div>
    </div>

    <div class="datatable-wrapper position-relative">
        <div class="table-responsive">
            <table class="table data-table text-nowrap mb-0">
                <thead>
                    <tr>
                        <th style="width: 1%;">No.</th>
                        <th v-for="column in columns" class="text-nowrap" @click="column.sortable ? sorting(column) : null" :class="{'cursor-pointer': column.sortable}">
                            <div class="d-flex gap-1 align-items-center">
                                <span>{{ column.label }}</span>
    
                                <template v-if="column.sortable">
                                    <i class="ft ft-chevron-down" v-if="(dataTableModel.sort.column == column.key && dataTableModel.sort.dir == 'desc') || dataTableModel.sort.column != column.key"></i>
                                    <i class="ft ft-chevron-up" v-if="dataTableModel.sort.column == column.key && dataTableModel.sort.dir == 'asc'"></i>
                                </template>
                            </div>
                        </th>
                        <th style="width: 1%;" v-if="Object.values(actions).length"></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(data, index) in dataTableModel.tableData">
                        <td class="text-center">{{ (indexStart+index)+1 }}</td>
                        <td v-for="column in columns">
                            <MultiBadge v-if="column.type == 'multi-badge'" :data="data[column.key]" :map="column.badge" />
                            <StatusBadge v-else-if="column.type == 'status-badge'" :data="data[column.key]" :map="column.badge" />
                            <span v-else>{{ data[column.key] }}</span>
                        </td>
                        <td v-if="Object.values(actions).length">
                            <div class="dropdown datatable-dropdown-action">
                                <button class="btn dropdown-toggle p-0 px-2" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    <i class="ft ft-more-vertical"></i>
                                </button>
                                <ul class="dropdown-menu shadow">
                                    <li v-for="(action, index) in Object.values(actions)">
                                        <a class="dropdown-item" :class="action.class" :href="action.to ?? '#'" :data-id="data._id" :data-type="action.type" :data-index="index">
                                            <i v-if="action.icon" class="ft" :class="'ft-'+action.icon"></i>
                                            {{action.label}}
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </td>
                    </tr>
    
                    <tr v-if="dataTableModel.tableData.length == 0">
                        <td :colspan="columns.length+(Object.entries(actions).length ? 2 : 1)" class="text-center"><i>Tidak ada data</i></td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div class="datatable-spinner" v-if="dataTableModel.isLoading" >
            <Spinner />
        </div>
    </div>

    <div class="d-flex justify-content-between mt-2 align-items-center">
        <div class="fs-15">
            {{showingText}}
        </div>
        <nav aria-label="Page navigation example">
            <ul class="pagination m-0">
                <li class="page-item" :class="{ disabled: !dataTableModel.pagination.hasPrev }">
                    <a class="page-link" href="#" aria-label="Previous" @click="dataTableModel.pagination.hasPrev ? initTableData(dataTableModel.pagination.page - 1) : null">
                        <span aria-hidden="true">&laquo;</span>
                    </a>
                </li>
                <li class="page-item" v-for="(item, index) in visiblePages" :key="index">
                    <a class="page-link" :class="dataTableModel.currentPage == item ? 'active' : ''" href="#" v-if="item !== '...'" @click="initTableData(item)">{{item}}</a>
                    <span v-else>...</span>
                </li>
                <li class="page-item" :class="{ disabled: !dataTableModel.pagination.hasNext }">
                    <a class="page-link" href="#" aria-label="Next" @click="dataTableModel.pagination.hasNext ? initTableData(dataTableModel.pagination.page + 1) : null">
                        <span aria-hidden="true">&raquo;</span>
                    </a>
                </li>
            </ul>
        </nav>
    </div>
</template>