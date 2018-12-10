<template>
  <div id="app">
    <field-layout></field-layout>
    <field-list></field-list>
    <div></div>
  </div>
</template>

<script>
import FieldList from './components/FieldList.vue'
import FieldLayout from './components/FieldLayout.vue'
export default {
  name: 'App',
  components: {
    FieldList,
    FieldLayout
  }
}
</script>

<style>
#app {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica,
    Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: grid;
  grid-template-columns: [start] auto [divider] 200px [end];
  grid-template-rows: [start] 25% [half] 75% [end];
}

#app * {
  box-sizing: border-box;
}

#app ul {
  margin: 0;
  padding: 0;
}

field-list {
  grid-column: divider / end;
  grid-row: start / half;
}

field-layout {
  grid-column: start / divider;
  grid-row: start / end;
}
</style>
