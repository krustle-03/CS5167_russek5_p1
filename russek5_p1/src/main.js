import { mount } from 'svelte'
import './app.css'

import Welcome from './Welcome.svelte'
import Receipt from './Receipt.svelte'

// Mount the welcome component
const welcomeApp = mount(Welcome, {
  target: document.getElementById('welcome'),
})

const receiptApp = mount(Receipt, {
  target: document.getElementById('receipt'),
})


