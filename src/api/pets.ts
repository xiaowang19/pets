import apiClient from './client';

export interface Pet {
    id: string;
    owner_id: string;
    name: string;
    breed: string;
    age: string;
    gender: string;
    distance: string;
    time_label: string;
    image: string;
    description: string;
    tags: string[];
    health_status: string[];
    size: string;
    energy: string;
    friendliness: string;
    shedding: string;
    category: string;
    status: string;
    created_at: string;
    updated_at: string;
    owner: {
        id: string;
        name: string;
        avatar: string;
        role: string;
        response_rate: string;
    };
}

export interface ApiResponse<T> {
    success: boolean;
    data: T;
}

export const petsApi = {
    getPets: async (params?: { category?: string; status?: string; limit?: number; offset?: number }) => {
        const queryParams = new URLSearchParams();
        if (params?.category) queryParams.append('category', params.category);
        if (params?.status) queryParams.append('status', params.status);
        if (params?.limit) queryParams.append('limit', params.limit.toString());
        if (params?.offset) queryParams.append('offset', params.offset.toString());

        const response = await apiClient.get<ApiResponse<Pet[]>>(
            `/pets?${queryParams.toString()}`
        );
        return response.data;
    },

    getPetById: async (id: string) => {
        const response = await apiClient.get<ApiResponse<Pet>>(`/pets/${id}`);
        return response.data;
    },

    createPet: async (petData: Partial<Pet>) => {
        const response = await apiClient.post<ApiResponse<Pet>>('/pets', petData);
        return response.data;
    },

    updatePet: async (id: string, petData: Partial<Pet>) => {
        const response = await apiClient.put<ApiResponse<Pet>>(`/pets/${id}`, petData);
        return response.data;
    },

    deletePet: async (id: string) => {
        const response = await apiClient.delete<ApiResponse<{ message: string }>>(`/pets/${id}`);
        return response.data;
    },
};
