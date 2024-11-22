<template>
  <div>
    <h1>게시글 수정</h1>
    <div v-if="store.articleDetail">
      <form @submit.prevent="submitUpdate">
        <div>
          <label for="title">제목</label>
          <input type="text" id="title" v-model="article.title" />
        </div>
        <div>
          <label for="content">내용</label>
          <textarea id="content" v-model="article.content"></textarea>
        </div>
        <button type="submit">수정하기</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useArticleStore } from '@/stores/article';
import { useRoute } from 'vue-router';

const store = useArticleStore();
const route = useRoute();

// 수정할 게시글 데이터를 담을 변수
const article = ref({
  title: '',
  content: '',
});

// 컴포넌트 마운트 시 기존 게시글 데이터를 가져와 초기화
onMounted(async () => {
  await store.getArticleDetail(route.params.id); // 데이터를 가져올 때까지 기다림
  if (store.articleDetail) {
    article.value = {
      title: store.articleDetail.title,
      content: store.articleDetail.content,
    };
  }
});

// 수정 버튼 클릭 시 호출
const submitUpdate = () => {
  console.log('Article ID:', route.params.id);
  console.log('Updated data:', article.value);
  store.updateArticle({
    ...article.value,
    articleId: route.params.id,
  });
};
</script>

<style scoped>
/* 필요한 스타일 추가 */
</style>
