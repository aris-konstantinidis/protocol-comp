<template>
<div class="card shadow-sm">
  <h5 class="sortable card-header bg-dark font-weight-bold text-light">{{def.name}} <span class="badge badge-info">FSM Template</span></h5>
  <div class="card-body">
    <div class="collapse" :id="def.name">
      <div class="alert alert-warning shadow-sm" role="alert">
        <strong>States {{Object.keys(def.body.states).length}}</strong>
      </div>
      <div class="alert alert-warning shadow-sm" role="alert">
        <strong>Transitions {{Object.keys(def.body.transitions).length}}</strong>
      </div>
    </div>
    <p class="card-text">
      <button @click="open = true" v-if="open === false" class="btn btn-primary float-right ml-2" type="button" data-toggle="collapse" :data-target="'#'+def.name">Show</button>
      <button @click="open = false" v-if="open === true" class="btn btn-warning float-right ml-2" type="button" data-toggle="collapse" :data-target="'#'+def.name">Hide</button>
      <button @click="preview" data-target="#previewModal" data-toggle="modal" class="btn btn-secondary float-right">JSON</button>
    </p>
  </div>
  <TrialInstForm />
</div>
</template>

<script>
import TrialInstForm from './TrialInstForm'
export default {
  components: {
    TrialInstForm
  },
  data() {
    return {
      open: false
    }
  },
  props: {
    def: Object
  },
  methods: {
    preview() {
      this.$store.commit('SET_DATA_TO_PREVIEW', this.def)
    }
  }
}
</script>

<style>
.sortable {
  cursor: move;
}
.sortable-drag {
  opacity: 0;
}
.caret {
  float: right !important;
}
.ghost {
  border-left: 5px solid var(--dark);
}
</style>
