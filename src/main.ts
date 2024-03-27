import 'primevue/resources/themes/aura-light-green/theme.css';
import './assets/main.css';
import {createApp} from 'vue';
import {createPinia} from 'pinia';
import App from './App.vue';
import PrimeVue from 'primevue/config';
import OverlayPanel from 'primevue/overlaypanel';
import Button from 'primevue/button';
import RadioButton from 'primevue/radiobutton';

const pinia = createPinia();
const app = createApp(App);

app.use(pinia);
app.use(PrimeVue);

app.component('Button', Button);
app.component('RadioButton', RadioButton);
app.component('OverlayPanel', OverlayPanel);

app.mount('#app');

const recaptchaScript = document.createElement('script');
recaptchaScript.setAttribute('src', 'https://wow.zamimg.com/js/tooltips.js');
document.head.appendChild(recaptchaScript);
