# Protocol Component

## Testing
Click [here](http://207.154.210.124:8080/) to test online.

To run locally, the [vue-cli](https://cli.vuejs.org/) has to be installed. Install **dependencies** separately for the **dev-server** and the **protocol-comp** front. The dev-server is used to provide dummy endpoints for `fsms.json` and `protocols.json`. Run in development mode with:
- `node server.js` in *./dev-server*
- `npm run serve` in *./protocol-comp*

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
- `save` or `clear` current configuration state to/from localStorage (helps while testing)
- `validation` and `visual feedback` of the generated output (subjects.json against subjects.schema.json)


## Under Construction
- the mutation of a definition does not yet prompt the user to `choose` between changing the definition and all its instances or creating a new definition with these mutations
  - for now, the user is just notified that the mutation has affected all instances
- integration of `monaco-editor` for schema-validation and auto-suggestions
  - a provisional textarea is used
- set default `blocking` state to `true` if item is the last one in a block
  - in which state should this be checked? On export? Trials inside a block-instance can be changed, which could result in a new last element.

## Bugs
- not all elements are draggable after state retrieval from `localStorage`
- can not create second variable as the activeVariables initialization is only done on modal mount which occurs 1 time.

## Todo
- schema validation and visual error feedback via external library (on payload change). Ask Simon to give the schema for the whole object and not only for the target variable. or auto-create a schema based on the object (..no enums)
