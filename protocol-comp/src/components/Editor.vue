<template>
  <div class="row p-0 m-0 w-100 h-100">
    <!-- fms templates -->
    <div class="col p-0 m-3">
      <draggable :sort="false" class="dragArea" :list="fsms" :group="{ name: 'fsms', put: false, pull: 'clone'}" :clone="setChildTransfer" @end="setTransferInfo">
        <div class="mb-3" v-for="fsm in fsms" :key="fsm.name">
          <FsmTemplate :def="fsm" />
        </div>
      </draggable>
    </div>

    <!-- block definitions -->
    <div class="col p-0 m-3">
        <button ref="openTrialInstFormTrigger" style="display: none;" data-toggle="modal" data-target="#newTrialInstForm"></button>
      <draggable :sort="false" class="dragArea" :list="blockDefs" :group="{ name: 'blocks', put: false, pull: 'clone'  }" :clone="setChildTransfer" @end="setTransferInfo">
        <div class="mb-3" v-for="def in blockDefs" :key="def.name">
          <BlockDef :def="def"/>
        </div>
      </draggable>
    </div>

    <!-- parent-block definitions -->
    <div class="col p-0 m-3">
      <button type="button" ref="openBlockInstFormTrigger" style="display: none;" data-toggle="modal" data-target="#blockInstForm"></button>
      <draggable :sort="false" class="dragArea" :list="parBlockDefs" :group="{ name: 'parBlocks', put: false, pull: 'clone' }" :clone="setChildTransfer" @end="setTransferInfo">
        <div class="mb-3" v-for="def in parBlockDefs" :key="def.name">
          <draggable :list="parBlockDefs" :group="{ name: 'nested', pull: 'clone', put: false }" :clone="setChildTransfer" @end="setTransferInfo">
          <ParBlockDef :def="def" />
        </draggable>
        </div>
      </draggable>
    </div>

    <!-- protocol definitions -->
    <div class="col p-0 m-3">
      <button type="button" ref="openParBlockInstFormTrigger" style="display: none;" data-toggle="modal" data-target="#newParBlockInst"></button>
        <div class="mb-3" v-for="def in protocols" :key="def.name">
          <ProtocolTemp :def="def" />
        </div>
    </div>
  </div>
</template>

<script>
import draggable from "vuedraggable";
import FsmTemplate from './fsm/FsmTemplate'
import BlockDef from './block/BlockDef'
import ParBlockDef from './parent/ParBlockDef'
import ProtocolTemp from './protocol/ProtocolTemp'
export default {
  data() {
    return {
      selectedChild: null,
    }
  },
  components: {
    draggable, BlockDef, FsmTemplate, ParBlockDef, ProtocolTemp
  },
  computed: {
    protocols() {
      return this.$store.state.protocols
    },
    fsms() {
      return this.$store.state.fsms
    },
    blockDefs() {
      return this.$store.state.blockDefs
    },
    parBlockDefs() {
      return this.$store.state.parBlockDefs
    },
    activeList() {
      return this.$store.state.activeList
    }
  },
  methods: {
    setChildTransfer(def) {
      
      var dropzones, i
      if (def.constructor.name === 'Fsm') {
        dropzones = document.getElementsByClassName('fsmDropZone')
        for (i = 0; i < dropzones.length; i++) {
          dropzones[i].classList.add('alert-primary')
        }
      }
      if (def.constructor.name === 'BlockDef') {
        dropzones = document.getElementsByClassName('blockDefDropZone')
        for (i = 0; i < dropzones.length; i++) {
          dropzones[i].classList.add('alert-primary')
        }
        dropzones = document.getElementsByClassName('parBlockDefDropZone')
        for (i = 0; i < dropzones.length; i++) {
          dropzones[i].classList.add('alert-primary')
        }
      }
      if (def.constructor.name === 'ParBlockDef') {
        dropzones = document.getElementsByClassName('parBlockDefDropZone')
        for (i = 0; i < dropzones.length; i++) {
          dropzones[i].classList.add('alert-primary')
        }
      }

      this.$store.commit('TARGET_PROTOCOL', false)
      this.selectedChild = def.name
      // change the protocol's accepted group parameter
      var group = 'nested'
      if (def.constructor.name === "BlockDef") {
        group = 'blocks'
      }
      this.$store.commit('SET_ACTIVE_LIST', group)
    },
    setTransferInfo(evt) {

      var dropzones
      dropzones = document.getElementsByClassName('fsmDropZone')
      for (i = 0; i < dropzones.length; i++) {
        dropzones[i].classList.remove('alert-primary')
      }
      dropzones = document.getElementsByClassName('blockDefDropZone')
      for (i = 0; i < dropzones.length; i++) {
        dropzones[i].classList.remove('alert-primary')
      }
      dropzones = document.getElementsByClassName('parBlockDefDropZone')
      for (i = 0; i < dropzones.length; i++) {
        dropzones[i].classList.remove('alert-primary')
      }
      this.$store.commit("TRANSFER", { child: this.selectedChild, parent: evt.to.id, index: evt.newIndex })
      for (var i in this.blockDefs) {
        if (evt.to.id === this.blockDefs[i].name) {
            this.$refs['openTrialInstFormTrigger'].click()
        }
      }
      for (var j in this.parBlockDefs) {
        if (evt.to.id === this.parBlockDefs[j].name) {
            this.$refs['openBlockInstFormTrigger'].click()
        }
      }
      for (var l in this.protocols) {
        if (evt.to.id === this.protocols[l].name) {
          this.$store.commit('TARGET_PROTOCOL', true)
            if (this.activeList === "blocks") {
              this.$refs['openBlockInstFormTrigger'].click()
            } else if (this.activeList === "nested") {
              this.$refs['openParBlockInstFormTrigger'].click()

            }
        }
      }
    }
  }
};
</script>

<style scoped>
.sortable {
  cursor: move;
}
.sortable-drag {
  opacity: 100;
}
</style>
