<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarText">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item">
        <button type="button" data-toggle="modal" data-target="#newBlockDefInstForm" class="btn btn-success mr-2">New BlockDef</button>
      </li>
      <li class="nav-item">
        <button type="button" data-toggle="modal" data-target="#newParBlockDefInstForm" class="btn btn-success mr-2">New ParBlockDef</button>
      </li>
      <li class="nav-item">
      </li>
      <li class="nav-item">
        <button @click="switchView" type="button" class="btn btn-info mr-5">Draft  </button>
      </li>
      <li class="nav-item" v-if="transfer.parent">
        <a class="nav-link">Transfer from <span class="badge badge-light">{{transfer.child}}</span> to <span class="badge badge-light">{{transfer.parent}}</span> at index <span class="badge badge-light">{{transfer.index}}</span></span></a>
      </li>
    </ul>
    <span class="navbar-text">
      <span :class="valid">valid</span>
      <button @click='exportConfig' data-toggle="modal" data-target="#previewModal" type="button" class="btn btn-primary mr-2"> Export</button>
    </span>
  </div>
  <BlockDefInstForm />
  <ParBlockDefInstForm />
</nav>
</template>

<script>
import BlockDefInstForm from './block/BlockDefInstForm'
import ParBlockDefInstForm from './parent/ParBlockDefInstForm'
export default {
  components: {
    BlockDefInstForm, ParBlockDefInstForm
  },
  computed: {
    valid() {
      return this.$store.state.valid
    },
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
