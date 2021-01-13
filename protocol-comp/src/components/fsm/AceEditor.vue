<template>
  <div class="mb-5">
    <editor v-model="data" @init="editorInit" lang="json" theme="chrome" width="auto" height="200"></editor>
    <div v-for="feed in feedback" :key="feed.id" class="alert alert-warning alert-dismissible fade show" role="alert">
  <strong>{{feed.path}}</strong> {{feed.message}} - {{feed.params}}
  <button type="button" class="close" data-dismiss="alert" aria-label="Close">
    <span aria-hidden="true">&times;</span>
  </button>
</div>
  </div>
</template>

<script>
import Ajv from "ajv"
const ajv = new Ajv() // options can be passed, e.g. {allErrors: true}
export default {
  components: {
    editor: require('vue2-ace-editor'),
  },
  watch: {
    data: {
      handler: function(news, old) {
        try {

        const validate = ajv.compile(this.schema)
        const valid = validate(JSON.parse(news))
        if (valid) this.feedback = []
        var logged = this.feedback.find(error => error.path == validate.errors[0].dataPath)
        if (!valid && !logged) {
          this.feedback.push({ path: validate.errors[0].dataPath, message: validate.errors[0].message, params: validate.errors[0].params })
        }


          this.$store.commit('UPDATE_ACTIVE_VARIABLES', { id: this.id, payload: JSON.parse(news) })
        } catch(error) {

        }
      }
    }
  },
  data() {
    return {
      data: JSON.stringify(this.payload, undefined, 2),
      feedback: []
    }
  },
  props: {
    payload: Object,
    id: Number,
    schema: Object
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
  font-size: 20px !important;
}
</style>
