<template>
<!-- new trial instance form modal -->
<div class="modal fade" id="blockInstForm" tabindex="-1">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header border-white">
        <h5 class="modal-title">New Block Instance</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <form>
          <div class="form-group">
            <input @input="checkNameValidity" v-model="name" type="text" class="form-control" placeholder="Name">
          </div>
        </form>
        <div v-if="!validName" class="alert alert-warning" role="alert">
          Name <span class="badge badge-primary">{{name}}</span> already exists. Please select a unique one.
        </div>
      </div>
      <div class="modal-footer border-white">
        <button type="button" class="btn btn-danger shadow-sm" data-dismiss="modal">Cancel</button>
        <button @click="newBlockInstance()" type="button" class="btn btn-primary shadow-sm" data-dismiss="modal">Submit</button>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  computed: {
    validName() {
      return this.$store.state.validName
    },
    def() {
      return this.$store.state.activeParBlockDef
    },
    transfer() {
      return this.$store.state.transfer
    },
    targetProtocol() {
      return this.$store.state.targetProtocol
    }
  },
  data() {
    return {
      name: ''
    }
  },
  methods: {
    checkNameValidity() {
      this.$store.commit('CHECK_NAME', this.name)
    },
    newBlockInstance() {
      // add to parentBlock or to protocol
      if (this.name == "") return false
      if (this.targetProtocol) {
        this.$store.commit('ADD_ITEM', { action: "BTPR", origin: this.transfer.child, target: this.transfer.parent, item: this.name, index: this.transfer.index})
      } else if (!this.targetProtocol) {
        this.$store.commit('ADD_ITEM', { action: "BTP", origin: this.transfer.child, target: this.transfer.parent, item: this.name, index: this.transfer.index})
      }
      this.name = ''
    }
  }
}
</script>











<style>

</style>
