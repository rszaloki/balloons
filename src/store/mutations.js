import uuid from '../lib/uuid'

const MUTATIONS = {
  addField: 'addField',
  updateFieldFile: 'updateFieldFile',
  selectField: 'selectField'
}

export default {
  [MUTATIONS.addField](state, name) {
    state.fields = state.fields.concat({
      id: uuid(),
      name,
      constrains: [],
      file: ''
    })
  },
  [MUTATIONS.updateFieldFile](state, { field, file }) {
    const fieldIndex = state.fields.findIndex(sField => sField.id === field.id)
    if (fieldIndex > -1) {
      state.fields[fieldIndex].file = file
    }
  },
  [MUTATIONS.selectField](state, field) {
    const selectedField = state.selectedField.find(
      sField => sField.id === field.id
    )
    state.selectedField = selectedField
  }
}

export { MUTATIONS }
