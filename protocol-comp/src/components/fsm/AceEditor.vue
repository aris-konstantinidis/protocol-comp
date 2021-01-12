<template>
  <div>
    <editor v-model="data" @init="editorInit" lang="json" theme="chrome" width="auto" height="100"></editor>
  </div>
</template>

<script>
export default {
  components: {
    editor: require('vue2-ace-editor'),
  },
  watch: {
    data: {
      handler: function(news, old) {
        try {
          this.$store.commit('UPDATE_ACTIVE_VARIABLES', { id: this.id, payload: JSON.parse(news) })
        } catch(error) {

        }
      }
    }
  },
  data() {
    return {
      data: JSON.stringify(this.payload, undefined, 2),
    }
  },
  props: {
    payload: Object,
    id: Number,
  },
  methods: {
        editorInit: function () {
            require('brace/ext/language_tools') //language extension
            require('brace/mode/html')
            require('brace/mode/json')    //language
            require('brace/mode/less')
            require('brace/theme/chrome')
            require('brace/snippets/javascript') //snippet
        },
    },

}
</script>

<style scoped>
.ace_editor {
  font-size: 16px !important;
}
</style>
