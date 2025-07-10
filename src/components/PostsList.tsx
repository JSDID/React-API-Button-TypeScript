import React, { useState, useEffect } from 'react';
import { apiService } from '../services/api';
import type { Post } from '../types';
import './PostsList.css';

interface PostsListProps {
  className?: string;
  maxPosts?: number;
}

interface PostsListState {
  posts: Post[];
  loading: boolean;
  error: string | null;
}

const PostsList: React.FC<PostsListProps> = ({ 
  className = '', 
  maxPosts = 5 
}) => {
  const [state, setState] = useState<PostsListState>({
    posts: [],
    loading: true,
    error: null,
  });

  useEffect(() => {
    const fetchPosts = async (): Promise<void> => {
      try {
        setState(prev => ({ ...prev, loading: true, error: null }));
        
        const posts = await apiService.getPosts();
        const limitedPosts = posts.slice(0, maxPosts);
        
        setState({
          posts: limitedPosts,
          loading: false,
          error: null,
        });
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Неизвестная ошибка';
        
        setState({
          posts: [],
          loading: false,
          error: errorMessage,
        });
      }
    };

    fetchPosts();
  }, [maxPosts]);

  const handleRefresh = async (): Promise<void> => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      
      const posts = await apiService.getPosts();
      const limitedPosts = posts.slice(0, maxPosts);
      
      setState({
        posts: limitedPosts,
        loading: false,
        error: null,
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Неизвестная ошибка';
      
      setState(prev => ({
        ...prev,
        loading: false,
        error: errorMessage,
      }));
    }
  };

  if (state.loading) {
    return (
      <div className={`posts-list ${className}`}>
        <div className="posts-list__loading">
          <div className="loading-spinner"></div>
          <p>Загрузка постов...</p>
        </div>
      </div>
    );
  }

  if (state.error) {
    return (
      <div className={`posts-list ${className}`}>
        <div className="posts-list__error">
          <p>Ошибка: {state.error}</p>
          <button onClick={handleRefresh} className="posts-list__refresh-btn">
            Попробовать снова
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`posts-list ${className}`}>
      <div className="posts-list__header">
        <h3>Список постов ({state.posts.length})</h3>
        <button onClick={handleRefresh} className="posts-list__refresh-btn">
          Обновить
        </button>
      </div>
      
      <div className="posts-list__content">
        {state.posts.length === 0 ? (
          <p className="posts-list__empty">Посты не найдены</p>
        ) : (
          <div className="posts-list__grid">
            {state.posts.map((post) => (
              <div key={post.id} className="post-card">
                <h4 className="post-card__title">{post.title}</h4>
                <p className="post-card__body">{post.body}</p>
                <div className="post-card__meta">
                  <span className="post-card__id">ID: {post.id}</span>
                  <span className="post-card__user">User: {post.userId}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PostsList; 