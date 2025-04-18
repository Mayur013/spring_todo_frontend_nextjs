"use client";

import { useEffect, useState } from "react";
import TodoItem from "../coponents/TodoItem";

type Todo = {
  id: number;
  task: string;
  completed: boolean;
};

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [task, setTask] = useState<string>("");

  const API_BASE_URL = "https://spring-todo-server.onrender.com";

  const fetchTodos = async () => {
    const res = await fetch(`${API_BASE_URL}/api/todos`);
    const data = await res.json();
    setTodos(data);
  };

  const addTodo = async () => {
    if (!task.trim()) return;
    await fetch(`${API_BASE_URL}/api/todos`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ task, completed: false }),
    });
    setTask("");
    fetchTodos();
  };

  const toggleTodo = async (id: number) => {
    const todo = todos.find((t) => t.id === id);
    if (!todo) return;
    await fetch(`${API_BASE_URL}/api/todos/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...todo, completed: !todo.completed }),
    });
    fetchTodos();
  };

  const deleteTodo = async (id: number) => {
    await fetch(`${API_BASE_URL}/api/todos/${id}`, {
      method: "DELETE",
    });
    fetchTodos();
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-white p-6">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <h1 className="text-3xl font-extrabold text-gray-800 text-center mb-4">
            ✨ To-Do List
          </h1>
          <div className="flex gap-2">
            <input
              type="text"
              value={task}
              onChange={(e) => setTask(e.target.value)}
              placeholder="Add a new task..."
              className="flex-1 p-3 text-black rounded-xl border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
            />
            <button
              onClick={addTodo}
              className="px-5 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition"
            >
              Add
            </button>
          </div>
        </div>

        <div className="space-y-4">
          {todos.length === 0 ? (
            <p className="text-center text-gray-600">No tasks yet!</p>
          ) : (
            todos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggle={toggleTodo}
                onDelete={deleteTodo}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
