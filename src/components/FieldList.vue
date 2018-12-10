<template>
  <div class="fieldlist">
    <section class="header">
      <button @click="addField">add new field</button>
    </section>
    <section class="list">
      <ul>
        <li v-for="field in fields">
          <div class="name">{{ field.name }}</div>
          <button @click="updateFieldFile(field)">svg</button>
        </li>
      </ul>
    </section>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { MUTATIONS } from '../store/mutations.js'

export default {
  name: 'FieldList',
  computed: {
    ...mapGetters(['fields', 'selected'])
  },
  data() {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods: {
    selectField(field) {
      this.$store.commit(MUTATIONS.selectField, field)
    },
    addField() {
      const name = prompt('new field name')
      if (name) {
        this.$store.commit(MUTATIONS.addField, name)
      }
    },
    updateFieldFile(field) {
      const file = prompt('svg url')
      if (file) {
        this.$store.commit(MUTATIONS.updateFieldFile, { field, file })
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.fieldlist {
  display: flex;
  flex-direction: column;
  font-size: 13px;
  padding: 1em;
  background: lightgray;
}

.header {
  display: flex;
  height: 2em;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-botom: 2px solid #111111;
}

.list {
  flex: 1;
  position: relative;
}

button {
  height: 100%;
}

ul {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: auto;
}

li {
  padding: 0.5em;
  display: flex;
  flex-direction: row;
}

li .name {
  flex: 1;
  cursor: pointer;
}
</style>
