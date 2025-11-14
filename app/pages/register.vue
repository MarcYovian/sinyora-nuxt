<script setup lang="ts">
const supabase = useSupabaseClient()
const router = useRouter()

const email = ref('')
const password = ref('')
const loading = ref(false)
const successMsg = ref<string | null>(null)
const errorMsg = ref<string | null>(null)

async function handleRegister() {
  loading.value = true
  errorMsg.value = null
  successMsg.value = null
  try {
    // Panggil fungsi register bawaan Supabase
    const { error } = await supabase.auth.signUp({
      email: email.value,
      password: password.value,
    })
    if (error) throw error

    successMsg.value = "Pendaftaran berhasil! Silakan cek email Anda untuk konfirmasi."

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
      <h1 class="text-2xl font-bold">Daftar Akun Baru</h1>
    </template>

    <form @submit.prevent="handleRegister" class="space-y-4">
      <UFormGroup label="Email" name="email">
        <UInput v-model="email" type="email" placeholder="email@anda.com" />
      </UFormGroup>

      <UFormGroup label="Password" name="password">
        <UInput v-model="password" type="password" placeholder="Buat password" />
      </UFormGroup>
      
      <UAlert
        v-if="successMsg"
        icon="i-heroicons-check-circle"
        color="success"
        variant="solid"
        title="Sukses!"
        :description="successMsg"
      />

      <UAlert
        v-if="errorMsg"
        icon="i-heroicons-exclamation-triangle"
        color="error"
        variant="solid"
        title="Error Daftar"
        :description="errorMsg"
      />

      <UButton
        type="submit"
        :loading="loading"
        label="Daftar"
        block
      />
    </form>
    
    <template #footer>
      <NuxtLink to="/login" class="text-sm text-blue-500 hover:underline">
        Sudah punya akun? Login di sini.
      </NuxtLink>
    </template>
  </UCard>
</template>