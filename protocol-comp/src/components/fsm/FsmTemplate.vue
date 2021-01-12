<template>
<div class="card shadow-sm">
  <h5 class="card-header bg-dark font-weight-bold text-light">{{def.name}} <span class="badge badge-info">FSM Template</span></h5>
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
      <button @mousedown="removeException(), resetActiveVars()" type="button" class="handle btn btn-light float-right ml-2">Drag</button>
      <button @click="open = true" v-if="open === false" class="btn btn-primary float-right ml-2" type="button" data-toggle="collapse" :data-target="'#'+def.name">More</button>
      <button @click="open = false" v-if="open === true" class="btn btn-warning float-right ml-2" type="button" data-toggle="collapse" :data-target="'#'+def.name">Hide</button>
      <button @click="preview" data-target="#previewModal" data-toggle="modal" class="btn btn-secondary float-right">JSON</button>
    </p>
  </div>
</div>
</template>

<script>
export default {
  data() {
    return {
      open: false
    }
  },
  props: {
    def: Object
  },
  methods: {
    resetActiveVars() {
      this.$store.commit("RESET_ACTIVE_VARIABLES")
    },
    removeException() {
      this.$store.commit('TRANSFER_CHILD_EXCEPTION', null)
    },
    preview() {
      this.$store.commit('SET_DATA_TO_PREVIEW', this.def)
    }
  }
}
</script>

<style>
.sortable-drag {
  opacity: 0;
}
</style>
