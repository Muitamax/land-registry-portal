import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const landService = {
  search: async (searchNumber?: string, titleDeedNumber?: string) => {
    const params = new URLSearchParams();
    if (searchNumber) params.append('search_number', searchNumber);
    if (titleDeedNumber) params.append('title_deed_number', titleDeedNumber);
    
    const response = await api.get('/lands/search/', { params });
    return response.data;
  },

  getLand: async (id: number) => {
    const response = await api.get(`/lands/${id}/`);
    return response.data;
  },

  getOwnershipHistory: async (id: number) => {
    const response = await api.get(`/lands/${id}/ownership_history/`);
    return response.data;
  },

  listLands: async (page = 1) => {
    const response = await api.get('/lands/', { params: { page } });
    return response.data;
  },
};
