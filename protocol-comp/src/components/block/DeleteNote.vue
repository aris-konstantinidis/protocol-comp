<template>
<div class="modal fade" id="askDeleteBlockDefChildren" tabindex="-1">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header border-white">
        <h5 class="modal-title">Auto-Delete</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <form>
          <div class="form-group">
            <label v-if="mutatedElement">Block definition <span class="badge badge-primary">{{mutatedElement.name}}</span> is to be deleted. Note that all its instances will be deleted as well, regardless of their position.</label>
          </div>
        </form>
      </div>
      <div class="modal-footer border-white">
        <button type="button" class="btn btn-sm btn-secondary" data-dismiss="modal">Cancel</button>
        <button @click="deleteInstances" type="button" class="btn btn-sm btn-danger" data-dismiss="modal">Delete</button>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  computed: {
    mutatedElement() {
      return this.$store.state.mutatedElement
    }
  },
  methods: {
    deleteInstances() {
      this.$store.commit("DELETE_INSTANCES", this.mutatedElement.name)
      this.$store.commit("DELETE_DEF", { name: this.mutatedElement, ofClass: this.mutatedElement.constructor.name })
    }
  }
}
</script>











<style>

</style>
