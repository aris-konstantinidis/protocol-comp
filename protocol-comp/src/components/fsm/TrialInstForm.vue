<template>
<!-- new trial instance form modal -->
<div class="modal fade" id="newTrialInstForm" tabindex="-1">
  <div class="modal-dialog modal-dialog-centered modal-lg">
    <div class="modal-content">
      <div class="modal-header border-white">
        <h5 class="modal-title">New Trial Instance</h5>
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
              <AceEditor :key="forceRerender" :schema="fsmVar.schema" :payload="JSON.parse(JSON.stringify(fsmVar.payload))" :id="JSON.parse(JSON.stringify(fsmVar.id))"/>
            </div>
          </div>
      </div>
      <div class="modal-footer border-white">
        <button type="button" class="btn btn-sm btn-danger shadow-sm" data-dismiss="modal">Cancel</button>
        <button @click="newTrialInstance(def.name)" type="button" class="btn btn-sm btn-primary shadow-sm" :data-dismiss="valid">Submit</button>
        <button ref="openAskUpdateBlockDefChildren" style="display: none;" data-toggle="modal" data-target="#askUpdateBlockDefChildren"></button>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import AceEditor from './AceEditor'
import { Trial, Variable } from '../../definitions.js'
export default {
  components: {
    AceEditor
  },
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
    },
    activeVariables() {
      return this.$store.state.activeVariables
    }
  },
  mounted() {
    this.$root.$on("forceRerender", () => {
      this.forceRerender++
    })
  },
  data() {
    return {
      valid: true,
      forceRerender: 0,
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
      this.valid = true
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
      if (this.name == "") {
        this.valid = false
        return
      }
      // try {
        this.valid = "modal"
        this.fsm_tpl.id = this.transfer.child

        for (var fsmVar in this.fsmVars) {
          // get vars of correct fms-template
          if (this.transfer.child === this.fsmVars[fsmVar].fsm_tpl) {

            var thisVar = this.activeVariables.find(varia => varia.id === parseInt(fsmVar))

            for (var i = 0; i < this.fsmVars[fsmVar].vars.length; i++) {
              var transition = this.fsmVars[fsmVar].vars[i].transition
              var event_idx = this.fsmVars[fsmVar].vars[i].event_idx
              var variable_idx = this.fsmVars[fsmVar].vars[i].variable_idx
              var value = this.getValue(thisVar.payload, this.fsmVars[fsmVar].vars[i].path)
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
        this.$store.commit("RESET_ACTIVE_VARIABLES")
        if (this.mutatedElement.hasInstances) {
          this.$refs['openAskUpdateBlockDefChildren'].click()
        }
        $("#newTrialInstForm .close").click();
        
      // } catch (error) {
      //   this.$store.commit("LOG_ERROR", error)
      // }
    }
  }
}
</script>











<style>

</style>
