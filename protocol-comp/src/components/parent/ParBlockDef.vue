<template>
  <div class="blockDefDropZone card shadow-sm">
    <h5 class="card-header bg-dark font-weight-bold text-light">{{def.name}} <span class="badge badge-primary">Parent-Block Definition</span> <span v-if="def.hasInstances" class='badge badge-light'>has instances</span> <button @click="deleteParBlockDef(def)" type="button" class="close">
        <span class="text-light" aria-hidden="true">&times;</span>
      </button></h5>
    <div class="card-body">
      <div class="collapse" :id="def.name">
        <draggable group="nested" :id="def.name">
          <draggable class="dragArea" :id="def.name" :list="def.items" :group="activeList" @end="notify">
            <div class="sortable" v-for="(item, index) in def.items" :key="item.name">
              <div class="alert alert-success shadow-sm alert-dismissible fade show" role="alert">
                <strong class="font-weight-bold">{{item.name}} <span class="badge badge-dark">Block Instance</span> <span class="badge badge-success">{{item.ref}}</span></strong>
                <button @click='deleteItem(index)' type="button" class="close" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
            </div>
          </draggable>
        </draggable>
      </div>
      <p class="card-text">
        <button @mousedown="raiseException(def)" type="button" class="handle btn-sm btn btn-light float-right ml-2">Drag</button>
        <button @click="open = false" v-if="open === true" class="btn btn-sm btn-warning float-right ml-2" type="button" data-toggle="collapse" :data-target="'#'+def.name">Hide</button>
        <button @click="open = true" v-if="open === false" class="btn btn-sm btn-primary float-right ml-2" type="button" data-toggle="collapse" :data-target="'#'+def.name">Edit</button>
        <button @click="preview(def)" data-target="#previewModal" data-toggle="modal" class="btn btn-sm btn-secondary float-right">JSON</button>
        <button @click='setParBlockDef' type="button" class="btn btn-sm btn-info float-right mr-2" data-toggle="modal" data-target="#duplicateParBlockDef">Duplicate</button>
      </p>
    </div>
    <DuplParBlockDefForm :def='def' />
    <ParBlockInstForm />
    <UpdateNotePar />
    <button ref="openAskUpdateParBlockDefChildren" style="display: none;" data-toggle="modal" data-target="#askUpdateParBlockDefChildren"></button>
    <DeleteNotePar />
    <button ref="openAskDeleteParBlockDefChildren" style="display: none;" data-toggle="modal" data-target="#askDeleteParBlockDefChildren"></button>
  </div>
</template>

<script>
import UpdateNotePar from './UpdateNotePar'
import DeleteNotePar from './DeleteNotePar'
import DuplParBlockDefForm from './DuplParBlockDefForm'
import ParBlockInstForm from './ParBlockInstForm'
import draggable from 'vuedraggable'
export default {
  computed: {
    activeList() {
      return this.$store.state.activeList
    }
  },
  data() {
    return {
      open: false
    }
  },
  components: {
    draggable, DuplParBlockDefForm, ParBlockInstForm, UpdateNotePar, DeleteNotePar
  },
  props: {
    def: Object
  },
  methods: {
    raiseException(def) {
      this.$store.commit('TRANSFER_CHILD_EXCEPTION', def)
    },
    notify() {
      this.$store.commit('MUTATED_ELEMENT', this.def)
      if (this.def.hasInstances === true) {
        this.$refs['openAskUpdateParBlockDefChildren'].click()
      }
    },
    setParBlockDef() {
      this.$store.commit('SET_ACTIVE_DEF', this.def)
    },
    preview() {
      this.$store.commit('SET_DATA_TO_PREVIEW', this.def)
    },
    deleteParBlockDef(name) {
      this.$store.commit('MUTATED_ELEMENT', this.def)
      if (this.def.hasInstances === true) {
        this.$refs['openAskDeleteParBlockDefChildren'].click()
      } else {
        this.$store.commit("DELETE_DEF", { name: this.def.name, ofClass: this.def.constructor.name })
      }
    },
    deleteItem(index) {
      this.$store.commit('DELETE_ITEM', { index: index, parent: this.def.name, ofClass: this.def.constructor.name })
      this.notify()
    }
  }
}
</script>

<style>

</style>
