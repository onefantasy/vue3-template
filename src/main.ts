import { createApp } from 'vue'
import App from '@/App.vue'
import router from '@/router'
import i18n from '@/language'
import { createPinia } from 'pinia'
import '@/style/index.css'
import { naive } from '@/utils/native'
// svg loader
import 'vite-plugin-svg-icons/register'
import svgIcon from './components/svgIcon.vue'

createApp(App)
  .use(createPinia())
  .use(router)
  .use(i18n)
  .use(naive)
  .component('SvgIcon', svgIcon)
  .mount('#app')
