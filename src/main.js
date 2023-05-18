import { createApp } from 'vue'
import App from './App.vue'
import router from './router/router.js';
import store from './store/store.js';

import BaseWrapper from '@/components/Utilities/BaseWrapper.vue';
import CoachWrapper from '@/components/Utilities/CoachWrapper.vue';

const app = createApp(App)

app.component('base-wrapper', BaseWrapper);
app.component('coach-wrapper', CoachWrapper);


app.use(router);
app.use(store);


app.mount('#app')
