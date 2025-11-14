<script setup lang="ts">
// 'useSupabaseClient' adalah composable yang di-auto-import
// Ini aman digunakan di sisi klien (.vue)
const supabase = useSupabaseClient()
const router = useRouter()

const email = ref('')
const password = ref('')
const loading = ref(false)
const errorMsg = ref<string | null>(null)

async function handleLogin() {
  loading.value = true
  errorMsg.value = null
  try {
    // Panggil fungsi login bawaan Supabase
    const { error } = await supabase.auth.signInWithPassword({
      email: email.value,
      password: password.value,
    })
    if (error) throw error

    // Jika berhasil, arahkan ke halaman utama
    router.push('/')

  } catch (error: any) {
    errorMsg.value = error.message
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <UCard class="max-w-md mx-auto mt-10">
    <template #header>
      <h1 class="text-2xl font-bold">Login</h1>
    </template>

    <form class="space-y-4" @submit.prevent="handleLogin">
      <UFormGroup label="Email" name="email">
        <UInput v-model="email" type="email" placeholder="email@anda.com" />
      </UFormGroup>

      <UFormGroup label="Password" name="password">
        <UInput v-model="password" type="password" placeholder="Password" />
      </UFormGroup>

      <UAlert
        v-if="errorMsg"
        icon="i-heroicons-exclamation-triangle"
        color="error"
        variant="solid"
        title="Error Login"
        :description="errorMsg"
      />

      <UButton
        type="submit"
        :loading="loading"
        label="Login"
        block
      />
    </form>

    <template #footer>
      <NuxtLink to="/register" class="text-sm text-blue-500 hover:underline">
        Belum punya akun? Daftar di sini.
      </NuxtLink>
    </template>
  </UCard>
</template>