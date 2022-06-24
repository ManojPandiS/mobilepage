<template>
    <header class="page_hdr">
        <em class="menu_ico" @click="toggleSideBar"></em>
        <span>User Details</span>
    </header>
</template>

<script>
export default {
    name: 'HeaderComponent',

    props: {
        toggleSideBar: {
            type: Function,
            default: () => {}
        }
    },

    data() {
        return {
            
        }
    }
}
</script>