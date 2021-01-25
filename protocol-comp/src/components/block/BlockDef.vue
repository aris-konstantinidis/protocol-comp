<template>
  <div class="card shadow-sm">
    <h5 class="card-header bg-dark font-weight-bold text-light">{{def.name}} <span class="badge badge-success">Block Definition</span> <span v-if="def.hasInstances" class='badge badge-light'>has instances</span> <button @click="deleteBlockDef(def)" type="button" class="close">
        <span class="text-light" aria-hidden="true">&times;</span>
      </button></h5>
    <div class="card-body">
        <div class="collapse" :id="def.name">
          <div class="fsmDropZone wrapper p-2 mb-3">
            <draggable v-model="def.items" style="min-height: 20px;">
              <draggable :id="def.name" :list="def.items" group="fsms" @end="notify">
                <div class="sortable" v-for="(item, index) in def.items" :key="item.name">
                  <div class="alert alert-info shadow-sm alert-dismissible fade show" role="alert">
                    <strong class="font-weight-bold">{{item.name}} <span class="badge badge-dark">Trial Instance</span> <span class="badge badge-info">{{item.fsm_tpl.id}}</span></strong>
                    <button @click='deleteTrialInst(index)' data-toggle="modal" data-target="#confirmDelete" :key='item.name' type="button" class="close" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                </div>
              </draggable>
            </draggable>
          </div>
        </div>
      <p class="card-text">
        <button @mousedown="removeException" type="button" class="handle btn btn-sm btn-light float-right ml-2">Drag</button>
        <button @click="open = false" v-if="open === true" class="btn btn-sm btn-warning float-right ml-2" type="button" data-toggle="collapse" :data-target="'#'+def.name">Hide</button>
        <button @click="open = true" v-if="open === false" class="btn btn-sm btn-primary float-right ml-2" type="button" data-toggle="collapse" :data-target="'#'+def.name">Edit</button>
        <button @click="preview(def)" data-target="#previewModal" data-toggle="modal" class="btn btn-sm btn-secondary float-right">JSON</button>
        <button @click="setBlockDef" type="button" class="btn btn-sm btn-info float-right mr-2">Duplicate</button>
      </p>
    </div>
  <DuplBlockDefForm :def="def" />
  <BlockInstForm />
  <UpdateNote />
  <button ref="openAskUpdateBlockDefChildren" style="display: none;" data-toggle="modal" data-target="#askUpdateBlockDefChildren"></button>
  <DeleteNote />
  <button ref="openAskDeleteBlockDefChildren" style="display: none;" data-toggle="modal" data-target="#askDeleteBlockDefChildren"></button>
  </div>
</template>

<script>
import UpdateNote from './UpdateNote'
import DeleteNote from './DeleteNote'
import BlockInstForm from './BlockInstForm'
import DuplBlockDefForm from './DuplBlockDefForm'
import draggable from 'vuedraggable'
export default {
  data() {
    return {
      open: false
    }
  },
  components: {
    draggable, DuplBlockDefForm, BlockInstForm, UpdateNote, DeleteNote
  },
  props: {
    def: Object
  },
  methods: {
    removeException() {
      this.$store.commit('TRANSFER_CHILD_EXCEPTION', null)
    },
    notify() {
      this.$store.commit('MUTATED_ELEMENT', this.def)
      if (this.def.hasInstances === true) {
        this.$refs['openAskUpdateBlockDefChildren'].click()
      }
    },
    setBlockDef() {
      var items = []
      for (var i = 0; i < this.def.items.length; i++) {
        items.push(this.def.items[i])
      }
      this.$store.commit('DUPL_DEF', { items: items, ofClass: this.def.constructor.name })
      this.$store.commit('SET_ACTIVE_DEF', this.def)
    },
    preview() {
      this.$store.commit('SET_DATA_TO_PREVIEW', this.def)
    },
    deleteBlockDef(name) {
      this.$store.commit('MUTATED_ELEMENT', this.def)
      if (this.def.hasInstances === true) {
        this.$refs['openAskDeleteBlockDefChildren'].click()
      } else {
        this.$store.commit('DELETE_DEF', { name: this.def.name, ofClass: this.def.constructor.name })
      }
    },
    deleteTrialInst(index) {
      this.$root.$emit("delete", { index: index, parent: this.def.name, ofClass: this.def.constructor.name })
    }
  }
}
</script>

<style>

</style>
