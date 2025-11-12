<template>
    <div class="p-8 max-w-lg mx-auto mt-10">
        <h1 class="text-3xl font-bold text-gray-800 mb-4">
          Ini Halaman Utama (Homepage)
        </h1>

        <UButton>Test Button from Nuxt UI</UButton>
        
        <NuxtLink to="/about" class="text-blue-500 hover:text-blue-700">
          Pergi ke halaman About
        </NuxtLink>
    </div>
</template>