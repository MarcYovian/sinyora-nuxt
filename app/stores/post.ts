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
      try {
        const res = await fetch('https://jsonplaceholder.typicode.com/posts');
        const data: Post[] = await res.json();
        this.posts = data;
        
      } catch (error) {
        console.error('Error fetching posts:', error);
        this.error = 'Failed to fetch posts';
      } finally {
        this.loading = false;
      }
    },
  },
});