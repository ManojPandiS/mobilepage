<template>
    <div class="li_hdr">
        <img :src="getPhotoURL(url)"  class="user_img">
        <div class="textleft">
            <div class="user_name">{{ username }}</div>
            <span class="user_date">{{ getFormatedTime(updatedTime) }}</span>
        </div>
    </div>
</template>

<script>
import { CommonMixin } from '../../mixins/CommonMixin';

export default {    
    name: "ProfileCard",

    mixins: [ CommonMixin ],

    props: {
        url: {
            type: String,
            default: ''
        },

        username: {
            type: String,
            default: ''
        },

        updatedTime: {
            type: String,
            default: ''
        }
    },

    data() {
        return {
            
        }
    },
}
</script>
