<template>
    <JsonViewer class="h-100" :value="draft" :expand-depth="6" style="font-family: monospace;"></JsonViewer>
</template>

<script>
import JsonViewer from 'vue-json-viewer'
export default {
  components: {
    JsonViewer
  },
  computed: {
    draft() {
      return this.$store.state.subjectsJSON
    }
  }
}
</script>

<style lang="css" scoped>
</style>
