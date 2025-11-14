interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export const usePostStore = defineStore('post', {
  state: () => ({
    posts: [] as Post[],
    loading: false,
    error: null as string | null
  }),
  actions: {
    async fetch() {
      this.loading = true;
      this.error = null;
      try {
        const data = await $fetch<Post[]>('/api/posts');
        this.posts = data;
        
      } catch (error: any) {
        console.error('Error fetching posts:', error);
        this.error = error.data?.message || 'Failed to fetch posts';
      } finally {
        this.loading = false;
      }
    },
  },
});