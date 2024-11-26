// 변경  DetailView
<template>
  <v-container v-if="store.articleDetail && userStore.userInfo">
    <v-card class="mx-auto px-4 pt-4" width="80%">
      <template v-slot:title class="mt-2">
        <v-container class="pt-2 pb-0 px-0 ms-0 my-0 ibm-plex-sans-kr-regular">
          <h3>{{ store.articleDetail.title }}</h3>
        </v-container>
      </template>
      <template v-slot:subtitle>
        <v-row justify="center ms-0">
          <v-col class="ps-0">
            <v-avatar :image="profileImg" size="50" class="mr-2"></v-avatar>
            <span class="font-weight-black ibm-plex-sans-kr-regular" style="font-size:20px; margin-left:10px;">{{ userNickname }}</span>
          </v-col>
          <v-col v-if="userStore.userInfo.username === store.articleDetail.user.username" cols="4" class="text-right">
            <v-btn class="update-btn" @click="goToEditPage">Update</v-btn>
            <v-btn class="delete-btn" @click="deleteArticle">Delete</v-btn>
          </v-col>
        </v-row>
      </template>
      <hr />
      <v-card-text class="main-content mx-4 pt-4 ibm-plex-sans-kr-regular" style="white-space: pre-line">
        {{ store.articleDetail.content }}
      </v-card-text>
      <v-container class="py-1 font-style ibm-plex-sans-kr-regular text-right position-relative">
        Created Date:
        <span class="font-style ibm-plex-sans-kr-regular" v-if="store.articleDetail.created_at">
          {{ store.articleDetail.created_at }}
        </span>
      </v-container>
      <v-container class="py-1 font-style ibm-plex-sans-kr-regular text-right position-relative">
        Updated Date:
        <span class="font-style ibm-plex-sans-kr-regular" v-if="store.articleDetail.updated_at">
          {{ store.articleDetail.updated_at }}
          <!-- {{ store.articleDetail.updated_at }} 시간 -->
        </span>
      </v-container>
      <hr />
    </v-card>
      <!-- <CommentsComponent v-if="store.articleDetail && userStore.userInfo" :Username="userStore.userInfo.username" :articleUser="store.articleDetail.user.username" /> -->
       <!-- 댓글 섹션 -->
