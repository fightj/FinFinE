<template>
  <v-container>
    <v-container class="text-center main-title pb-5">
      <h1>New Post</h1>
    </v-container>
    <v-row>
      <v-col align="center">
        <v-card class="py-8" width="80%">
          <v-form @submit.prevent="handleCreateArticle" ref="form">
            <v-text-field width="90%" v-model="title" :counter="40" :rules="nameRules" label="Title" required></v-text-field>
            <v-textarea width="90%" label="Content" v-model="content" name="input-7-1" variant="filled" auto-grow required></v-textarea>
            <v-btn color="yellow-darken-3" size="large" variant="tonal" width="90%" type="submit">SAVE</v-btn>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
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

.main-title {
  color: #9b7026;
}
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