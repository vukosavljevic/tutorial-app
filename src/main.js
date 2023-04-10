import { createApp } from 'vue'
import App from './App.vue'
import router from './router.js';

import BaseWrapper from '@/components/Utilities/BaseWrapper.vue';

const app = createApp(App)

app.component('base-wrapper', BaseWrapper)

app.use(router);

app.mount('#app')
