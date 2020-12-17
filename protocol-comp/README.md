# Protocol Component

## Setup
To test locally, the [vue-cli](https://cli.vuejs.org/) has to be installed. Install **dependencies** separately for the **dev-server** and the **protocol-comp** front. The dev-server is used to provide dummy endpoints for `fsms.json` and `protocols.json`. Run in development mode with:
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

## Under Construction
- the mutation of a definition does not yet prompt the user to `choose` between changing the definition and all its instances or creating a new definition with these mutations.
- integration of `monaco-editor` for schema-validation and auto-suggestions
- auto-label and flatten exports as specified in `subjects.schema.json`
- set default `blocking` state to `true` if item is the last one in a block
- export `subjects.json` when configuration is finished

## Ideas
- use `localStorage` to auto-save the state of a configuration in case a tab closes, the browser crashes or a [Bootstrap](https://getbootstrap.com/docs/5.0/components/modal/) modal freezes.
