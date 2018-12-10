import { layout } from './kiwi-layout.js'

const fields = state => state.fields
const selected = state => id =>
  state.selectedFields.findIndex(field => field.id === id) > -1

export default {
  fields,
  selected,
  layout
}
