import { mount } from 'svelte'
import './app.css'
 
import App from './app.svelte'
import Header from './lib/Header.svelte'

// Mount the header component
//const header = mount(Header, {
//  target: document.body, // Mount directly to body
//})

// Mount the app.svelte component
const app = mount(App, {
  target: document.getElementById('app'),
})


