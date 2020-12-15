<template>
<!-- new trial instance form modal -->
<div class="modal fade" id="duplicateParBlockDef" tabindex="-1">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Parent-Block Definition Duplication <span class="badge badge-primary">{{def.name}}</span> </h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <form>
          <div class="form-group">
            <input @input="checkNameValidity" v-model="name" type="text" class="form-control" placeholder="Change name">
          </div>
        </form>
        <div v-if="!validName" class="alert alert-warning" role="alert">
          Name <span class="badge badge-primary">{{name}}</span> already exists. Please select a unique one.
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-danger shadow-sm" data-dismiss="modal">Cancel</button>
        <button @click="newParBlockDef" type="button" class="btn btn-primary shadow-sm" data-dismiss="modal">Submit</button>
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
    newParBlockDef() {
      var items = []
      for (var i = 0; i < this.def.items.length; i++) {
        items.push(this.def.items[i])
      }
      this.$store.commit('DUPL_DEF', { name: this.name, items: items, ofClass: this.def.constructor.name })
      this.name = ''
      items = []
    },
  }
}
</script>











<style>

</style>
