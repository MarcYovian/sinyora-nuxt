import { serverSupabaseClient } from '#supabase/server'

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

// defineEventHandler adalah fungsi pembungkus API dari Nuxt.
// Kode di sini HANYA berjalan di sisi server.
export default defineEventHandler(async (event) => {
  console.log('[Server] /api/posts dipanggil');

  const supabase = await serverSupabaseClient<Post[]>(event)

  const { data: posts, error } = await supabase
    .from('posts')
    .select('*')

  // 3. Tangani error
  if (error) {
    console.error('[Server] Error mengambil dari Supabase:', error.message);
    throw createError({
      statusCode: 500,
      statusMessage: error.message,
    })
  }

  // 4. Kembalikan data
  return posts
})