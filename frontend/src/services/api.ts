import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
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
  const response = await api.post('/subscribe', data);
  return response.data;
};

export const getSubscriptions = async (userName: string) => {
  const response = await api.get(`/subscriptions/${encodeURIComponent(userName)}`);
  return response.data;
};

export const getSixMonthSubscribers = async () => {
  const response = await api.get('/subscriptions/duration/6');
  return response.data;
};

export const updateSubscription = async (id: string, data: any) => {
  const response = await api.put(`/subscriptions/${id}`, data);
  return response.data;
};

export const deleteSubscription = async (id: string) => {
  const response = await api.delete(`/subscriptions/${id}`);
  return response.data;
};

export default api;
