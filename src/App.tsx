import { useState } from 'react'
import './App.css'

import ApiButton from './components/ApiButton'
import PostsList from './components/PostsList'
import type { CreatePostResponse } from './types'

function App() {
  const [lastCreatedPost, setLastCreatedPost] = useState<CreatePostResponse | null>(null)

  const handleApiSuccess = (data: CreatePostResponse) => {
    console.log('Пост успешно создан:', data)
    setLastCreatedPost(data)
  }

  const handleApiError = (error: string) => {
    console.error('Ошибка при создании поста:', error)
  }

  return (
    <div className="app">
      <div className="card">
        <h3>API Кнопка с Axios</h3>
        <div className="api-section">
          <ApiButton onSuccess={handleApiSuccess} onError={handleApiError} />
        </div>

        {lastCreatedPost && (
          <div className="post-preview">
            <h4>Последний созданный пост:</h4>
            <p><strong>ID:</strong> {lastCreatedPost.id}</p>
            <p><strong>Заголовок:</strong> {lastCreatedPost.title}</p>
            <p><strong>Содержимое:</strong> {lastCreatedPost.body}</p>
            <p><strong>User ID:</strong> {lastCreatedPost.userId}</p>
          </div>
        )}

        <div className="posts-list">
          <PostsList maxPosts={5} />
        </div>
      </div>

      <p className="read-the-docs">
        Нажмите на кнопку "Создать пост" для тестирования API запроса
      </p>
    </div>
  )
}

export default App



