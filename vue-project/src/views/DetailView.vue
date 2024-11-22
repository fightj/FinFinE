<template>
  <div>
    <h1>게시글 상세</h1>
    <div class="article-detail" v-if="store.articleDetail">
      <p><strong>게시글 번호:</strong> {{ store.articleDetail.id }}</p>
      <p><strong>제목:</strong> {{ store.articleDetail.title }}</p>
      <p><strong>내용:</strong> {{ store.articleDetail.content }}</p>
      <p><strong>작성일:</strong> {{ store.articleDetail.created_at }}</p>
      <p><strong>수정일:</strong> {{ store.articleDetail.updated_at }}</p>
    </div>

    <!-- 수정/삭제 버튼 -->
    <div class="action-buttons">
      <button @click="goToEditPage" class="edit-button">수정하기 ↗</button>
      <button @click="deleteArticle" class="delete-button">삭제하기 ↗</button>
    </div>

    <!-- 목록으로 돌아가기 버튼 -->
    <div class="back-to-list">
      <button @click="goToArticleList" class="list-button">게시글 목록으로 돌아가기 ↩</button>
    </div>

    <!-- 댓글 섹션 -->
    <div class="comments-section">
      <h3>댓글</h3>
      <ul>
        <li v-for="comment in store.comments" :key="comment.id" class="comment-item">
          <p>{{ comment.content }}</p>
          <button @click="deleteComment(comment.id)">댓글 삭제</button>
        </li>
      </ul>
    </div>

    <!-- 댓글 작성 -->
    <form @submit.prevent="submitComment" class="comment-form">
      <textarea v-model="newComment" placeholder="댓글을 입력하세요"></textarea>
      <button type="submit">댓글 작성</button>
    </form>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useArticleStore } from '@/stores/article'
import { useRoute, useRouter } from 'vue-router'

const store = useArticleStore()
const route = useRoute()
const router = useRouter()

const newComment = ref(''); // 새 댓글 내용

// 단일 게시글 조회 및 댓글 가져오기
onMounted(async () => {
  await store.getArticleDetail(route.params.id); // 게시글 조회
  await store.getComments(route.params.id); // 댓글 조회
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

  await store.createComment(databox); // 댓글 생성
  newComment.value = ''; // 댓글 입력란 초기화
  await store.getComments(route.params.id); // 댓글 목록 갱신
}

// 댓글 삭제
const deleteComment = async (commentId) => {
  if (confirm('정말로 이 댓글을 삭제하시겠습니까?')) {
    await store.deleteComment(commentId, route.params.id);
    await store.getComments(route.params.id); // 댓글 목록 갱신
  }
};
</script>

<style scoped lang="scss">
@import "@/styles/colors.scss";

.detail-wrapper {
  background-color: map-get($colors, fifth);
  padding: 20px;
}

h1 {
  text-align: center;
  color: map-get($colors, first);
}

.article-detail {
  background-color: map-get($colors, third);
  padding: 15px;
  border-radius: 10px;
  margin: 10px 0;
}

.action-buttons {
  text-align: center;
  margin-top: 20px;

  .edit-button, .delete-button {
    padding: 10px 20px;
    margin: 5px;
    border-radius: 5px;
    cursor: pointer;
    transition: all 0.3s;
  }

  .edit-button {
    background-color: map-get($colors, third);
    color: map-get($colors, fifth);
  }

  .edit-button:hover {
    background-color: map-get($colors, second);
  }

  .delete-button {
    background-color: map-get($colors, first);
    color: map-get($colors, fifth);
  }

  .delete-button:hover {
    background-color: map-get($colors, forth);
  }
}

.back-to-list {
  text-align: center;
  margin-top: 20px;

  .list-button {
    padding: 10px 20px;
    background-color: map-get($colors, second);
    color: map-get($colors, fifth);
    border-radius: 5px;
    cursor: pointer;
    transition: all 0.3s;
  }

  .list-button:hover {
    background-color: map-get($colors, third);
  }
}

.comments-section {
  margin-top: 30px;

  h3 {
    color: map-get($colors, first);
  }

  .comment-item {
    background-color: map-get($colors, third);
    padding: 10px;
    margin: 10px 0;
    border-radius: 5px;
  }
}

.comment-form {
  margin-top: 20px;

  textarea {
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
  }

  button {
    padding: 10px 20px;
    background-color: map-get($colors, second);
    color: map-get($colors, fifth);
    border-radius: 5px;
    cursor: pointer;
  }
}
</style>
