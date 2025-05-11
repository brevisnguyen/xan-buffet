import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Order from '../views/Order.vue'
import OrderStatus from '../views/OrderStatus.vue'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/order', name: 'Order', component: Order },
  { path: '/status', name: 'Status', component: OrderStatus }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
