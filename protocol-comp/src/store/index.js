import Vue from 'vue'
import Vuex, {
  Store
} from 'vuex'
import axios from 'axios'
var validate = require('jsonschema').validate
import subjectsSchema from '../jsonSchemas/subjects.schema.json'
import {
  BlockDef,
  Fsm,
  Var,
  FsmVars,
  ParBlockDef,
  Block,
  Protocol,
  ParBlock,
  Subject
} from '../definitions'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    fsms: [],
    fsmVars: [],
    protocols: [],
    names: [],
    validName: true,
    activeDef: '',
    transfer: '',
    transferChildException: null,
    blockDefs: [],
    parBlockDefs: [],
    dataToPreview: null,
    activeList: 'parBlocks',
    targetProtocol: false,
    mutatedElement: null,
    subjectsJSON: '',
    subjectsJsonValid: null,
  },
  mutations: {
    SAVE_STATE(state) {
      localStorage.setItem('names', JSON.stringify(state.names))
      localStorage.setItem('blockDefs', JSON.stringify(state.blockDefs))
      localStorage.setItem('parBlockDefs', JSON.stringify(state.parBlockDefs))
    },
    RETRIEVE_STATE(state) {
      if (localStorage.getItem('names')) state.names = JSON.parse(localStorage.getItem('names'))
      if (localStorage.getItem('names')) state.blockDefs = JSON.parse(localStorage.getItem('blockDefs'))
      if (localStorage.getItem('names')) state.parBlockDefs = JSON.parse(localStorage.getItem('parBlockDefs'))
    },
    EMPTY(state) {
      state.names = []
      state.transfer = ''
      state.transferChildException = null
      state.blockDefs = []
      state.parBlockDefs = []
    },
    EXPORT_CONFIGURATION(state) {
      for (var protocol in state.protocols) {
        var flatProtocol = generateExport(state.protocols[protocol])
        for (var subject in state.protocols[protocol].subjects) {
          // create key protocol
          state.protocols[protocol].subjects[subject]["protocol"] = {}
          // create nested key 'id'
          state.protocols[protocol].subjects[subject].protocol["id"] = Number(JSON.stringify(JSON.parse(state.protocols[protocol].id)))
          // create nested key 'name'
          state.protocols[protocol].subjects[subject].protocol["name"] = JSON.stringify(state.protocols[protocol].name)
          // create nested key 'trials' and assign it the flattened protocol configuration
          state.protocols[protocol].subjects[subject].protocol["trials"] = flatProtocol
        }
      }
      // generate subjects.json
      var subjectsJSON = { "subjects": [] }
      for (protocol in state.protocols) {
        for (subject in state.protocols[protocol].subjects) {
          subjectsJSON.subjects.push(JSON.parse(JSON.stringify(state.protocols[protocol].subjects[subject])))
        }
      }
      state.subjectsJSON = subjectsJSON
      state.dataToPreview = subjectsJSON
      state.subjectsJsonValid = validate(subjectsJSON, subjectsSchema)
      function generateExport(object) {
        object = JSON.parse(JSON.stringify(object))
        var product = []
        function extract(object, nameArray) {
          nameArray = nameArray || [];
          if (object.items) {
            nameArray.push(object.name)
            for (var i = 0; i < object.items.length; i++) {
              extract(object.items[i], nameArray)
            }
            nameArray.pop();
            return
          }
          nameArray.push(JSON.parse(JSON.stringify(object.name)))
          object.labels = JSON.parse(JSON.stringify(nameArray))
          product.push(object)
          nameArray.pop();
        }
        extract(object)
        return product
      }
    },
    SET_FSMS(state, fsm) {
      state.fsms.push(fsm)
      state.names.push(fsm.name)
    },
    SET_PROTOCOLS(state, protocol) {
      state.protocols.push(protocol)
      state.names.push(protocol.name)
    },
    SET_FSM_VARIABLES(state, payload) {
      state.fsmVars.push(payload)
    },
    CHECK_NAME(state, name) {
      state.names.includes(name) ? state.validName = false : state.validName = true
    },
    DELETE_INSTANCES(state, parent) {
      state.parBlockDefs.forEach((parBlockDef) => {
        remove(parBlockDef.items, parent)
      })
      state.protocols.forEach((protocol) => {
        remove(protocol.items, parent)
      })

      function remove(list, parent) {
        list.forEach((item, i) => {
          parent === item.ref ? list.splice(i, 1) : item.items ? remove(item.items, parent) : false
        })
      }
    },
    MUTATED_ELEMENT(state, element) {
      state.mutatedElement = element
    },
    TARGET_PROTOCOL(state, status) {
      state.targetProtocol = status
    },
    SET_ACTIVE_LIST(state, list) {
      state.activeList = list
    },
    SET_ACTIVE_DEF(state, def) {
      state.activeDef = def
    },
    TRANSFER(state, info) {
      state.transfer = info
    },
    TRANSFER_CHILD_EXCEPTION(state, def) {
      state.transferChildException = def
    },
    SET_DATA_TO_PREVIEW(state, data) {
      state.dataToPreview = data
    },
    NEW_DEF(state, {
      name,
      ofClass
    }) {
      ofClass === "BlockDef" ? state.blockDefs.push(new BlockDef(name)) : state.parBlockDefs.push(new ParBlockDef(name))
      state.names.push(name)
    },
    DUPL_DEF(state, {
      name,
      items,
      ofClass
    }) {
      var copy;
      if (ofClass === 'BlockDef') {
        copy = new BlockDef(name)
        copy.addItems(items)
        copy.hasInstances = false
        state.blockDefs.push(copy)
      } else {
        copy = new ParBlockDef(name)
        copy.addItems(items)
        copy.hasInstances = false
        state.parBlockDefs.push(copy)
      }
      state.names.push(name)
    },
    DELETE_DEF(state, {
      name,
      ofClass
    }) {
      if (ofClass === "BlockDef") {
        state.blockDefs.splice(state.blockDefs.findIndex(def => def.name === name), 1)
      } else if (ofClass === "ParBlockDef") {
        state.parBlockDefs.splice(state.parBlockDefs.findIndex(def => def.name === name), 1)
      }
      state.names.splice(state.names.findIndex(n => n === name), 1)
    },
    DELETE_ITEM(state, {
      index,
      parent,
      ofClass
    }) {
      if (ofClass === 'BlockDef') {
        const blockDef = state.blockDefs.findIndex(block => block.name === parent)
        state.blockDefs[blockDef].items.splice(index, 1)
        state.names.splice(state.names.findIndex(n => n === name), 1)
      } else if (ofClass === 'ParBlockDef') {
        const parBLockDef = state.parBlockDefs.findIndex(block => block.name === parent)
        state.parBlockDefs[parBLockDef].items.splice(index, 1)
        state.names.splice(state.names.findIndex(n => n === name), 1)
      } else if (ofClass === 'Protocol') {
        const protocol = state.protocols.findIndex(block => block.name === parent)
        state.protocols[protocol].items.splice(index, 1)
        state.names.splice(state.names.findIndex(n => n === name), 1)
      }

    },
    ADD_ITEM(state, {
      action,
      origin,
      target,
      item,
      index
    }) {
      switch (action) {
        case 'TTB': // trial to blockdef
          state.blockDefs[state.blockDefs.findIndex(bl => bl.name === target)].items.splice(index, 0, item)
          break
        case 'BTP': // blockdef to parent-block-def
          const blockDefinition = state.blockDefs.find(block => block.name === origin)
          blockDefinition.hasInstances = true
          const newBlockInst = new Block(item, origin)
          newBlockInst.reference(blockDefinition.items)
          state.parBlockDefs[state.parBlockDefs.findIndex(par => par.name === target)].items.splice(index, 0, newBlockInst)
          break;
        case 'BTPR': // blockdef to protocol
          const blockDf = state.blockDefs.find(block => block.name === origin)
          blockDf.hasInstances = true
          const nBlockInst = new Block(item, origin)
          nBlockInst.reference(blockDf.items)
          state.protocols[state.protocols.findIndex(par => par.name === target)].items.splice(index, 0, nBlockInst)
          break
        case 'PTPR': // parent-block-def to protocol
          const parBlockDefinition = state.parBlockDefs.find(par => par.name === origin)
          parBlockDefinition.hasInstances = true
          const newParBlockInst = new ParBlock(item, origin)
          newParBlockInst.reference(parBlockDefinition.items)
          state.protocols[state.protocols.findIndex(proto => proto.name === target)].items.splice(index, 0, newParBlockInst)
          break
        case 'PRTPR': // parent-block-def to protocol
          const prnt = state.parBlockDefs.find(par => par.name === origin)
          prnt.hasInstances = true
          const newParInstance = new ParBlock(item, origin)
          newParInstance.reference(prnt.items)
          state.parBlockDefs[state.parBlockDefs.findIndex(proto => proto.name === target)].items.splice(index, 0, newParInstance)
          break
      }
    }
  },
  actions: {
    GET_FSMS({
      commit
    }) {
      axios.get('fsms').then((res) => {
        const fsms = res.data.fsms
        for (var fsm in fsms) {
          for (var transition in fsms[fsm].transitions) {
            for (var event in fsms[fsm].transitions[transition].events) {
              if (fsms[fsm].transitions[transition].events[event].new) {
                if (fsms[fsm].transitions[transition].events[event].new.variables) {
                  var newFsmVars = new FsmVars(fsm, fsms[fsm].transitions[transition].events[event].new.payload)
                  for (var variable in fsms[fsm].transitions[transition].events[event].new.variables) {
                    const {
                      path
                    } = fsms[fsm].transitions[transition].events[event].new.variables[variable]
                    var newVar = new Var(fsm, transition, event, variable, path)
                    newFsmVars.vars.push(newVar)
                  }
                  commit("SET_FSM_VARIABLES", newFsmVars)
                }
              }
            }
          }
          commit("SET_FSMS", new Fsm(fsm, res.data.fsms[fsm]))
        }
      })
    },
    GET_PROTOCOLS({
      state,
      commit
    }) {
      axios.get('protocols').then((res) => {
        const protocols = res.data.protocols
        for (var protocol in protocols) {
          var newProtocol = new Protocol(protocols[protocol].id, protocols[protocol].name, protocols[protocol].subjects)
          commit("SET_PROTOCOLS", newProtocol)
        }
      })
    }
  }
})
