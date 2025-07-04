import api from './api';

class BlogService {
  async getPosts(params: any = {}) {
    const searchParams = new URLSearchParams(params).toString();
    return api.get(`/posts?${searchParams}`);
  }

  async getPost(id: string) {
    return api.get(`/posts/${id}`);
  }

  async createPost(postData: any) {
    return api.post('/posts', postData);
  }

  async updatePost(id: string, postData: any) {
    return api.put(`/posts/${id}`, postData);
  }

  async deletePost(id: string) {
    return api.delete(`/posts/${id}`);
  }

  async getCategories() {
    return api.get('/categories');
  }

  async createCategory(categoryData: any) {
    return api.post('/categories', categoryData);
  }

  async createComment(postId: string, content: string) {
    return api.post(`/posts/${postId}/comments`, { content });
  }
}

export default new BlogService();