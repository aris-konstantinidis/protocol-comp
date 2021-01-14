<template>
  <div id="app" class="bg-light">
    <ToolBar/>
    <div class="row w-100 m-0" id="editor">
      <Editor />
    </div>
    <!-- generic modals -->
    <Preview />
    <ConfirmDelete />
  </div>
</template>

<script>
import ToolBar from './components/ToolBar'
import Editor from './components/Editor'
import Preview from './components/Preview'
import ConfirmDelete from './components/ConfirmDelete'
export default {
  name: 'App',
  components: {
    ToolBar,
    Editor,
    Preview,
    ConfirmDelete
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
