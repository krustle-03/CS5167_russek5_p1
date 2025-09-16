import { mount } from 'svelte'
import './app.css'

//import Welcome from './lib/Welcome.svelte'
//import Receipt from './lib/Receipt.svelte'

import App from './app.svelte'

// Mount the app.svelte component
const app = mount(App, {
  target: document.getElementById('app'),
})



// Mount the welcome component
//const welcomeApp = mount(Welcome, {
//  target: document.getElementById('welcome'),
//})
//
//const receiptApp = mount(Receipt, {
//  target: document.getElementById('receipt'),
//})


