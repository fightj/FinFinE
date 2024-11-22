<template>
  <div>
    <h3>전체 글 보기</h3>
    <ArticleListItem 
      v-for="article in store.articlesList"
      :key="article.id"
      :article="article"
    />
  </div>
</template>

<script setup>
import ArticleListItem from '@/components/ArticleListItem.vue'
import { useArticleStore } from '@/stores/article'

const store = useArticleStore()
</script>

