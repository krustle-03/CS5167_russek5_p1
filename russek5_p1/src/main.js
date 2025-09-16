import { mount } from 'svelte'
import './app.css'
 
import App from './app.svelte'

// Mount the app.svelte component
const app = mount(App, {
  target: document.getElementById('app'),
})


