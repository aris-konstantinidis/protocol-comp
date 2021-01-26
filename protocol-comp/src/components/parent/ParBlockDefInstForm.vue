<template>
<!-- new trial instance form modal -->
<div class="modal fade" id="newParBlockDefInstForm" tabindex="-1">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header border-white">
        <h5 class="modal-title">New Parent-Block Definition</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
          <div class="form-group">
            <input @input="checkNameValidity" v-model="name" type="text" class="form-control" placeholder="Name">
            <small v-if="!valid" class="small text-danger">Name can not be empty</small>
          </div>
        <div v-if="!validName" class="alert alert-warning" role="alert">
          Name <span class="badge badge-primary">{{name}}</span> already exists. Please select a unique one.
        </div>
      </div>
      <div class="modal-footer border-white">
        <button type="button" class="btn btn-sm btn-danger shadow-sm" data-dismiss="modal">Cancel</button>
        <button @click="newParBlockDef" type="button" class="btn btn-sm btn-primary shadow-sm" >Submit</button>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import $ from 'jquery'
export default {
  computed: {
    validName() {
      return this.$store.state.validName
    },
    transfer() {
      return this.$store.state.transfer
    }
  },
  data() {
    return {
      valid: true,
      name: ''
    }
  },
  methods: {
    checkNameValidity() {
      this.valid = true
      this.$store.commit('CHECK_NAME', this.name)
    },
    newParBlockDef() {
        if (this.name == "") {
          this.valid = false
          return false
        }
        this.$store.commit('NEW_DEF', { name: this.name, ofClass: 'ParBlockDef'})
        this.name = ''
        $("#newParBlockDefInstForm .close").click()

    },
  }
}
</script>











<style>

</style>
