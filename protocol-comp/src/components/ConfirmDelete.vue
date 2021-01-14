<template>
<div class="modal fade" id="confirmDelete" tabindex="-1">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header border-white">
        <h5 class="modal-title">Confirm</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        Are you sure you want to delete this item? All instances will be affected too.
      </div>
      <div class="modal-footer border-white">
        <button type="button" class="btn btn-sm btn-secondary" data-dismiss="modal">Cancel</button>
        <button @click="deleteInstance" type="button" class="btn btn-sm btn-primary" data-dismiss="modal">Confirm</button>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  data() {
    return {
      info: ""
    }
  },
  mounted() {
    this.$root.$on("delete", (data) => {
      this.info = data
    })
  },
  methods: {
    deleteInstance() {
      this.$store.commit('DELETE_ITEM', this.info)
    }
  }
}
</script>











<style>

</style>
