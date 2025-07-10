import React, { useState } from 'react';
import { apiService } from '../services/api';
import type { ApiButtonProps, CreatePostResponse, ButtonState } from '../types';
import './ApiButton.css';

const ApiButton: React.FC<ApiButtonProps> = ({
  onSuccess,
  onError,
  disabled = false,
  className = '',
}) => {
  const [state, setState] = useState<ButtonState>({
    loading: false,
    error: null,
    success: false,
  });

  const handleClick = async (): Promise<void> => {
    if (disabled || state.loading) return;

    setState({
      loading: true,
      error: null,
      success: false,
    });

    try {
      // Данные для создания нового поста
      const postData = {
        title: 'Новый пост',
        body: 'Содержимое нового поста',
        userId: 1,
      };

      const response: CreatePostResponse = await apiService.createPost(postData);
      
      setState({
        loading: false,
        error: null,
        success: true,
      });

      onSuccess?.(response);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Неизвестная ошибка';
      
      setState({
        loading: false,
        error: errorMessage,
        success: false,
      });

      onError?.(errorMessage);
    }
  };

  const getButtonText = (): string => {
    if (state.loading) return 'Загрузка...';
    if (state.success) return 'Успешно!';
    return 'Создать пост';
  };

  const getButtonClass = (): string => {
    const baseClass = 'api-button';
    const classes = [baseClass, className];
    
    if (state.loading) classes.push(`${baseClass}--loading`);
    if (state.success) classes.push(`${baseClass}--success`);
    if (state.error) classes.push(`${baseClass}--error`);
    if (disabled) classes.push(`${baseClass}--disabled`);
    
    return classes.join(' ');
  };

  return (
    <div className="api-button-container">
      <button
        className={getButtonClass()}
        onClick={handleClick}
        disabled={disabled || state.loading}
        type="button"
      >
        {getButtonText()}
      </button>
      
      {state.error && (
        <div className="api-button__error">
          Ошибка: {state.error}
        </div>
      )}
      
      {state.success && (
        <div className="api-button__success">
          Пост успешно создан!
        </div>
      )}
    </div>
  );
};

export default ApiButton; 