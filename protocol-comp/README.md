# Protocol Component

## Setup
To test locally, the [vue-cli](https://cli.vuejs.org/) has to be installed. Install **dependencies** separately for the **dev-server** and the **protocol-comp** front. The dev-server is used to provide endpoints for `fsms.json` and `protocols.json`. Run dev-mod with:
- in **dev-server** -->`node server.js`
- in **protocol-component** --> `npm run serve`.

## Working Features
1. [x] `auto-load` protocols.json and fsms.json
2. [x] `create` new block-definitions and parent-block-definition
3. [x] `remove` block-definitions and parent-block-definitions
4. [x] `duplicate` block-definitions and parent-block-definitions
5. [x] `expand` or `minimize` elements
6. [x] `ensure` uniqueness of used-defined names
7. [x] `instantiate` with drag and drop
  - fsm-template --> block-definition, instantiates a `trial`
  - block-definition --> parent-block-definition, instantiates a `block`
  - block-definition --> protocol-template, instantiates a `block`
  - parent-block-definition --> protocol-template, instantiates a `parent-block`
8. [x] `maintain` position in which an item was dropped-in
9. [x] `sort` all items in a definition (reordering)
14. [x] `remove` items of a definition
10. [x] `auto-update` all instances of a definition if the definition is mutated (removal/addition of items or re-ordering)
11. [x] `notify` user, that the mutation of a definition affects all its instances as well
12. [x] `prompt` use to set all needed values of trial instantiation (`fms-variables, name, blocking, description`)
13. [x] `set variable info` on trial instantiation (`transition`, `event_idx`, `variable_idx`, `value`)
15. [x] `prevent` self assignments
16. [x] `mark` valid drop zones while dragging elements
17. [x] `inspect` underlying JSON structure of each definition

## Under Construction
-  parent-block-definition -[`drag and drop to`]-> parent-block-definition should instantiate a parent-block
- the mutation of a definition does not yet prompt the user to `choose` between changing the definition and all its instances or creating a new definition with these mutations.
- integration of `monaco-editor` for schema-validation and auto-suggestions
- auto-label and flatten exports as specified in `subjects.schema.json`
- set default `blocking` state to `true` if item is the last one in the block
- export `subjects.json` when configuration is finished

## Ideas
- using the browser's `localStorage` and auto-save the state of a configuration to increase safety
- implement a small `JSON-Variable-Schema to Html-Input-Form` converted. This way, validation could be checked through the input-form. For example:
    - a `enum` variable with the values `CrossBlack` and `CrossRed` would be converted into a html `select`(type) input-tag with exactly these two options.
    - a `time` variable with properties `sec` and `nsec` would be transformed into two html `number`(type) input-tags.
