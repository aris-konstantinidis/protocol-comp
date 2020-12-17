<template>
  <div class="w-100 m-3 row p-0">
    <div class="dropdown">
      <button type="button" data-toggle="modal" data-target="#newBlockDefInstForm" class="btn btn-success mr-2">New BlockDef</button>
      <button type="button" data-toggle="modal" data-target="#newParBlockDefInstForm" class="btn btn-success mr-5">New ParBlockDef</button>
      <span class="text-light"> Catched exception: <span v-if="transferChildException"  class="badge badge-light">{{transferChildException.name}}</span></span>
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
    transferChildException() {
      return this.$store.state.transferChildException
    }
  }
}
</script>

<style>

</style>
