<template>
  <div class="fsmDropZone card shadow-sm">
    <h5 class="sortable card-header bg-dark font-weight-bold text-light">{{def.name}} <span class="badge badge-success">Block Definition</span> <button @click="deleteBlockDef(def)" type="button" class="close">
        <span class="text-light" aria-hidden="true">&times;</span>
      </button></h5>
    <div class="card-body">
      <div class="collapse" :id="def.name">
        <draggable v-model="def.items">
          <draggable :id="def.name" :list="def.items" group="fsms" @sort="ask" @end="notify">
            <div class="sortable" v-for="(item, index) in def.items" :key="item.name">
              <div class="alert alert-info shadow-sm alert-dismissible fade show" role="alert">
                <strong class="font-weight-bold">{{item.name}} <span class="badge badge-dark">Trial Instance</span> <span class="badge badge-info">{{item.fsm_tpl.id}}</span></strong>
                <button @click='deleteTrialInst(index, item.name)' :key='item.name' type="button" class="close" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
            </div>
          </draggable>
        </draggable>
      </div>
      <p class="card-text">
        <button @click="open = false" v-if="open === true" class="btn btn-warning float-right ml-2" type="button" data-toggle="collapse" :data-target="'#'+def.name">Hide</button>
        <button @click="open = true" v-if="open === false" class="btn btn-primary float-right ml-2" type="button" data-toggle="collapse" :data-target="'#'+def.name">Edit</button>
        <button @click="preview(def)" data-target="#previewModal" data-toggle="modal" class="btn btn-secondary float-right">JSON</button>
        <button @click="setBlockDef" type="button" class="btn btn-info float-right mr-2" data-toggle="modal" data-target="#duplBlockDef">Duplicate</button>
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
    ask() {
      return false
    },
    notify() {
      this.$store.commit('MUTATED_ELEMENT', this.def)
      if (this.def.hasInstances === true) {
        this.$refs['openAskUpdateBlockDefChildren'].click()
      }
    },
    setBlockDef() {
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
    deleteTrialInst(index, name) {
      this.$store.commit('DELETE_ITEM', { item: index, name: name, parent: this.def.name, ofClass: this.def.constructor.name })
      this.notify()
    }
  }
}
</script>

<style>
.
.sortable {
  cursor: move;
}
.sortable-drag {
  opacity: 100%;
}
.ghost {
  border-left: 5px solid var(--primary);
}
</style>
