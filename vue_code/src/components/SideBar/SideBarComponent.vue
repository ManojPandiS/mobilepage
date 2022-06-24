<template>
    <nav class="page_nav" :class="{'show_nav': showSideBar}">
        <div v-for="menu in menus" :key="menu.key">{{menu.title}}</div>
    </nav>
</template>

<script>
export default {
    name: 'SideBarComponent',

    props: {
        showSideBar: {
            type: Boolean,
            default: false
        },

        menus: {
            type: Array,
            default: () => {
                return []
            }
        }
    },

    data() {
        return {

        }
    }
}
</script>