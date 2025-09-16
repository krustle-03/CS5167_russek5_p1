import { mount } from 'svelte'
import './app.css'

import Welcome from './Welcome.svelte'
import buttons from './Buttons.svelte'

// Mount the welcome component
const welcomeApp = mount(Welcome, {
  target: document.getElementById('welcome'),
})

const buttonsApp = mount(buttons, {
  target: document.getElementById('buttons'),
})


