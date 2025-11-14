import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const postId = event.context.params?.id;

  if (!postId) {
    throw createError({
      statusCode: 400,
      statusMessage: "Post ID is required",
    });
  }

  console.log(`[Server] Mengambil data untuk post ID: ${postId}`);

  const supabase = await serverSupabaseClient<Post>(event);

  // 3. Lakukan query untuk satu item
  // Ini sama dengan: SELECT * FROM posts WHERE id = 'postId' LIMIT 1
  const { data: post, error } = await supabase
    .from("posts")
    .select("*")
    .eq("id", postId) // .eq() artinya 'equals' (sama dengan)
    .single(); // .single() mengambil 1 objek, bukan array

  // 4. Tangani error (misal, post tidak ditemukan)
  if (error || !post) {
    console.error(`[Server] Error mengambil post ${postId}:`, error?.message);
    throw createError({
      statusCode: 404,
      statusMessage: `Post dengan ID ${postId} tidak ditemukan.`,
    });
  }

  // 5. Kembalikan data post tunggal
  return post;
});

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}
