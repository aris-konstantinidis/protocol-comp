# Protocol Component

## Testing

#### Online
Click [here](http://104.236.41.74:8080/) to test online.

#### Local
To run locally, the [vue-cli](https://cli.vuejs.org/guide/installation.html) has to be installed. The development server is used to dynamically serve the inputs `fsms.json` and `protocols.json`. To test different inputs, change these files in the **dev-server** directory. Run the component with the following steps:
1. in the **dev-server** directory:
  - `npm install`
  - `node server.js`


2. in the **protocol-comp**:
  - `npm install`
  - `npm run serve`
  - open http://localhost:8080

#### Build for production
`npm run build` will generate the **dist** directory under the same root directory.

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
