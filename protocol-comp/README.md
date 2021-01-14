# Protocol Component

Click [here](http://104.236.41.74:8080/) to test online.

## Features
- `auto-load` protocols.json and fsms.json
- `create` new block-definitions and parent-block-definitions
- `remove` block-definitions and parent-block-definitions
- `duplicate` block-definitions and parent-block-definitions
- `expand` or `minimize` elements
- `ensure` uniqueness of user-defined names
- `instantiate` with drag and drop
  - fsm-template --> block-definition, instantiates a `trial`
  - block-definition --> parent-block-definition, instantiates a `block`
  - block-definition --> protocol-template, instantiates a `block`
  - parent-block-definition --> protocol-template, instantiates a `parent-block`
  - parent-block-definition --> parent-block-definition, instantiates a `parent-block`
- `maintain` position in which an item was dropped in
- `sort` all items in a definition (re-order-able)
- `remove` items of a definition
- `auto-update` all instances of a definition if the definition is mutated (removal/addition of items or re-ordering)
- `notify` user, that the mutation of a definition affects all its instances as well
- `prompt` user to set all values for trial instantiation (`fsm-variables, name, blocking, description`)
- `set variable info` on trial instantiation (`transition`, `event_idx`, `variable_idx`, `value`)
- `prevent` self assignments
- `mark` valid drop zones while dragging elements
- `inspect` underlying JSON structure of definitions/templates
- `auto-label` and `flatten` exports as specified in `subjects.schema.json`
- `export` `subjects.json` when configuration is finished
- `validate, auto-suggest and lint` user-changed payload objects against given schemas (**request for payload-schema instead of variable schemas**)
- `validation` of subjects.json against its schema.
- `blocking` is set to `true` for each block's last trial on export



## Under Construction
- the mutation of a definition does not yet prompt the user to `choose` between changing the definition and all its instances or creating a new definition with these mutations
  - for now, the user is notified that the mutation has affected all instances
