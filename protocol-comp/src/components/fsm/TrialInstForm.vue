<template>
<!-- new trial instance form modal -->
<div class="modal fade" id="newTrialInstForm" tabindex="-1">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header border-white">
        <h5 class="modal-title">New Trial Instance</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <form>
          <div class="form-group">
            <input @input="checkNameValidity" v-model="name" type="text" class="form-control" placeholder="Name">
          </div>
          <div v-if="!validName" class="alert alert-warning" role="alert">
            Name <span class="badge badge-primary">{{name}}</span> already exists. Please select a unique one.
          </div>
          <div class="form-group">
            <textarea v-model="description" placeholder="Description" class="form-control"></textarea>
          </div>
          <div class="form-group form-check">
            <input v-model="blocking" value="false" type="checkbox" class="form-check-input">
            <label class="form-check-label">Blocking</label>
          </div>
          <label class="font-weight-bold">Set Variables</label>
          <div v-for="fsmVar in fsmVars" :key="fsmVar.id">
            <div class="form-group" v-if="fsmVar.fsm_tpl === transfer.child">

              <!-- integrate monaco editor -->

              <textarea :id="fsmVar.id" rows='9' class="form-control bg-dark text-light border-light" style="font-family:mono;" :value="JSON.stringify(fsmVar.payload, undefined, 2)"></textarea>
            </div>
          </div>
        </form>
      </div>
      <div class="modal-footer border-white">
        <button type="button" class="btn btn-danger shadow-sm" data-dismiss="modal">Cancel</button>
        <button @click="newTrialInstance(def.name)" type="button" class="btn btn-primary shadow-sm" data-dismiss="modal">Submit</button>
        <button ref="openAskUpdateBlockDefChildren" style="display: none;" data-toggle="modal" data-target="#askUpdateBlockDefChildren"></button>
      </div>
    </div>
  </div>
</div>
</template>

<script>

import { Trial, Variable } from '../../definitions.js'
export default {
  computed: {
    mutatedElement() {
      return this.$store.state.mutatedElement
    },
    validName() {
      return this.$store.state.validName
    },
    fsms() {
      return this.$store.state.fsms
    },
    def() {
      return this.$store.state.activeDef
    },
    fsmVars() {
      return this.$store.state.fsmVars
    },
    transfer() {
      return this.$store.state.transfer
    }
  },
  data() {
    return {
      name: '',
      description: '',
      blocking: false,
      fsm_tpl: {
        id: '',
        variables: []
      }
    }
  },
  methods: {
    checkNameValidity() {
      this.$store.commit('CHECK_NAME', this.name)
    },
    getValue(obj, path) { // extract variables from payload objects
        return path
          .split('.')
          .reduce((o, k) => {
            return o && o[k]
          }, obj)
    },
    newTrialInstance(name) {
      this.fsm_tpl.id = this.transfer.child
      for (var fsmVar in this.fsmVars) {
        if (this.transfer.child === this.fsmVars[fsmVar].fsm_tpl) {
          var payload = document.getElementById(this.fsmVars[fsmVar].id).value
          payload = JSON.parse(payload)
          for (var i = 0; i < this.fsmVars[fsmVar].vars.length; i++) {
            var transition = this.fsmVars[fsmVar].vars[i].transition
            var event_idx = this.fsmVars[fsmVar].vars[i].event_idx
            var variable_idx = this.fsmVars[fsmVar].vars[i].variable_idx
            var value = this.getValue(payload, this.fsmVars[fsmVar].vars[i].path)
            var newVar = new Variable(transition, event_idx, variable_idx, value)
            this.fsm_tpl.variables.push(newVar)
          }
        }
      }
      this.$store.commit("MUTATED_ELEMENT", { name: this.transfer.parent, ofClass: 'BlockDef' })
      this.$store.commit('ADD_ITEM', {
        action: "TTB",
        origin: this.transfer.child,
        target: this.transfer.parent,
        item: new Trial(this.name, this.description, this.blocking, this.fsm_tpl),
        index: this.transfer.index
      })
      this.name = ''
      this.description = ''
      this.blocking = false
      this.fsm_tpl = {
        id: '',
        variables: []
      }
      if (this.mutatedElement.hasInstances) {
        this.$refs['openAskUpdateBlockDefChildren'].click()
      }
    }
  }
}
</script>











<style>

</style>
