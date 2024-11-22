<template>
  <div class="article-view-wrapper d-flex flex-column my-3">
    <h1 class="mt-5 half-highlight">자유 게시판</h1>
    <v-container>
      <ArticleList />
    </v-container>
  </div>
</template>

<script setup>
import ArticleList from '@/components/ArticleList.vue'
import { onMounted } from 'vue'
import { useArticleStore } from '@/stores/article'
import { RouterLink } from 'vue-router'

const store = useArticleStore()

onMounted(() => {
  // mount 되기전에 store에 있는 전체 게시글 요청 함수를 호출
  store.getArticleList()
})
</script>

<style scoped lang="scss">
@import "@/styles/colors.scss"; /* $colors 변수 사용을 위한 파일 */

.article-wrapper {
  background-color: map-get($colors, third);
  padding: 20px;
  text-align: center;
}

h1 {
  color: map-get($colors, first);
}

.create-link {
  display: inline-block;
  margin: 20px 0;
  padding: 10px 20px;
  background-color: map-get($colors, forth);
  color: map-get($colors, fifth);
  border-radius: 5px;
  text-decoration: none;
  font-weight: bold;
  transition: all 0.3s;
}

.create-link:hover {
  background-color: map-get($colors, second);
  color: map-get($colors, first);
}
</style>