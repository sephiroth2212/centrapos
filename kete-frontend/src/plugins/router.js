import Vue from 'vue';
import VueRouter from 'vue-router';

import store from './store';
import componentExamplePages from '../components/componentExamplePages';

Vue.use(VueRouter);

const routes = [
  {
    path: '/config',
    meta: { public: true },
    component: () => import('@/config/pages/ConfigScreen'),
  },
  {
    path: '/',
    redirect: { path: '/sales', query: null }
  },
  {
    name: 'Component Guide',
    path: '/components',
    component: () => import('@/components/pages/ComponentGuide'),
    meta: { public: true },
  },
  ...componentExamplePages.map(({ title, name, component }) => ({
    name: title,
    path: `/components/${name}`,
    component,
    meta: { public: true },
  })),
  {
    name: 'Not Found',
    path: '/404',
    alias: '*',
    component: () => import(/* webpackChunkName: "404" */ '@/NotFound'),
    meta: { public: true }
  },
  {
    name: 'Sales',
    path: '/sales',
    component: () => import('@/sales/pages/Sales'),
  },
  {
    name: 'Inventory',
    path: '/inventory',
    component: () => import('@/inventory/pages/Inventory'),
  },
  {
    name: 'Inventory Item',
    path: '/inventory-item',
    component: () => import('@/inventory/pages/InventoryItem'),
  }
];

const router = new VueRouter({
  mode: 'history',
  routes
});

export default router;
