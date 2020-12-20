class BlockDef {
    constructor(name) {
        this.name = name
        this.items = []
        this.hasInstances = false
    }
    addItems(items) {
      for (var i = 0; i < items.length; i++) {
        this.items.push(items[i])
      }
    }
    hasInstances(status) {
      this.hasInstances = true
    }
}
class ParBlockDef {
  constructor(name) {
    this.name = name
    this.items = []
    this.hasInstances = false
  }
  addItems(items) {
    for (var i = 0; i < items.length; i++) {
      this.items.push(items[i])
    }
  }
  hasInstances(status) {
    this.hasInstances = true
  }
}

class Subject {
  constructor() {
    this.id = id
    this.code = code
    this.protocol = protocol // contains trials
  }
}

class Protocol {
  constructor(id, name, subjects) {
    this.id = Number(id)
    this.name = name
    this.subjects = subjects
    this.items = []
  }
  addItems(items) {
    for (var i = 0; i < items.length; i++) {
      this.items.push(items[i])
    }
  }
}

class Block {
  constructor(name, ref) {
    this.name = name
    this.ref = ref
    this.items = ''
  }
  reference(items) {
    this.items = items
  }
}

class ParBlock {
  constructor(name, ref) {
    this.name = name
    this.ref = ref
    this.items = ''
  }
  reference(items) {
    this.items = items
  }
}


class Trial {
  static id = 1
    constructor(name, description, blocking, fsm_tpl) {
        this.id = Trial.id
        Trial.id++
        this.name = name
        this.description = description
        this.blocking = blocking
        this.fsm_tpl = fsm_tpl
        this.labels = []
    }
    setLabels(labels) {
      for (var label in labels) {
        this.labels.push(labels[label])
      }
    }
}


class Fsm {
  constructor(name, body) {
    this.name = name
    this.body = body
  }
}
class FsmVars { // contains FSM-Variables
    static id = 0
    constructor(fsm_tpl, payload) {
        this.id = FsmVars.id
        FsmVars.id++
        this.fsm_tpl = fsm_tpl
        this.payload = payload
        this.vars = [] // contains Var instances
    }
}
class Var {
    constructor(fsm, transition, event_idx, variable_idx, path) {
        this.fsm_tpl = fsm
        this.transition = transition
        this.event_idx = parseInt(event_idx)
        this.variable_idx = parseInt(variable_idx)
        this.path = path
        this.value = null // populated on user-input
    }
}
class Variable { // end product assigned to trial
  constructor(transition, event_idx, variable_idx, value) {
    this.transition = transition
    this.event_idx = parseInt(event_idx)
    this.variable_idx = parseInt(variable_idx)
    this.value = value
  }
}


export { BlockDef, Trial, Fsm, FsmVars, Var, Variable, ParBlockDef, Block, Protocol, ParBlock, Subject }
