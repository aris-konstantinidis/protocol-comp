<template>
<div class="modal fade" id="newParBlockInst" tabindex="-1">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header border-white">
        <h5 class="modal-title">New Parent-Block Instance</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
          <div class="form-group">
            <input @input="checkNameValidity" v-model="name" type="text" class="form-control" placeholder="Name">
            <small v-if="!valid" class="small text-danger">Name is required</small>
          </div>
        <div v-if="!validName" class="alert alert-warning" role="alert">
          Name <span class="badge badge-primary">{{name}}</span> already exists. Please select a unique one.
        </div>
      </div>
      <div class="modal-footer border-white">
        <button @click="removeException" type="button" class="btn btn-sm btn-danger shadow-sm" data-dismiss="modal">Cancel</button>
        <button @click="newParBlockInst()" type="button" class="btn btn-sm btn-primary shadow-sm">Submit</button>
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
      return this.$store.state.activeDef
    },
    transfer() {
      return this.$store.state.transfer
    },
    transferChildException() {
      return this.$store.state.transferChildException
    }
  },
  data() {
    return {
      valid: true,
      name: ''
    }
  },
  methods: {
    removeException() {
      this.$store.commit('TRANSFER_CHILD_EXCEPTION', null)
    },
    checkNameValidity() {
      this.valid = true
      this.$store.commit('CHECK_NAME', this.name)
    },
    newParBlockInst() {
      if (this.name == "") {
          this.valid = false
          return
      }
      if (this.transferChildException) {
        this.$store.commit('ADD_ITEM', { action: 'PRTPR', origin: this.transfer.child, target: this.transfer.parent, item: this.name, index: this.transfer.index})
      } else {
        this.$store.commit('ADD_ITEM', { action: 'PTPR', origin: this.transfer.child, target: this.transfer.parent, item: this.name, index: this.transfer.index})

      }
      this.$store.commit('TRANSFER_CHILD_EXCEPTION', null)
      this.name = ''
      $("#newParBlockInst .close").click();
    }
  }
}
</script>











<style>

</style>
