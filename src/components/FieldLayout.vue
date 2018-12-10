<template>
  <div class="fieldlayout">
    <img
      v-for="img in layout"
      v-bind:style="{
        top: img.top + 'px',
        left: img.left + 'px'
      }"
      :src="img.src"
      :width="img.width"
      :height="img.height"
      :data-fieldid="img.id"
    />
  </div>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  name: 'FieldLayout',
  computed: {
    ...mapGetters(['layout'])
  }
}
</script>
<style>
.fieldlayout {
  position: relative;
}

.fieldlayout img {
  position: absolute;
  outline: 1px solid red;
}
</style>
