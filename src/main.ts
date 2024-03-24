import './assets/main.css'
import {createApp} from 'vue'
import {createPinia} from 'pinia'
import App from './App.vue'
 
const pinia = createPinia()
const app = createApp(App)

app.use(pinia)

app.mount('#app')

const whTooltips = {colorLinks: true, iconizeLinks: true, renameLinks: true};
const recaptchaScript = document.createElement('script')
recaptchaScript.setAttribute('src', 'https://wow.zamimg.com/js/tooltips.js')
document.head.appendChild(recaptchaScript);
