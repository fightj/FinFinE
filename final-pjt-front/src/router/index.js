import { createRouter, createWebHistory } from 'vue-router'
import HomeView from "@/views/HomeView.vue"; // 홈

import ArticleView from '@/views/ArticleView.vue' // 게시판
import DetailView from '@/views/DetailView.vue'
import CreateView from '@/views/CreateView.vue'
import UpdateView from '@/views/UpdateView.vue';

import SignupView from '@/views/SignUpView.vue' // 유저
import LoginView from '@/views/LogInView.vue'
import UserProfileView from "@/views/UserProfileView.vue";
// 카피바라 코드 추후 추가
// import FindPasswordView from "@/views/FindPasswordView.vue";
// import ModifyView from "@/views/ModifyView.vue";
// import changePasswordView from "@/views/ChangePasswordView.vue";

import MapView from "@/views/MapView.vue";  // 지도

import ProductsPreView from "@/views/ProductsPreView.vue";  // 예금/적금
import SavingProductsView from "@/views/SavingProductsView.vue";
import DepositProductsView from "@/views/DepositProductsView.vue";

import ExchangePage from '@/views/ExchangePage.vue' // 환율

import RecommendView from "@/views/RecommendView.vue";

import Swal from "sweetalert";

import { useCommunityStore } from "@/stores/community";


const routes = [
  // history: createWebHistory(import.meta.env.BASE_URL),
  
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
      component: ArticleView,
      meta: { requiresAuth: true },
    },
    {
      path: '/articles/:id',
      name: 'DetailView',
      component: DetailView,
      meta: { requiresAuth: true },
    },
    {
      path: '/create',
      name: 'CreateView',
      component: CreateView,
      meta: { requiresAuth: true },
    },

    {
      path: '/update/:id',
      name: 'UpdateView',
      component: UpdateView,
      meta: { requiresAuth: true },
    },

    // 로그인 관련
    { // 
      path: '/signup',
      name: 'SignupView',
      component: SignupView,
    },
    {
      path: '/login',
      name: 'LoginView',
      component: LoginView,
    },
    {
      path: "/profile",
      name: "UserProfileView",
      component: UserProfileView,
      meta: { requiresAuth: true },
    },
    // 카피바라 코드(나중에 다시 추가)
    // {
    //   path: "/findpassword",
    //   name: "findpassword",
    //   component: FindPasswordView,
    // },
    // {
    //   path: "/modify",
    //   name: "modify",
    //   component: ModifyView,
    // },
    // {
    //   path: "/changepassword",
    //   name: "changepassword",
    //   component: changePasswordView,
    // },

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

    //추천
    {
      path: "/recommend",
      name: "RecommendView",
      component: RecommendView,
      meta: { requiresAuth: true },
    },
  ]

  const router = createRouter({
    history: createWebHistory(),
    routes,
  });


  router.beforeEach((to, from, next) => {
    const userStore = useCommunityStore();
    if (to.matched.some((record) => record.meta.requiresAuth)) {
      if (userStore.isLogin) {
        next();
      } else {
        Swal({
          title: "로그인이 필요합니다",
          text: "이 페이지에 접근하려면 로그인이 필요합니다.",
          icon: "warning",
          confirmButtonText: "로그인 페이지로 이동",
        }).then(() => {
          next({ name: "LoginView" });
        });
      }
    } else {
      next();
    }
  });
  
  export default router;
