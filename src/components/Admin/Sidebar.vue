<script setup>
import { useAppStore } from '@/libraries/app';
import { computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import SidebarNavLink from './SidebarNavLink.vue';
const props = defineProps({
    className: {
        type: String,
        default: 'app-side-nav'
    }
})

const appStore = useAppStore()
const route = useRoute()

const hasActiveChild = (children) => {
    const childs = Object.values(children)
    return childs?.some((child) => child.route === route.name || (child.activeState && child.activeState.includes(route.path)))
}

const isActive = menu => {
    const currentPath = route.path.replace('/page','')
    return ('/page' + menu.route === route.path || (menu.activeState && menu.activeState.includes(currentPath)))
}

// fungsi recursive filter
const filterMenus = (menus) => {
  const result = {}

  for (const [key, menu] of Object.entries(menus)) {

    // HANDLE CHILDREN (object)
    if (menu.children) {
      const filteredChildren = filterMenus(menu.children)

      if (Object.keys(filteredChildren).length > 0) {
        result[key] = {
          ...menu,
          children: filteredChildren
        }
      }

      continue
    }

    // HANDLE PERMISSION
    if (menu.permission) {
      if (appStore.hasPermission(menu.permission)) {
        result[key] = menu
      }
      continue
    }

    // MENU TANPA PERMISSION
    result[key] = menu
  }

  return result
}


const uiMenus = Object.values(appStore.ui.menus)
const menus = computed(() => filterMenus(uiMenus))

onMounted( () => {
    Object.values(menus.value).forEach(menu => {
        if(menu.children && hasActiveChild(menu.children))
        {
          toggleMenu(menu.label)
        }
    })
})
</script>
<template>
    <ul :class="className" data-simplebar>
        <li class="side-nav-title">Navigation</li>
        <template v-for="(menu, index) in menus">
            <template v-if="menu.isSection">
                <li :class="{'side-nav-title':menu.isSection, 'item-active':isActive(menu)}">
                    {{ menu.label }}
                </li>

                <template v-if="menu.children">
                <li v-for="(sectionMenu, idx) in menu.children" :class="{'side-nav-item':true, 'item-active':isActive(sectionMenu)}">
                    <SidebarNavLink :menu="sectionMenu" :index="index" />
                </li>
                </template>
            </template>
            <template v-else>
                <li :class="{'side-nav-item':!menu.isSection, 'item-active':isActive(menu)}">
                    <SidebarNavLink :menu="menu" :index="index" />
                </li>
            </template>
        </template>
    </ul>
</template>