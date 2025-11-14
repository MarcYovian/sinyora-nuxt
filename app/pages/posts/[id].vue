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

const API_URL = `/api/posts/${postId}`;

// 3. Fetch data untuk satu post saja
const { data: post, pending, error } = await useFetch<Post>(API_URL);
</script>

<template>
  <div class="p-4 md:p-8 max-w-3xl mx-auto">
    <UButton 
      to="/posts" 
      label="Kembali ke Daftar Posts" 
      variant="link" 
      icon="i-heroicons-arrow-left" 
      class="mb-4"
    />
    <hr>

    <div v-if="pending" class="space-y-4">
      <USkeleton class="h-8 w-3/4" />
      <USkeleton class="h-4 w-full" />
      <USkeleton class="h-4 w-full" />
      <USkeleton class="h-4 w-2/3" />
    </div>

    <div v-else-if="error">
      <UAlert
        icon="i-heroicons-exclamation-triangle"
        color="error"
        variant="solid"
        title="Post Tidak Ditemukan"
        :description="error.message"
      />
    </div>

    <article v-else-if="post">
      <h1 class="text-3xl font-bold text-gray-800 mb-4">{{ post.title }}</h1>
      <p class="text-lg text-gray-700 whitespace-pre-line">{{ post.body }}</p>
    </article>
  </div>
</template>