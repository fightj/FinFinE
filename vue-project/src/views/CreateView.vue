<template>
  <div class="create-wrapper">
    <h1>게시글 작성</h1>
    <form @submit.prevent="handleCreateArticle" class="create-form">
      <div>
        <label for="title">제목</label>
        <input type="text" id="title" v-model="title" required />
      </div>
      <div>
        <label for="content">내용</label>
        <textarea id="content" v-model="content" required></textarea>
      </div>
      <button type="submit">제출</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useArticleStore } from '@/stores/article'
import { useRouter } from 'vue-router'

// Create a store instance
const store = useArticleStore()
const router = useRouter()

// Local state for form inputs
const title = ref('')
const content = ref('')

// Handler for form submission
const handleCreateArticle = () => {
  const databox = { title: title.value, content: content.value }

  store.createArticle(databox)

  // reset
  title.value = ''
  content.value = ''
}
</script>

<style scoped lang="scss">
@import "@/styles/colors.scss";

.create-wrapper {
  background-color: map-get($colors, fifth);
  padding: 20px;
}

h1 {
  text-align: center;
  color: map-get($colors, first);
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
    color: map-get($colors, first);
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