import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000',
    headers: {
        'Content-Type': 'application/json',
    },
});

export const createSubscription = async (data: {
    userName: string;
    planName: string;
    monthlyPrice: number;
    duration: number;
}) => {
    const response = await api.post('/api/subscribe', data);
    return response.data;
};

export const getSubscriptions = async (userName: string) => {
    const response = await api.get(`/api/subscriptions/${encodeURIComponent(userName)}`);
    return response.data;
};

export const getSixMonthSubscribers = async () => {
    const response = await api.get('/api/subscriptions/duration/6');
    return response.data;
};

export const updateSubscription = async (id: string, data: any) => {
    const response = await api.put(`/api/subscriptions/${id}`, data);
    return response.data;
};

export const deleteSubscription = async (id: string) => {
    const response = await api.delete(`/api/subscriptions/${id}`);
    return response.data;
};

export default api;
