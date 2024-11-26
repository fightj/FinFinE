<template>
  <v-container>
    <v-container class="text-center main-title pb-5">
      <h1>Update Post</h1>
    </v-container>
    <v-row>
      <v-col align="center">
        <v-card class="py-8" width="80%">
          <v-form @submit.prevent="submitUpdate" ref="form">
            <v-text-field width="90%" v-model="article.title" :counter="40" :rules="nameRules" label="Title" required></v-text-field>
            <v-textarea width="90%" v-model="article.content" label="Content" name="input-7-1" variant="filled" auto-grow required></v-textarea>
            <v-btn color="#81BEF7" size="large" variant="tonal" width="90%" type="submit">SAVE</v-btn>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useArticleStore } from '@/stores/article'
import { useRoute, useRouter } from 'vue-router'

const store = useArticleStore()
const route = useRoute()

// Local state for form inputs
const article = ref({
  title: '',
  content: ''
})

onMounted(async () => {
  await store.getArticleDetail(route.params.id)
  if (store.articleDetail) {
    article.value = {
      title: store.articleDetail.title,
      content: store.articleDetail.content,
    }
  }
})

// Handler for form submission
const submitUpdate = () => {
  store.updateArticle({
    ...article.value,
    articleId: route.params.id,
  }).then(() => {
    alert("수정이 완료되었습니다.")
    router.push({ name: 'DetailView', params: { id: route.params.id } })
  }).catch((error) => {
    console.error('업데이트 실패:', error.response.data)
    alert("수정 중 오류가 발생했습니다.")
  })
}
</script>

<style scoped lang="scss">
@import "@/styles/colors.scss";

.main-title {
  color: #9b7026;
}

.create-wrapper {
  background-color: map-get($colors, fifth);
  padding: 20px;
}

h1 {
  text-align: center;
  color:#274472;
  
}

.create-form {
  max-width: 600px;
  margin: 0 auto;

  div {
    margin-bottom: 15px;
  }

  label {
    display: block;
    margin-bottom: 5px;
    color: #81BEF7;
  }

  input, textarea {
    width: 100%;
    padding: 10px;
    border: 1px solid map-get($colors, third);
    border-radius: 5px;
  }

  button {
    padding: 10px 20px;
    background-color: map-get($colors, third);
    color: map-get($colors, fifth);
    border-radius: 5px;
    cursor: pointer;
  }

  button:hover {
    background-color: map-get($colors, second);
  }
}
</style>
