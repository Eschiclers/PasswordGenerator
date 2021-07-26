import Vue from 'vue'
import App from './App.vue'
import vueHeadful from 'vue-headful';
import VueClipboard from 'vue-clipboard2'

VueClipboard.config.autoSetContainer = true;
Vue.use(VueClipboard);
Vue.component('vue-headful', vueHeadful);

import VueI18n from 'vue-i18n'
Vue.use(VueI18n)

Vue.config.productionTip = false

import messages from './locales';

const i18n = new VueI18n({
  locale: 'es',
  messages
})

new Vue({
  i18n,
  render: h => h(App),
}).$mount('#app')
