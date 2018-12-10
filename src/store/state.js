import uuid from '../lib/uuid'

const base =
  'https://uploads.codesandbox.io/uploads/user/0f93fb9d-9117-45c5-a046-cc003cf5345c/'

export default {
  fields: [
    {
      id: 'baloon-uuid-1',
      name: 'baloon',
      file: base + 'BYy1-balloon.svg',
      width: 200,
      height: 256,
      constrains: []
    },
    {
      id: 'string-uuid-1',
      name: 'stringggg',
      file: base + 'xWi2-string.svg',
      width: 200,
      height: 506,
      constrains: [
        ['top', 'baloon-uuid-1:bottom'],
        ['hcenter', 'baloon-uuid-1:hcenter']
      ]
    }
  ],
  selectedField: {}
}
