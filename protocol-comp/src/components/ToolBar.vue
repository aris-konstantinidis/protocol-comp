<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarText">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item">
        <button type="button" data-toggle="modal" data-target="#newBlockDefInstForm" class="btn btn-sm btn-success mr-2">New BlockDef</button>
      </li>
      <li class="nav-item">
        <button type="button" data-toggle="modal" data-target="#newParBlockDefInstForm" class="btn btn-sm btn-success mr-5">New ParBlockDef</button>
      </li>
      <li class="nav-item" v-if="transfer.parent">
        <a class="nav-link mr-5">Transfered <span class="badge badge-light">{{transfer.child}}</span> to <span class="badge badge-light">{{transfer.parent}}</span> at index <span class="badge badge-light">{{transfer.index}}</span></span></a>
      </li>
      <li v-if="mutatedElement" class="nav-item">
        <a class="nav-link">Mutated <span class="badge badge-light">{{mutatedElement.name}}</span></a>
      </li>
    </ul>
    <span class="navbar-text">
      <span :class="valid">valid</span>
      <button @click="switchView" type="button" class="btn btn-sm btn-info mr-2">Draft  </button>
      <button data-toggle="modal" data-target="#confirmExport" type="button" class="btn btn-sm btn-primary mr-2"> Export</button>
    </span>
  </div>
  <BlockDefInstForm />
  <ParBlockDefInstForm />
  <ConfirmExport />
</nav>
</template>

<script>
import BlockDefInstForm from './block/BlockDefInstForm'
import ParBlockDefInstForm from './parent/ParBlockDefInstForm'
import ConfirmExport from './protocol/ConfirmExport'
export default {
  components: {
    BlockDefInstForm, ParBlockDefInstForm, ConfirmExport
  },
  computed: {
    valid() {
      return this.$store.state.valid
    },
    transfer() {
      return this.$store.state.transfer
    },
    mutatedElement() {
      return this.$store.state.mutatedElement
    }
  },
  methods: {
    switchView() {
      this.$store.commit("SET_EDIT")
    }
  }
}
</script>

<style>

</style>
