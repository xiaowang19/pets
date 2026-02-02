import apiClient from './client';

export interface Post {
    id: string;
    author_id: string;
    title: string;
    content: string;
    image: string;
    category: string;
    likes_count: number;
    created_at: string;
    updated_at: string;
    author: {
        id: string;
        name: string;
        avatar: string;
    };
    isLiked?: boolean;
}

export interface ApiResponse<T> {
    success: boolean;
    data: T;
}

export const postsApi = {
    getPosts: async (params?: { category?: string; limit?: number; offset?: number }) => {
        const queryParams = new URLSearchParams();
        if (params?.category) queryParams.append('category', params.category);
        if (params?.limit) queryParams.append('limit', params.limit.toString());
        if (params?.offset) queryParams.append('offset', params.offset.toString());

        const response = await apiClient.get<ApiResponse<Post[]>>(
            `/posts?${queryParams.toString()}`
        );
        return response.data;
    },

    getPostById: async (id: string) => {
        const response = await apiClient.get<ApiResponse<Post>>(`/posts/${id}`);
        return response.data;
    },

    createPost: async (postData: {
        title: string;
        content?: string;
        image: string;
        category?: string;
    }) => {
        const response = await apiClient.post<ApiResponse<Post>>('/posts', postData);
        return response.data;
    },

    toggleLike: async (id: string) => {
        const response = await apiClient.post<ApiResponse<{ liked: boolean }>>(`/posts/${id}/like`, {});
        return response.data;
    },

    deletePost: async (id: string) => {
        const response = await apiClient.delete<ApiResponse<{ message: string }>>(`/posts/${id}`);
        return response.data;
    },
};
