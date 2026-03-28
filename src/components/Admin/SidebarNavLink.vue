<script setup>

import { useRoute } from 'vue-router'

const route = useRoute()

const props = defineProps({
    menu: {},
    index: 0
})

const isActive = menu => {
    const currentPath = route.path.replace('/page','')
    return ('/page' + menu.route === route.path || (menu.activeState && menu.activeState.includes(currentPath)))
}

</script>
<template>
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