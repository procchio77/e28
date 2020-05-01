import Vue from 'vue'
import App from '@/App.vue'
import VueRouter from 'vue-router';
import AdminPage from '@/components/pages/AdminPage.vue';
import HomePage from '@/components/pages/HomePage.vue';
import BuyStockPage from '@/components/pages/BuyStockPage.vue';
import SellStockPage from '@/components/pages/SellStockPage.vue';
import PortfolioPage from '@/components/pages/PortfolioPage.vue';
import OrderHistoryPage from '@/components/pages/OrderHistoryPage.vue';

Vue.use(VueRouter);
Vue.config.productionTip = false

const routes = [
  { path: '/', component: HomePage, name: 'home' },
  { path: '/admin', component: AdminPage, name: 'admin' },
  { path: '/portfolio', component: PortfolioPage, name: 'portfolio' },
  { path: '/stock/buy', component: BuyStockPage, name: 'buy stock', props: true },
  { path: '/stock/sell', component: SellStockPage, name: 'sell stock' },
  { path: '/orderhistory', component: OrderHistoryPage, name: 'order history' },
];

const router = new VueRouter({
  routes: routes,
  mode: 'history'
})

new Vue({
  router: router,
  render: h => h(App),
}).$mount('#app')