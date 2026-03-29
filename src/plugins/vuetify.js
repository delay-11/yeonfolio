// 📄 src/plugins/vuetify.js

import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const myTheme = {
  dark: false,
  variables: {
    'font-family': 'SUITE-Regular, sans-serif',
  },
}

export default createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'myTheme',
    themes: {
      myTheme,
    },
  },
})
