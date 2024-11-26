<template>
  <div id="app">
    
    <!-- Navigation Bar -->
    <nav class="navbar navbar-expand-lg custom-navbar">
      <div class="container">
        <!-- Logo -->
        <RouterLink to="/" class="navbar-brand">
          <img src="@/assets/img/fin_fin.png" alt="Snail Icon" class="logo" />
          FinFin E
        </RouterLink>
        <!-- Navbar toggle -->
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <!-- Navigation links -->
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ms-auto">
            <li class="nav-item">
                  <RouterLink to="/" class="nav-link">Home</RouterLink>
                </li>
                <li class="nav-item">
                  <RouterLink to="/map" class="nav-link">은행찾기</RouterLink>
                </li>
                <li class="nav-item">
            
                  <RouterLink to="/exchange" class="nav-link">환율 계산</RouterLink>
                </li>
              
                <li class="nav-item">
                  <RouterLink :to= "{ name: 'ProductsPreView' }" class="nav-link">예금/적금</RouterLink>
                </li>

                <li class="nav-item">
                  <RouterLink to="/articles" class="nav-link">커뮤니티</RouterLink>
                </li>
                <li class="nav-item">
                  <RouterLink :to="{ name: 'RecommendView' }" class="nav-link">추천 상품</RouterLink>
                </li>
                
                <li class="nav-item">
                  <RouterLink :to="{ name: 'LoginView' }" v-if="!community_store.isLogin" class="nav-link">로그인</RouterLink>
                </li>
                <li class="nav-item">
                  <RouterLink :to="{ name: 'SignupView' }" v-if="!community_store.isLogin" class="nav-link">회원가입</RouterLink>
                </li>
                <li class="nav-item">
                  <v-btn 
                    v-if="community_store.isLogin" 
                    @click="logOut" 
                    variant="text" 
                    class="nav-link logout-btn"
                  >
                    로그아웃
                  </v-btn>
                </li>
                <li class="nav-item">
                  <RouterLink :to="{ name: 'UserProfileView' }" v-if="community_store.isLogin" class="nav-link">마이페이지</RouterLink>
                </li>
          </ul>
        </div>
      </div>
    </nav>

    <!-- Main content -->
    <RouterView />

    <!-- Scroll to Top Button
    <a class="scroll-to-top rounded" href="#page-top">
      <i class="fas fa-angle-up"></i>
    </a> -->

    <!-- 챗봇 -->
    <Transition name="bounce">
      <v-card v-show="expand" style="position: fixed; bottom: 130px; right: 50px; z-index: 1000" class="mx-auto bg-secondary expand-component" height="600" width="400">
        <ChatbotComponent />
      </v-card>
    </Transition>
    <v-avatar 
      @click="expand = !expand" 
      class="chatbot-btn" 
      size="115" 
      color="transparent"
    >
      <v-img :src="chatbot"></v-img>
    </v-avatar>


    <!-- Footer -->
    <footer class="footer custom-footer text-center">
      <div class="container px-4 px-lg-5">
        <ul class="list-inline mb-5">
          <li class="list-inline-item">
            <a class="social-link rounded-circle" href="#!" style="background-color: #87CEEB;">
              <i class="icon-social-facebook"></i>
            </a>
          </li>
          <li class="list-inline-item">
            <a class="social-link rounded-circle" href="#!" style="background-color: #87CEEB;">
              <i class="icon-social-twitter"></i>
            </a>
          </li>
          <li class="list-inline-item">
            <a class="social-link rounded-circle" href="#!" style="background-color: #87CEEB;">
              <i class="icon-social-github"></i>
            </a>
          </li>
        </ul>
        <p class="text-muted small mb-0">Copyright &copy; FinFin E 2023</p>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { RouterLink, RouterView, useRouter } from "vue-router";
import { useCommunityStore } from "@/stores/community";
// 챗봇 컴포넌트 import 
import ChatbotComponent from "@/components/Chatbot.vue"; 
import chatbot from "@/assets/chatbot3.png";
import { ref, computed } from "vue";


const community_store = useCommunityStore();
const router = useRouter();

// Logout function
const logOut = function () {
    community_store.logoutUser();
  }

