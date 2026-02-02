import apiClient from './client';

export interface Message {
    id: string;
    sender_id: string;
    receiver_id: string;
    content: string;
    is_read: boolean;
    is_official: boolean;
    created_at: string;
    sender: {
        id: string;
        name: string;
        avatar: string;
    };
    receiver: {
        id: string;
        name: string;
        avatar: string;
    };
}

export interface Conversation {
    id: string;
    user_id: string;
    other_user_id: string;
    last_message: string;
    last_message_time: string;
    unread_count: number;
    other_user: {
        id: string;
        name: string;
        avatar: string;
    };
}

export interface ApiResponse<T> {
    success: boolean;
    data: T;
}

export const messagesApi = {
    getConversations: async () => {
        const response = await apiClient.get<ApiResponse<Conversation[]>>('/messages/conversations');
        return response.data;
    },

    getMessages: async (userId: string, params?: { limit?: number; offset?: number }) => {
        const queryParams = new URLSearchParams();
        if (params?.limit) queryParams.append('limit', params.limit.toString());
        if (params?.offset) queryParams.append('offset', params.offset.toString());

        const response = await apiClient.get<ApiResponse<Message[]>>(
            `/messages/${userId}?${queryParams.toString()}`
        );
        return response.data;
    },

    sendMessage: async (messageData: {
        receiver_id: string;
        content: string;
    }) => {
        const response = await apiClient.post<ApiResponse<Message>>('/messages', messageData);
        return response.data;
    },

    markAsRead: async (userId: string) => {
        const response = await apiClient.post<ApiResponse<{ message: string }>>(
            `/messages/mark-read/${userId}`,
            {}
        );
        return response.data;
    },
};
