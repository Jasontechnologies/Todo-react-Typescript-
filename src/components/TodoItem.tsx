import React from 'react'
import type { Todo } from '../App'

interface TodoItemProps {
  todo: Todo
  onToggle: () => void
  onDelete: () => void
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggle, onDelete }) => {
  return (
    <li className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <label className="todo-label">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={onToggle}
        />
        <span className="todo-text">{todo.text}</span>
      </label>

      <button className="delete-btn" onClick={onDelete}>
        ×
      </button>
    </li>
  )
}

export default TodoItem