<v-card class="mx-auto px-4 pt-4 mt-4" width="80%">
  <!-- <h5 class="mb-4">댓글</h5> -->
  <v-list>
    <v-list-item v-for="comment in store.comments" :key="comment.id" class="comment-item mb-3">
      <v-row align="center" class="w-100">
        <v-col cols="2" class="d-flex align-center">
          <v-avatar :image="getCommentProfileImg(comment)" size="50" class="mr-3"></v-avatar>
          <div>
          <v-list-item-title class="mb-1">{{ comment.user.nickname }}</v-list-item-title>
        </div>
      </v-col>

      <!-- 댓글 내용 -->
      <v-col cols="8">
        <v-list-item-content>
          <v-list-item-subtitle>{{ comment.content }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-col>

      <v-col cols="2" class="d-flex justify-end align-end" >
        <v-btn
        class="comment_delete_btn"
        v-if="userStore.userInfo.username === comment.user.username"
        @click="deleteComment(comment.id, store.articleDetail.id)"
        >X
        </v-btn>
      </v-col>
    </v-row>
    </v-list-item>
  </v-list>

  <!-- 댓글 작성 -->
  <v-divider class="my-4"></v-divider>
  <h5 class="mb-4">댓글 작성</h5>
<v-form @submit="submitComment" class="position-relative">
  <div style="position: relative;">
    <v-textarea
      v-model="newComment"
      outlined
      label="댓글을 입력하세요"
      rows="4"
      auto-grow
      class="comment-textarea"
    ></v-textarea>
    <v-btn
      color="#CEECF5"
      type="submit"
      class="comment-button"
      icon
    >
      <img src="@/assets/send.svg" alt="Send Icon" class="send-icon" />
    </v-btn>
  </div>
</v-form>
        </v-card>

    <div class="back-to-list">
      <button @click="goToArticleList" class="list-button">게시글 목록으로 돌아가기 ↩</button>
    </div>

  </v-container>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue'
import { useArticleStore } from '@/stores/article'
import { useRoute, useRouter } from 'vue-router'
import { useCommunityStore } from "@/stores/community";
const userStore = useCommunityStore();
const store = useArticleStore()
const route = useRoute()
const router = useRouter()

const newComment = ref(''); // 새 댓글 내용

const profileImg = computed(() => {
  return `http://localhost:8000${store.articleDetail.user.profile_img}`;
});

const commentImg = computed(() => {
  return `http://localhost:8000${store.comments.user.profile_img}`;
});

const userNickname = computed(() => store.articleDetail.user?.nickname || "");

// 단일 게시글 조회 및 댓글 가져오기
onMounted(async () => {
  await store.getArticleDetail(route.params.id); // 게시글 조회
  await store.getComments(route.params.id); // 댓글 조회
  await userStore.getProfile();
});


// 수정 페이지로 이동
const goToEditPage = () => {
  router.push({ name: 'UpdateView', params: { id: route.params.id } })
}

// 게시글 삭제
const deleteArticle = () => {
  if (confirm('정말로 이 게시글을 삭제하시겠습니까?')) {
    store.deleteArticle(route.params.id)
  }
}

// 게시글 목록 페이지로 이동
const goToArticleList = () => {
  router.push({ name: 'ArticleView' });
}

// 댓글 작성 함수
const submitComment = async () => {
  if (newComment.value.trim() === '') {
    alert('댓글을 입력하세요!');
    return;
  }
  const databox = {
    content: newComment.value,
    articleId: route.params.id
  };

  try {
    // 댓글 생성
    await store.createComment(databox);
    newComment.value = ''; // 댓글 입력란 초기화
    // 댓글 목록 갱신
    await store.getComments(route.params.id);
  } catch (err) {
    console.error('댓글 생성 실패:', err);
  }
};

// 댓글 삭제 함수
const deleteComment = async (commentId) => {
  if (confirm('정말로 이 댓글을 삭제하시겠습니까?')) {
    await store.deleteComment(commentId, route.params.id);
    await store.getComments(route.params.id); // 댓글 목록 갱신
  }
};

const getCommentProfileImg = (comment) => {
  return comment.user && comment.user.profile_img
    ? `http://localhost:8000${comment.user.profile_img}`
    : require('@/assets/default-avatar.png'); // 디폴트 이미지 설정
};

</script>

<style scoped>
.update-btn {
  background-color: rgba(0, 0, 0, 0); /* 완전히 투명 */
  box-shadow: none;
  border: 1px solid gray; /* 버튼 테두리 */
  color: rgba(255, 196, 0, 0.986); /* 버튼 텍스트 색상 */
  font-weight: bolder;
  font-size: 12px;
  cursor: pointer;
  margin-right:3px;
  text-shadow: 0.5px 0.5px 0.5px rgba(255, 166, 0, 0.986);
}
.delete-btn {
  background-color: rgba(0, 0, 0, 0); /* 완전히 투명 */
  box-shadow: none;
  border: 1px solid gray; /* 버튼 테두리 */
  color: rgba(230, 54, 54, 0.688); /* 버튼 텍스트 색상 */
  font-size: 12px;
  font-weight: bolder;
  cursor: pointer;
  margin-left:3px;
  text-shadow: 0.5px 0.5px 0.5px rgba(230, 54, 54, 0.688);
}
.back-to-list {
  margin-top: 20px; /* 위쪽 여백 추가 */
  text-align: center; /* 버튼 가운데 정렬 */
}

.list-button {
  background-color: rgba(0, 0, 0, 0); /* 완전히 투명 */
  border: 1px solid gray; /* 버튼 테두리 */
  padding: 10px 20px; /* 버튼 안쪽 여백 */
  font-size: 14px;
  cursor: pointer;
  border-radius: 5px;
  color: #333; /* 텍스트 색상 */
  font-weight: bold;
  transition: background-color 0.3s, color 0.3s; /* 호버 효과 */
}

.list-button:hover {
  background-color: #afbad1; /* 배경색 */
  color: #fff;
}

.comment_delete_btn {
  background-color: rgba(0, 0, 0, 0); /* 완전히 투명 */
  box-shadow: none;
  border: 1px solid gray; /* 버튼 테두리 */
  color: rgba(230, 54, 54, 0.688); /* 버튼 텍스트 색상 */
  font-size: 10px;
  font-weight: bolder;
  cursor: pointer;
  margin-left:3px;
  text-shadow: 0.5px 0.5px 0.5px rgba(230, 54, 54, 0.688);
  border-radius: 4px; /* 버튼 모서리 둥글게 */
  line-height: 1; /* 버튼 내부 줄 높이 */
  min-width: 10px; /* 최소 너비 설정 (필요에 따라 조정) */
  position: absolute; /* 위치 조정 */
  bottom: 0; /* 부모 요소의 하단에 정렬 */
  right: 0; /* 부모 요소의 오른쪽 끝에 정렬 */
}

hr {
  border: 5; /* 기본 테두리 제거 */
  height: 1px; /* 두께 설정 */
  background-color: #dedede; /* 배경색 (수평선의 색상) 설정 */
  width:99%; /* 너비 설정 */
  margin: 5px auto; /* 상하 여백 및 가운데 정렬 */
}
.font-style {
  font-size: small;
  color: gray;
}
.main-content {
  font-size: medium;
}
.comment-textarea {
  padding-bottom: 50px; /* 버튼과 겹치지 않도록 여백 추가 */
}

.comment-button {
  position: absolute;
  bottom: 100px;   /* 텍스트 영역 내부 하단과의 거리 조정 */
  right: 10px;    /* 텍스트 영역 내부 오른쪽과의 거리 조정 */
}
</style>