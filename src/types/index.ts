// Интерфейс для данных поста
export interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

// Интерфейс для создания нового поста
export interface CreatePostRequest {
  title: string;
  body: string;
  userId: number;
}

// Интерфейс для ответа API при создании поста
export interface CreatePostResponse {
  id: number;
  title: string;
  body: string;
  userId: number;
}

// Интерфейс для состояния компонента
export interface ButtonState {
  loading: boolean;
  error: string | null;
  success: boolean;
}

// Интерфейс для пропсов кнопки
export interface ApiButtonProps {
  onSuccess?: (data: CreatePostResponse) => void;
  onError?: (error: string) => void;
  disabled?: boolean;
  className?: string;
} 