<script setup lang="ts">

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

// Kita perlu 'useRoute' untuk mendapatkan parameter dari URL
const route = useRoute();

// 1. Dapatkan 'id' dari parameter URL
const postId = route.params.id;

// 2. Buat URL API untuk post tunggal
const API_URL = `https://jsonplaceholder.typicode.com/posts/${postId}`;

// 3. Fetch data untuk satu post saja
const { data: post, pending, error } = await useFetch<Post>(API_URL);
</script>

<template>
  <div>
    <NuxtLink to="/posts">Kembali ke Daftar Posts</NuxtLink>
    <hr>

    <div v-if="pending">
      Memuat post...
    </div>

    <div v-else-if="error">
      Maaf, post tidak ditemukan atau terjadi error.
    </div>

    <article v-else-if="post">
      <h1>{{ post.title }}</h1>
      <p>{{ post.body }}</p>
    </article>
  </div>
</template>