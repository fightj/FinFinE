<template>
  <v-container>
      <v-row>
        <v-col align="center">
          <h1 class="half-highlight">자유 게시판</h1>
        </v-col>
      </v-row>

    <v-card class="my-5 mx-auto" max-width="100%">
      <v-row justify="end">
        <v-col cols="auto">
          <v-btn @click="createArticle" type="submit" class="mt-5 me-10" color="#81BEF7" size="large" variant="tonal">New POST</v-btn>
        </v-col>
      </v-row>
      <v-list>
        <v-container class="pt-6 pb-0">
          <v-card class="border card-style mx-4">
            <v-row class="pb-0">
              <v-col cols="2">
                <p class="title-style ps-4">No.</p>
              </v-col>
              <v-col cols="4">
                <p class="title-style ps-4">Title</p>
              </v-col>
              <v-col cols="2" class="">
                <p class="nick-style" style="text-align: center;">Nickname</p>
              </v-col>
              <v-col cols="4">
                <p class="date-style">Date</p>
              </v-col>
            </v-row>
          </v-card>
        </v-container>


        <v-list-item class="py-0" v-for="(item, index) in paginatedItems" :key="index">
          <v-list-item-content>
            <v-layout>
              <v-container fluid class="py-0">
                <v-card @click="detailView(item.id)" class="py-5 border card-hover card-style" density="compact">
                  
                  <v-row>
                    <v-col cols="1">
                      <strong class="link-style ps-4">{{ item.id }}</strong>
                    </v-col>
                    <v-col cols="5">
                      <strong class="link-style ps-4">{{ item.title }}</strong>
                    </v-col>

                    <v-col cols="4" class="ps-16">
                      <v-row class="ms-16">
                        <v-col cols="1">
                          <v-avatar :image="`http://localhost:8000${item.user.profile_img}`" size="25" alt="User Profile Image"></v-avatar>
                        </v-col>
                        <v-col cols="10">
                          <p class="nick-color">{{ item.user.nickname }}</p>
                        </v-col>
                      </v-row>
                    </v-col>

                    <v-col cols="2">
                      <p class="date-color">{{ item.created_at }}</p>
                    </v-col>
                  </v-row>

                </v-card>
              </v-container>
            </v-layout>
          </v-list-item-content>
        </v-list-item>

      </v-list>
      <v-pagination class="" v-model="currentPage" :length="totalPages" @input="updatePagination"></v-pagination>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue";
import { useArticleStore } from "@/stores/article";
import { RouterLink, useRouter } from "vue-router";
// import { format } from "date-fns";
import { useCommunityStore } from "@/stores/community";
const userStore = useCommunityStore();
onMounted(() => {
  userStore.getProfile();
  console.log(userStore.userProfile.profile_img);
});
const profileImg = computed(() => {
  return `http://localhost:8000${userStore.userProfile.profile_img}`;
});
const router = useRouter();

const createArticle = function () {
  router.push({ name: "CreateView" });
};

// 날짜 변환 함수
// const formatDate = function (date) {
//   return format(new Date(date), "yyyy-MM-dd");
// };
const articleStore = useArticleStore();
onMounted(() => {
  articleStore.getArticleList();
});

watch(
  () => articleStore.articlesList,
  (newArticlesList) => {
    items.value = newArticlesList;
  }
);
const itemsPerPage = 5;
const items = ref([]);

const reversedItems = computed(() => {
  return [...items.value].reverse();
});
const currentPage = ref(1);

const totalPages = computed(() => {
  return Math.ceil(reversedItems.value.length / itemsPerPage);
});

const paginatedItems = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return reversedItems.value.slice(start, end);
});

const updatePagination = (page) => {
  currentPage.value = page;
};

const detailView = function (articleId) {
  router.push({ name: "DetailView", params: { id: articleId } });
};
</script>

<style lang="scss" scoped>
.card-style {
  border-top: none !important;
  border-left: none !important;
  border-right: none !important;
  box-shadow: none !important;
  border-bottom: 1px solid black;
  border-radius: 0px !important;
}
.half-highlight {
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0) 55%,
    lighten(#6681a5, 35%) 50%
  );
  width: fit-content;
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
}

.link-style {
  text-decoration: none;
  color: rgb(143, 143, 143);
  font-weight: 800; /* 잘못된 80s0 수정 */
  text-align: center;
  display: block; /* strong 태그를 블록 요소처럼 변경 */
}



.card-hover {
  transition: background-color 0s;
}

.card-hover:hover {
  background-color: #ffeed4; /* 원하는 배경색으로 변경 */
}

.nick-color {
  color: rgb(143, 143, 143);
}
.date-color {
  color: rgb(143, 143, 143);
  text-align: right;
  margin-right: 10px;
}

.title-style {
  margin-right: 120px;
  font-weight: 600; /* 더 굵게 강조 */
  color: #2a7bc8; /* SteelBlue 색상 */
  font-size: 32px; /* 더 큰 크기로 강조 */
  letter-spacing: 0.5px;
  // text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.2); /* 텍스트 강조를 위한 약간의 그림자 */
  text-align: center;
}

.nick-style {
  color: #2a7bc8; /* 더 선명한 블루 */
  font-weight: 600; /* 기본 글씨보다 약간 굵게 */
  font-size: 28px; /* 크기를 살짝 줄여 깔끔한 느낌 */
  letter-spacing: 0.5px; /* 글자 간격 추가로 가독성 개선 */
  text-align: center;
}
.date-style {
  color: #2a7bc8; /* 차분한 회색-블루 톤 */
  font-weight: 600; /* 중간 두께 */
  font-size: 28px; /* 작고 단정한 크기 */
  text-align: right;
  margin-right: 35px;
  font-style: italic; /* 날짜에 세련된 느낌 추가 */
}
</style>