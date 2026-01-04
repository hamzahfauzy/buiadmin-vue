<script setup>
import { useAppStore } from '@/libraries/app';
import { computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
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
        <li class="side-nav-title">Menu</li>
        <li v-for="(menu, index) in menus" :class="{'side-nav-title':menu.isTitle, 'side-nav-item':!menu.isTitle, 'item-active':isActive(menu)}">
            <template v-if="menu.isTitle">{{ menu.label }}</template>
            <template v-else>
                <router-link v-if="!menu.hasOwnProperty('children')" :to="'/page' + menu.route" class="nav-link has-arrow">
                    <i class="ft ft-fw" :class="'ft-'+menu.icon"></i> 
                    <span class="nav-label">
                        {{menu.label}}
                    </span>
                </router-link>
    
                <template v-else>
                    <a :href="'#sidebar-'+index" data-bs-toggle="collapse" aria-expanded="false" :aria-controls="'sidebar-'+index" class="collapsed">
                        <i class="ft ft-fw" :class="'ft-'+menu.icon"></i> 
                        <span class="nav-label">
                            {{menu.label}}
                        </span>
    
                        <span class="menu-arrow"></span>
                    </a>
    
                    <div class="collapse sidebar-collapse" :id="'sidebar-'+index" :class="{'show': isActive(menu)}">
                        <ul class="side-nav-dropdown-item">
                            <li v-for="children in menu.children" :class="{'item-active':isActive(children)}">
                                <router-link v-if="children.route" :to="'/page' + children.route">
                                    {{ children.label }}
                                </router-link>
                                <a href="#" v-else>{{ children.label }}</a>
                            </li>
                        </ul>
                    </div>
                </template>
            </template>
        </li>
    </ul>
</template>