import axios from 'axios';
import type { AxiosResponse } from 'axios';
import type { Post, CreatePostRequest, CreatePostResponse } from '../types';

// Создаем экземпляр axios с базовой конфигурацией
const api = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Интерфейс для API сервиса
export interface ApiService {
  getPosts(): Promise<Post[]>;
  createPost(data: CreatePostRequest): Promise<CreatePostResponse>;
}

// Реализация API сервиса
export class ApiServiceImpl implements ApiService {
  async getPosts(): Promise<Post[]> {
    try {
      const response: AxiosResponse<Post[]> = await api.get('/posts');
      return response.data;
    } catch (error) {
      throw new Error('Ошибка при получении постов');
    }
  }

  async createPost(data: CreatePostRequest): Promise<CreatePostResponse> {
    try {
      const response: AxiosResponse<CreatePostResponse> = await api.post('/posts', data);
      return response.data;
    } catch (error) {
      throw new Error('Ошибка при создании поста');
    }
  }
}

// Экспортируем экземпляр сервиса
export const apiService = new ApiServiceImpl(); 