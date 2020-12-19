<template>
<div v-if="file" class="modal fade" id="previewModal" tabindex="-1" aria-labelledby="previewModal" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header border-white">
        <h5 v-if="this.file.name" class="modal-title">{{this.file.name}}</h5>
        <h5 v-else class="modal-title">subjects.json</span> <span v-if="valid.errors.length === 0" class="badge badge-success">valid</span> <span v-if="valid.errors.length !== 0" class="badge badge-danger">not valid</span> </h5>

        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
          <JsonViewer :value="file" style="font-family: monospace;"></JsonViewer>
          <div v-if="valid" >
            <div class="alert alert-sm alert-danger" v-for="error in valid.errors">
              {{error.message}}
            </div>
          </div>
      </div>
      <div class="modal-footer border-white">
        <button type="button" class="btn btn-primary shadow-sm" data-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import JsonViewer from 'vue-json-viewer'
export default {
  components: {
    JsonViewer
  },
  computed: {
    valid() { return this.$store.state.subjectsJsonValid },
    file() { return this.$store.state.dataToPreview }
  }
}
</script>

<style scoped>
</style>
