import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import App from './App.vue'
import router from './router'
import "@/assets/css/styles.css";
import "@/assets/js/scripts.js";

import { createVuetify } from 'vuetify';
import 'vuetify/styles'; // Vuetify 스타일 가져오기
import * as components from 'vuetify/components'; // Vuetify 컴포넌트 가져오기
import * as directives from 'vuetify/directives';

const vuetify = createVuetify({
  components,
  directives,
});

// Pinia 인스턴스 생성
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate) // Pinia persisted state plugin 설정

// Vue 앱 생성
const app = createApp(App)

// Vuetify와 Pinia, Router를 앱에 사용
app.use(vuetify)
app.use(pinia)
app.use(router)

app.mount('#app')
