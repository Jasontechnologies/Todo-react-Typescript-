import React, { useState, useEffect } from 'react'
import TodoItem from './components/TodoItem'

// define the shape of a Todo item
export interface Todo {
  id: string
  text: string
  completed: boolean
}

const App: React.FC = () => {
  const [text, setText] = useState<string>('') // user input

  // ✅ Load todos from localStorage once (on initial render)
  const [todos, setTodos] = useState<Todo[]>(() => {
    const saved = localStorage.getItem('todos')
    return saved ? JSON.parse(saved) : []
  })

  // ✅ Save todos to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

  // generate a unique id
  const makeId = (): string =>
    Date.now().toString(36) + Math.random().toString(36).substring(2)

  // handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const trimmed = text.trim()
    if (!trimmed) return

    const newTodo: Todo = {
      id: makeId(),
      text: trimmed,
      completed: false,
    }

    setTodos(prev => [newTodo, ...prev])
    setText('')
  }

  // toggle completion
  const toggleComplete = (id: string) => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    )
  }

  // delete todo
  const deleteTodo = (id: string) => {
    setTodos(prev => prev.filter(todo => todo.id !== id))
  }

  // clear all todos
  const clearAll = () => setTodos([])

  return (
    <div className="app">
      <h1>Todo List (TypeScript)</h1>

      <form onSubmit={handleSubmit} className="todo-form">
        <input
          type="text"
          value={text}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setText(e.target.value)
          }
          placeholder="Add a new task"
        />
        <button type="submit">Add</button>
      </form>

      {todos.length === 0 ? (
        <p className="empty">No todos yet — add one above.</p>
      ) : (
        <>
          <ul className="todo-list">
            {todos.map(todo => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggle={() => toggleComplete(todo.id)}
                onDelete={() => deleteTodo(todo.id)}
              />
            ))}
          </ul>

          <div className="footer">
            <span>{todos.filter(t => !t.completed).length} items left</span>
            <div className="footer-actions">
              <button onClick={clearAll}>Clear All</button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default App
