<template>
    <div 
        class="user_box" 
        :key="cardData.id"
        :class="{'show_delete': this.card.showDelete}"
        @mousedown="onMouseDown"
        @mouseup="onMouseUp"
        @click="hideDelete"
    >
        <!-- Delete button -->
        <button-component v-if="this.card.showDelete" @click="onDeleteHandler"/>

        <!-- Profile card component -->
        <profile-card 
            :updated="cardData.updated"
            :url="cardData.author.photoUrl"
            :username="cardData.author.name"
        />

        <!-- User detaile label -->
        <label-component :content="cardData.content" />
        
    </div>
</template>

<script>
import ButtonComponent from '../Button/ButtonComponent.vue'
import LabelComponent from '../Label/LabelComponent.vue'
import ProfileCard from './ProfileCard.vue'

export default {
    name: 'CardComponent',

    props: {
        cardData: {
            type: Object,
            default: () => {
                return {}
            }
        },

        onDeleteHandler: {
            type: Function,
            default: () => {}
        }
    },

    data() {
        return {
            card: {},
            position: undefined   
        }
    },

    created() {
        this.init();
    },

    methods: {
        init() {
            this.card = {...this.cardData};
        },

        onMouseDown({ clientX }) {
            this.position = clientX
        },

        onMouseUp({ clientX }) {
            if((this.position != clientX) && (this.position <= clientX)) {
                this.card.showDelete = true;
            }

            setTimeout(() => {
                this.position = undefined;
            }, 10);
        },

        hideDelete({clientX}) {
            (this.position == clientX) && (this.card.showDelete = false);   
        }
    },

    components: {
        ProfileCard,
        ButtonComponent,
        LabelComponent
    }
}
</script>