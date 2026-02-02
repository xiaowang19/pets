import apiClient from './client';

export interface AdoptionApplication {
    id: string;
    pet_id: string;
    applicant_id: string;
    pet_name: string;
    pet_breed: string;
    pet_age: string;
    pet_gender: string;
    pet_image: string;
    status: string;
    current_step: number;
    total_steps: number;
    progress_label: string;
    applicant_name: string;
    phone: string;
    housing_type: string;
    has_window_protection: boolean;
    created_at: string;
    updated_at: string;
    history: ApplicationHistory[];
}

export interface ApplicationHistory {
    id: string;
    application_id: string;
    title: string;
    time: string;
    description: string;
    completed: boolean;
    is_ongoing: boolean;
}

export interface ApiResponse<T> {
    success: boolean;
    data: T;
}

export const applicationsApi = {
    getApplications: async (params?: { status?: string; limit?: number; offset?: number }) => {
        const queryParams = new URLSearchParams();
        if (params?.status) queryParams.append('status', params.status);
        if (params?.limit) queryParams.append('limit', params.limit.toString());
        if (params?.offset) queryParams.append('offset', params.offset.toString());

        const response = await apiClient.get<ApiResponse<AdoptionApplication[]>>(
            `/applications?${queryParams.toString()}`
        );
        return response.data;
    },

    getApplicationById: async (id: string) => {
        const response = await apiClient.get<ApiResponse<AdoptionApplication>>(`/applications/${id}`);
        return response.data;
    },

    createApplication: async (applicationData: {
        pet_id: string;
        applicant_name: string;
        phone: string;
        housing_type: string;
        has_window_protection: boolean;
    }) => {
        const response = await apiClient.post<ApiResponse<AdoptionApplication>>(
            '/applications',
            applicationData
        );
        return response.data;
    },

    updateApplicationStatus: async (id: string, statusData: {
        status: string;
        current_step: number;
        progress_label: string;
    }) => {
        const response = await apiClient.put<ApiResponse<AdoptionApplication>>(
            `/applications/${id}/status`,
            statusData
        );
        return response.data;
    },

    deleteApplication: async (id: string) => {
        const response = await apiClient.delete<ApiResponse<{ message: string }>>(`/applications/${id}`);
        return response.data;
    },
};
