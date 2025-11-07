<script setup lang="ts">

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

// Kita ambil 10 posts pertama saja dari API eksternal
const API_URL = 'https://jsonplaceholder.typicode.com/posts?_limit=10';

// 'await' akan "menunggu" data ini selesai di server
const { data: posts, pending, error } = await useFetch<Post[]>(API_URL);
</script>

<template>
  <div>
    <h1>Daftar Posts</h1>

    <div v-if="pending">
      Sedang memuat data...
    </div>

    <div v-else-if="error">
      <p>Maaf, terjadi kesalahan saat mengambil data:</p>
      <pre>{{ error.message }}</pre>
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