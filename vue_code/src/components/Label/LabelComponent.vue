<template>
    <div class="user_abt" :title="content">{{ content }} <!-- span class="readmore" :v-if="showReadMore">Read more</span --></div>
</template>

<script>

export default {
   name: 'LabelComponent',

   props: {
       content: {
           type: String,
           default: ''
       }
   }
}
</script>
