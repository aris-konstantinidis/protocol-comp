<template>
  <div class="w-100 m-3 row p-0">
      <button type="button" data-toggle="modal" data-target="#newBlockDefInstForm" class="btn btn-sm btn-success mr-2">New BlockDef</button>
      <button type="button" data-toggle="modal" data-target="#newParBlockDefInstForm" class="btn btn-sm btn-success mr-2">New ParBlockDef</button>
      <button @click='exportConfig' data-toggle="modal" data-target="#previewModal" type="button" class="btn btn-sm btn-primary mr-2">Export</button>
      <button @click="switchView" type="button" class="btn btn-sm btn-info mr-5">View  </button>
      <span v-if="transfer.parent" class="text-light"><span class='font-weight-bold'> DATA TRANSFER:</span>  from <span class="badge badge-light">{{transfer.child}}</span> to <span class="badge badge-light">{{transfer.parent}}</span> at index <span class="badge badge-light">{{transfer.index}}</span></span> |
<BlockDefInstForm />
<ParBlockDefInstForm />
  </div>
</template>

<script>
import BlockDefInstForm from './block/BlockDefInstForm'
import ParBlockDefInstForm from './parent/ParBlockDefInstForm'
export default {
  components: {
    BlockDefInstForm, ParBlockDefInstForm
  },
  computed: {
    transfer() {
      return this.$store.state.transfer
    },
  },
  methods: {
    exportConfig() {
      this.$store.commit("EXPORT_CONFIGURATION")
    },
    switchView() {
      this.$store.commit("SET_EDIT")
    }
  }
}
</script>

<style>

</style>
