<script setup lang="ts">
import { usePostStore } from '~/stores/post'
const postStore = usePostStore()
await postStore.fetch()

const { loading, error, posts } = storeToRefs(postStore)
</script>

<template>
  <div>
    <h1>Daftar Posts</h1>

    <div v-if="loading">
      Sedang memuat data...
    </div>

    <div v-else-if="error">
      <p>Maaf, terjadi kesalahan saat mengambil data:</p>
      <pre>{{ error }}</pre>
    </div>

    <ul v-else-if="posts">
      <li v-for="post in posts" :key="post.id" style="margin-bottom: 20px;">
        <h3>
          <NuxtLink :to="`/posts/${post.id}`">
            {{ post.title }}
          </NuxtLink>
        </h3>
        <p>{{ post.body }}</p>
      </li>
    </ul>
  </div>
</template>