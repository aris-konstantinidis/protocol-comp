<template>
  <div>
    <div class="mb-3" v-for="def in parBlockDefs" :key="def.name" >
      <ParBlockDef :def="def"/>
      <BlockInstForm />
    </div>
  </div>
</template>

<script>
import ParBlockDef from './ParBlockDef'
import BlockInstForm from './block/BlockInstForm'
export default {
  components: {
    ParBlockDef, BlockInstForm
  },
  computed: {
    parBlockDefs() {
      return this.$store.state.parBlockDefs
    }
  }
}
</script>

<style>

</style>
