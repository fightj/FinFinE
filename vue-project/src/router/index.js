import { createRouter, createWebHistory } from 'vue-router'
import HomeView from "@/views/HomeView.vue"; // 홈


import ArticleView from '@/views/ArticleView.vue' // 게시판
import DetailView from '@/views/DetailView.vue'
import CreateView from '@/views/CreateView.vue'
import UpdateView from '@/views/UpdateView.vue';

import SignUpView from '@/views/SignUpView.vue' // 유저
import LogInView from '@/views/LogInView.vue'
import ProfileView from "@/views/ProfileView.vue";
import FindPasswordView from "@/views/FindPasswordView.vue";
import ModifyView from "@/views/ModifyView.vue";
import changePasswordView from "@/views/ChangePasswordView.vue";

import { useCounterStore } from '@/stores/counter'

import MapView from "@/views/MapView.vue";  // 지도

import ProductsPreView from "@/views/ProductsPreView.vue";  // 예금/적금
import SavingProductsView from "@/views/SavingProductsView.vue";
import DepositProductsView from "@/views/DepositProductsView.vue";

import ExchangePage from '@/views/ExchangePage.vue' // 환율



const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    //홈
    {
      path: "/",
      name: "home",
      component: HomeView,
    },

    // 커뮤니티 게시판 관련
    {
      path: '/articles',
      name: 'ArticleView',
      component: ArticleView
    },
    {
      path: '/articles/:id',
      name: 'DetailView',
      component: DetailView
    },
    {
      path: '/create',
      name: 'CreateView',
      component: CreateView
    },

    {
      path: '/update/:id',
      name: 'UpdateView',
      component: UpdateView
    },

    // 로그인 관련
    { // 
      path: '/signup',
      name: 'signup',
      component: SignUpView
    },
    {
      path: '/login',
      name: 'login',
      component: LogInView
    },
    {
      path: "/profile/:search_username",
      name: "profile",
      component: ProfileView,
    },
    {
      path: "/findpassword",
      name: "findpassword",
      component: FindPasswordView,
    },
    {
      path: "/modify",
      name: "modify",
      component: ModifyView,
    },
    {
      path: "/changepassword",
      name: "changepassword",
      component: changePasswordView,
    },

    // 지도
    {
      path: "/map",
      name: "map",
      component: MapView,
    },

    //예금/적금 관련
    {
      path: "/products",
      name: "ProductsPreView",
      component: ProductsPreView,
    },
    {
      path: "/preView",
      name: "ProductsPreView",
      component: ProductsPreView,
      meta: { requiresAuth: true },
    },
    {
      path: "/savings",
      name: "SavingProductsView",
      component: SavingProductsView,
      meta: { requiresAuth: true },
    },
    {
      path: "/deposits",
      name: "DepositProductsView",
      component: DepositProductsView,
      meta: { requiresAuth: true },
    },

    // 환율
    {
      path: "/exchange",
      name: "ExchangePage",
      component: ExchangePage,
    },

  ]
})


export default router
