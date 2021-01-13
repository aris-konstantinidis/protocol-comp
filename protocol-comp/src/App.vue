<template>
  <div id="app" class="bg-light">
    <div class="row w-100 m-0 p-0 bg-dark shadow-sm" id="tool-bar"><ToolBar/></div>
    <div class="row w-100 m-0" id="editor">
      <Editor />
    </div>
    <Preview />
  </div>
</template>

<script>
import ToolBar from './components/ToolBar'
import Editor from './components/Editor'
import Preview from './components/Preview'
export default {
  name: 'App',
  components: {
    ToolBar,
    Editor,
    Preview
  },
  created() {
    this.$store.dispatch('GET_FSMS')
    this.$store.dispatch("GET_PROTOCOLS")
  }
}
</script>

<style>
  #tool-bar {
    height: 70px;
  }
  #editor {
    height: calc(100% - 70px);
  }
  html, body {
    background-color: var(--light);
  }
</style>
