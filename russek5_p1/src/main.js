import { mount } from 'svelte'
import './app.css'

import Welcome from './lib/Welcome.svelte'
import Receipt from './lib/Receipt.svelte'

// Mount the welcome component
const welcomeApp = mount(Welcome, {
  target: document.getElementById('welcome'),
})

const receiptApp = mount(Receipt, {
  target: document.getElementById('receipt'),
})


