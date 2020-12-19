<template>
<div class="parBlockDefDropZone card shadow-sm">
  <h5 class="card-header bg-dark font-weight-bold text-light">{{def.name}} <span class="badge badge-secondary">Protocol Template</span></h5>
  <div class="card-body">
    <draggable class="dragArea" :id="def.name" :list="def.items" :group="activeList">
      <div class="sortable" v-for="(item, index) in def.items" :key="item.name">
        <div class="alert alert-primary shadow-sm alert-dismissible fade show" role="alert">
          <strong class="font-weight-bold">{{item.name}} <span class="badge badge-dark">Block Instance</span> <span class="badge badge-primary">{{item.ref}}</span></strong>
          <button @click='deleteItem(index)' type="button" class="close" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
      </div>
    </draggable>
    <p class="card-text">
      <button @click="preview(def)" data-target="#previewModal" data-toggle="modal" class="btn btn-secondary float-right">JSON</button>
    </p>
  </div>
</div>
</template>

<script>
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
    draggable
  },
  props: {
    def: Object
  },
  methods: {
    // flatten() {
    //   var flat = []
    //   function extract(object, nameArray) {
    //     var nameArray = nameArray || [];
    //     if (object.items) {
    //       nameArray.push(object.name)
    //       for (var i = 0; i < object.items.length; i++) {
    //         extract(object.items[i], nameArray)
    //       }
    //       nameArray.pop();
    //       return
    //     }
    //     nameArray.push(object.name)
    //     object.labels = JSON.parse(JSON.stringify(nameArray))
    //     flat.push(object)
    //     nameArray.pop();
    //   }
    //   extract(this.def)
    //   console.log(flat)
    // },
    preview() {
      this.$store.commit('SET_DATA_TO_PREVIEW', this.def)
    },
    deleteItem(index) {
      this.$store.commit('DELETE_ITEM', { index: index, parent: this.def.name, ofClass: this.def.constructor.name })
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

.ghost {
  border-left: 5px solid var(--primary);
}
</style>
