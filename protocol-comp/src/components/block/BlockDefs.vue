<template>
  <div>
    <div class="mb-3" v-for="def in blockDefs" :key="def.name" >
      <BlockDef :def="def"/>
      <TrialInstForm />
    </div>
  </div>
</template>

<script>
import BlockDef from './BlockDef'
import TrialInstForm from './fsm/TrialInstForm'
export default {
  components: {
    BlockDef, TrialInstForm
  },
  computed: {
    blockDefs() {
      return this.$store.state.blockDefs
    }
  }
}
</script>

<style>

</style>
