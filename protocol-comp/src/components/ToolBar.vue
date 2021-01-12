<template>
  <div class="w-100 m-3 row p-0">
    <div class="dropdown">
      <button type="button" data-toggle="modal" data-target="#newBlockDefInstForm" class="btn btn-success mr-2">New BlockDef</button>
      <button type="button" data-toggle="modal" data-target="#newParBlockDefInstForm" class="btn btn-success mr-2">New ParBlockDef</button>
      <button @click='save' type="button" class="btn btn-secondary mr-2">Save</button>
      <button @click='empty' type="button" class="btn btn-secondary mr-2">Clear</button>
      <button @click='exportConfig' data-toggle="modal" data-target="#previewModal" type="button" class="btn btn-primary mr-2">Export</button>
      <button type="button" class="btn btn-light" data-toggle="modal" data-target="#loggerModal">Logger<span v-if="logger.errors.length > 0" class="badge badge-danger">{{logger.errors.length}}</span></button>
      <span v-if="transfer.parent" class="text-light"><span class='font-weight-bold'> DATA TRANSFER:</span>  from <span class="badge badge-light">{{transfer.child}}</span> to <span class="badge badge-light">{{transfer.parent}}</span> at index <span class="badge badge-light">{{transfer.index}}</span></span> | 
      <span v-if="activeVariables.length > 0" class="text-light"><span class="font-weight-bold">ACTIVE VARS: </span>{{activeVariables.length}}</span>
</div>
<BlockDefInstForm />
<ParBlockDefInstForm />
<Logger />
  </div>
</template>

<script>
import Logger from '../components/Logger'
import BlockDefInstForm from './block/BlockDefInstForm'
import ParBlockDefInstForm from './parent/ParBlockDefInstForm'
export default {
  components: {
    BlockDefInstForm, ParBlockDefInstForm, Logger
  },
  computed: {
    transfer() {
      return this.$store.state.transfer
    },
    activeVariables() {
      return this.$store.state.activeVariables
    },
    logger() {
      return this.$store.state.logger
    }
  },
  methods: {
    save() {
      this.$store.commit('SAVE_STATE')
    },
    empty() {
      localStorage.clear()
      this.$store.commit("EMPTY")
    },
    exportConfig() {
      this.$store.commit("EXPORT_CONFIGURATION")
    }
  }
}
</script>

<style>

</style>
