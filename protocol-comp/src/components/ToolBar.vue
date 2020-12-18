<template>
  <div class="w-100 m-3 row p-0">
    <div class="dropdown">
      <button type="button" data-toggle="modal" data-target="#newBlockDefInstForm" class="btn btn-success mr-2">New BlockDef</button>
      <button type="button" data-toggle="modal" data-target="#newParBlockDefInstForm" class="btn btn-success mr-5">New ParBlockDef</button>
      <span v-if="transfer.parent" class="text-light"><span class='font-weight-bold'>DATA TRANSFER:</span>  from <span class="badge badge-light">{{transfer.child}}</span> to <span class="badge badge-light">{{transfer.parent}}</span> at index <span class="badge badge-light">{{transfer.index}}</span></span>
</div>
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
    }
  }
}
</script>

<style>

</style>
