<template>
<div class="modal fade" id="askUpdateParBlockDefChildren" tabindex="-1">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header border-white">
        <h5 class="modal-title">Auto-Update</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <form>
          <div class="form-group">
            <label v-if="mutatedElement">A mutation in <span class="badge badge-primary">{{mutatedElement.name}}</span> was detected. Note that all its instances have been mutated as well, regardless of their position.</label>
          </div>
        </form>
      </div>
      <div class="modal-footer border-white">
        <button type="button" class="btn btn-sm btn-primary shadow-sm" data-dismiss="modal">Okay</button>
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
  }
}
</script>











<style>

</style>
