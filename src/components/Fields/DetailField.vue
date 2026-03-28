<script setup>
import StatusBadge from '../StatusBadge.vue';
import MultiBadge from '../MultiBadge.vue';
import { getNested, formatDate } from '@/libraries/utility';
defineProps({
    field: {},
    data: { type: Object, default: {} },
})

function formatCurrency(value){
    return parseInt(value).toLocaleString('id-ID')
}

function parseColumn(column, data){
    const value = getNested(data, column.name)
    if(column.type == 'date')
    {
        return formatDate(value, column.format ?? 'Y-m-d H:i:s')
    }
    if(column.type == 'currency')
    {
        return formatCurrency(value)
    }
    if(column.type == 'object' && value != "")
    {
        return JSON.stringify(value)
    }
    if(column.type == 'html' && column.template)
    {
        return parseTemplate(column.template, data)
    }
    return value !== "" ? value : '&nbsp;'
}

function parseTemplate(template, row) {
    console.log(template, row)
  if (!template) return ''

  return template.replace(/{{(.*?)}}/g, (_, expression) => {
    try {
      const safeRow = {}

      Object.keys(row).forEach(key => {
        safeRow[key] = row[key] ?? ''
      })

      return new Function(
        ...Object.keys(safeRow),
        `return ${expression.trim()}`
      )(...Object.values(safeRow))

    } catch {
      return ''
    }
  })
}

function calculateFooterValue(footerItem, items) {

  if (!footerItem.formula || !items) return footerItem.value

  if (footerItem.formula === 'sum') {
    return items.reduce((total, row) => {
      return total + (Number(row[footerItem.value]) || 0)
    }, 0)
  }

  if (footerItem.formula === 'avg') {
    if (!items.length) return 0
    const sum = items.reduce((total, row) => {
      return total + (Number(row[footerItem.value]) || 0)
    }, 0)
    return sum / items.length
  }

  return 0
}
</script>
<template>
    <label for="" class="detail-label" v-if="field.label">
        {{field.label}}
    </label>
    <template v-if="field.type == 'image'">
        <div :class="field.isCenter ? 'd-flex' : ''">
            <div class="border rounded-circle" style="width: 150px;height: 150px;">
                <a :href="data[field.name]" target="_blank">
                    <img :src="parseColumn(field, data)" :alt="field.name" style="width: 100%;height: 100%;object-fit: cover;">
                </a>
            </div>
        </div>
    </template>
    <template v-else-if="field.type == 'tableItems'">
        <div class="table-responsive">
            <table class="table">
                <thead>
                <tr>
                    <th v-for="column in field?.columns"
                        :key="column.name"
                        class="text-nowrap bg-secondary text-white fw-normal"
                        :class="column.className ?? ''"
                        style="min-width: 100px;">
                    {{ column.columnLabel }}
                    </th>
                </tr>
                </thead>

                <tbody>
                    <tr v-for="(row, rowIndex) in data[field?.name]" :key="rowIndex">
                        <td v-for="column in field?.columns" :key="column.name" class="text-nowrap" :class="column.className ?? ''" v-html="parseColumn(column, row)"></td>
                    </tr>
                </tbody>

                <tfoot v-if="field?.footer?.length">
                    <tr>
                        <td v-for="(footerItem, index) in field.footer" :key="index" :class="footerItem.className ?? ''">

                        <!-- RAW TEXT -->
                        <span v-if="footerItem.type === 'raw'">
                            {{ footerItem.value }}
                        </span>

                        <!-- CURRENCY -->
                        <span v-else-if="footerItem.type === 'currency'">
                            {{ formatCurrency(calculateFooterValue(footerItem, data[field?.name])) }}
                        </span>

                        <!-- DEFAULT -->
                        <span v-else>
                            {{ calculateFooterValue(footerItem, data[field?.name]) }}
                        </span>

                        </td>
                    </tr>
                </tfoot>
            </table>
            </div>
    </template>
    <template v-else>
        <p class="m-0 detail-item">
            <a v-if="field.type == 'link'" :href="data[field.name]" target="_blank">{{ field.linkLabel ?? parseColumn(field, data) }}</a>
            <MultiBadge v-else-if="field.type == 'multi-badge'" :data="data[field.name]" :map="field.badge" />
            <StatusBadge v-else-if="field.type == 'status-badge'" :data="data[field.name]" :map="field.badge" />
            <span v-else v-html="field.map ? field.map[data[field.name]] : parseColumn(field, data)"></span>
        </p>
    </template>
</template>