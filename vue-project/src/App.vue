<template>
    <div>
      <body id="page-top">
        <!-- Navigation Bar (Bootstrap) -->
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
          <div class="container">
            <a class="navbar-brand" href="#page-top">FinFin E</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
              <ul class="navbar-nav ms-auto">
                <li class="nav-item">
                  <RouterLink to="/" class="nav-link">Home</RouterLink>
                </li>
                <li class="nav-item">
                  <RouterLink to="/map" class="nav-link">은행찾기</RouterLink>
                </li>
                <li class="nav-item">
            
                  <RouterLink to="/exchange" class="nav-link">환율 계산</RouterLink> |
                </li>
              
                <li class="nav-item">
                  <a class="nav-link" style="cursor: pointer;" @click="moveProducts">예금/적금</a>
                </li>

                <li class="nav-item">
                  <RouterLink to="/articles" class="nav-link">커뮤니티</RouterLink>
                  <!-- <RouterLink :to="{ name: 'ArticleView' }">자유 게시판</RouterLink> -->

                </li>
                <li class="nav-item">
                  <RouterLink :to="{ name: 'login' }" v-if="!community_store.isLogin" class="nav-link">로그인</RouterLink>
                </li>
                <li class="nav-item">
                  <RouterLink :to="{ name: 'signup' }" v-if="!community_store.isLogin" class="nav-link">회원가입</RouterLink>
                </li>
                <li class="nav-item">
                  <v-btn v-if="community_store.isLogin" @click="logOut" class="nav-link">로그아웃</v-btn>
                </li>
                <li class="nav-item">
                  <RouterLink :to="{
                      name: 'profile',
                      params: { search_username: community_store.search_username },
                      }" v-if="community_store.isLogin" class="nav-link">마이페이지</RouterLink>
                </li>
              </ul>
            </div>
          </div>
        </nav>
  
        
    
        <RouterView />
      </body>
  
      <!-- Scroll to Top Button-->
      <a class="scroll-to-top rounded" href="#page-top"><i class="fas fa-angle-up"></i></a>
  
      <!-- Footer -->
      <footer class="footer text-center">
        <div class="container px-4 px-lg-5">
          <ul class="list-inline mb-5">
            <li class="list-inline-item">
              <a class="social-link rounded-circle text-white mr-3" href="#!"><i class="icon-social-facebook"></i></a>
            </li>
            <li class="list-inline-item">
              <a class="social-link rounded-circle text-white mr-3" href="#!"><i class="icon-social-twitter"></i></a>
            </li>
            <li class="list-inline-item">
              <a class="social-link rounded-circle text-white" href="#!"><i class="icon-social-github"></i></a>
            </li>
          </ul>
          <p class="text-muted small mb-0">Copyright &copy; Your Website 2023</p>
        </div>
      </footer>
    </div>
  </template>
  
  <script setup>
  import { RouterLink, RouterView, useRouter, useRoute,} from 'vue-router';
  import { useCommunityStore } from "@/stores/community";
  
  const community_store = useCommunityStore();
  const router = useRouter();
  // Logout function
  const logOut = function () {
    community_store.logOut();
  }

  const moveProducts = () => {
  router.push({ name: "ProductsPreView" });
  };

  </script>
  
  <style scoped>
  /* Style the footer to be fixed at the bottom */
  .footer {
    position: fixed;
    bottom: 0;
    left: 0;
    margin-top: 150px;
    width: 100%;
    background-color: #333;
    color: white;
    padding: 10px 0;
    z-index: 9999;
  }
  
  /* Ensure the content is not hidden behind the footer */
  body {
    margin-bottom: 60px; /* Adjust this value if needed */
  }
  
  /* Optional: Adjust navbar z-index to ensure it's on top */
  .navbar {
    position: relative;
    z-index: 9998; /* Ensures navbar is above other elements */
  }
  
  /* For mobile responsiveness */
  @media (max-width: 768px) {
    .navbar-toggler {
      display: block;
    }
  }
  </style>
  