const moveProducts = () => {
  router.push({ name: "ProductsPreView" });
};

const expand = ref(false);

</script>

<style scoped lang="scss">
/* App Layout */
@import "@/styles/colors.scss";
@import "@/styles/article.scss";
@import url("https://hangeul.pstatic.net/hangeul_static/css/nanum-square.css");


#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
  background-color: #FFFFF0;
}


body {
  background-color: #fdf6e3; /* 배경: 오트밀 */
  color: map-get($colors, text-primary); /* 기본 글자 색 */
  margin: 0;
  font-family: Arial, sans-serif;
  padding-bottom: 60px; /* 푸터 공간을 위해 패딩 추가 */
}


/* Custom Styles */

/* Navbar */
.navbar-nav .nav-item {
  display: flex;
  align-items: center; /* 자식 요소를 수직 중앙 정렬 */
}

.nav-item {
  font-family: 'NanumSquareBold';
}

.navbar-nav {
  margin-right: -200px;
}

.navbar {
  padding-left: 0; /* 전체적인 왼쪽 여백 제거 */
}
.custom-navbar {
  // background-color: map-get($colors, primary);
  background-color: #4682B4; // Steel Blue
  height: 80px; 
  padding-left: -10;
}

.navbar-brand {
  font-weight: bold;
  display: flex;
  align-items: center;
  color: #fff;
  margin-left: -10px; /* 필요 시 조정 */
  font-size:30px;
}

.navbar-brand .logo {
  width: 40px;
  height: 40px;
  margin-left: -200px;
}

.nav-link {
  color: #fff !important;
  font-weight: bold;
  font-size: 20px;
}

.nav-link:hover {
  // color: map-get($colors, accent) !important;
  color: #3e3e47 !important;
}

/* Footer */
.custom-footer {
  margin-top: 200px;
  background-color: #4682B4;
  color: #fff;
  // position: fixed;       /* 화면에 고정 */
  bottom: 0;             /* 화면 하단에 위치 */
  width: 100%;           /* 너비 전체 */
  // padding: 20px 0;
}

.social-link {
  background-color: #87CEEB;
  color: #fff;
  padding: 1px;
  display: inline-block;
  border-radius: 50%;
  transition: all 0.3s ease;
}

.social-link:hover {
  background-color: map-get($colors, $highlight);
}

.text-muted.small {
  font-size: 0.8rem; /* 텍스트 크기 약간 줄이기 */
  color: #d3d3d3 !important;
}

.logo {
  width: 60px;
  height: 60px;
  margin-right: 20px;

}
.expand-component {
  position: fixed;
  bottom: 20px; /* 원하는 위치로 조절하세요 */
  right: 20px; /* 원하는 위치로 조절하세요 */
  z-index: 1000; /* 다른 요소 위로 배치되도록 설정 */
}
.bounce-enter-active {
  animation: bounce-in 0.5s;
}
.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0.5);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}

.chatbot-btn {
  /* background-color: rgba(253, 248, 222, 0.658); */
  position: fixed;
  bottom: 50px;
  right: 100px;
  z-index: 1000;
  padding: 10px;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.chatbot-btn:hover {
  transform: translateY(-5px);
}

.chatbot-info {
  color: grey;
  font-size: 14px;
  position: fixed;
  bottom: 35px;
  right: 75px;
  z-index: 1000;
}

.chatbot-btn {
  border: none !important;   /* 테두리 제거 */
  box-shadow: none !important; /* 그림자 제거 (필요시) */
}

// 추가된 스타일
.logout-btn {
  font-weight: bold;
  text-transform: none;
  padding: 0;
  margin: 0; /* 기본 마진 제거 */
  min-width: auto; /* 기본 버튼 최소 너비 해제 */
  height: auto; /* 기본 높이 해제 */
  line-height: 1.5; /* 다른 nav-link와 일치 */
  font-size: 20px; /* 동일한 글자 크기 */
  color: #fff !important;
  background-color: transparent;
  border: none;
}

.logout-btn:hover {
  color: #3e3e47 !important; // 링크 호버 색상과 일치
  background-color: transparent; // 배경색이 생기지 않도록 설정
}




</style>