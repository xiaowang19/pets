import apiClient from './client';

export interface User {
    id: string;
    email: string;
    name: string;
    avatar: string;
    role: string;
    location: string;
    response_rate: string;
    created_at: string;
    updated_at: string;
}

export interface AuthResponse {
    user: {
        id: string;
        email: string;
        created_at: string;
    };
    profile: User;
}

export interface ApiResponse<T> {
    success: boolean;
    data: T;
}

export const authApi = {
    register: async (userData: {
        email: string;
        password: string;
        name: string;
        avatar?: string;
        location?: string;
    }) => {
        const response = await apiClient.post<ApiResponse<AuthResponse>>('/auth/register', userData);
        return response.data;
    },

    login: async (credentials: { email: string; password: string }) => {
        const response = await apiClient.post<ApiResponse<AuthResponse>>('/auth/login', credentials);
        return response.data;
    },

    getProfile: async () => {
        const response = await apiClient.get<ApiResponse<User>>('/auth/profile');
        return response.data;
    },

    updateProfile: async (profileData: {
        name?: string;
        avatar?: string;
        location?: string;
    }) => {
        const response = await apiClient.put<ApiResponse<User>>('/auth/profile', profileData);
        return response.data;
    },

    logout: async () => {
        const response = await apiClient.post<ApiResponse<{ message: string }>>('/auth/logout', {});
        return response.data;
    },
};
