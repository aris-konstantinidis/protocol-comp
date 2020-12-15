<template>
  <div class="w-100 m-3 row p-0">
    <div class="dropdown">
      <button type="button" data-toggle="modal" data-target="#newBlockDefInstForm" class="btn btn-success mr-2">BlockDef</button>
      <button type="button" data-toggle="modal" data-target="#newParBlockDefInstForm" class="btn btn-success">ParBlockDef</button>
</div>
      <div class="modal fade" id="newBlockDef" tabindex="-1">
        <div class="modal-dialog modal-dialog-centered">
         <div class="modal-content">
         <div class="modal-header">
         <h5 class="modal-title">New Block Definition</h5>
         <button type="button" class="close" data-dismiss="modal" aria-label="Close">
         <span aria-hidden="true">&times;</span>
         </button>
         </div>
    </div>
  </div>
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
  }
}
</script>

<style>

</style>
