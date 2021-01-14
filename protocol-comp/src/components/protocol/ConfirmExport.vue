<template>
  <div class="modal fade" id="confirmExport" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header border-white">
          <h5 class="modal-title">Export <span class="badge badge-info">subjects.json</span> </h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
            Note that the blocking state for each block's last trial will be set to <span class="badge badge-success">true</span>.
            This can not be reversed after export.
        </div>
        <div class="modal-footer border-white">
          <button type="button" class="btn btn-sm btn-secondary" data-dismiss="modal">Cancel</button>
          <button @click='exportConfig' data-toggle="modal" data-target="#previewModal" type="button" class="btn btn-sm btn-primary" data-dismiss="modal">Proceed</button>
        </div>
      </div>
    </div>
  </div>
  </template>

  <script>
  export default {
    methods: {
        exportConfig() {
          // set blocking state to true for last trials in a block
          this.$store.commit("SET_BLOCKING")
      }
    }
  }
  </script>

  <style scoped>
  </style>
