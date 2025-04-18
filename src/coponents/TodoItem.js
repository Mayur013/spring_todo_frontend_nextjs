export default function TodoItem({ todo, onToggle, onDelete }) {
    return (
      <div className="bg-white rounded-xl shadow-md p-4 flex items-center justify-between border-l-4 transition border-indigo-500 hover:shadow-lg">
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => onToggle(todo.id)}
            className="w-5 h-5 accent-indigo-600"
          />
          <span
            className={`text-lg ${
              todo.completed ? "line-through text-gray-400" : "text-gray-800"
            }`}
          >
            {todo.task}
          </span>
        </div>
        <button
          onClick={() => onDelete(todo.id)}
          className="text-red-500 hover:text-red-700 font-semibold"
        >
          ✕
        </button>
      </div>
    );
  }
  