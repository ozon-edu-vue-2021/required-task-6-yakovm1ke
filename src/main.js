import Vue from 'vue'
import App from './App.vue'
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faSort,
  faFilter,
  faTimes,
  faPen,
  faCheck,
  faInfinity,
  faEllipsisH,
  faTrash,
  faHome,
  faSortAmountDown,
  faSortAmountDownAlt,
  faAngleLeft,
  faAngleRight,
  faAngleDoubleLeft,
  faAngleDoubleRight,
  faVrCardboard
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import 'normalize.css'

library.add(faSort, faFilter, faTimes, faPen, faCheck, faInfinity, faEllipsisH, faTrash, faHome,
  faSortAmountDown, faSortAmountDownAlt, faAngleLeft, faAngleRight, faAngleDoubleLeft, faAngleDoubleRight, faVrCardboard)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
