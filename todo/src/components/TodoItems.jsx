import React, { useState } from "react";
import { toast } from "react-toastify";
import { Pencil, Save, X, Trash2 } from "lucide-react";

const STATUS_STYLES = {
  Pending: "bg-gray-100/80 text-gray-500 border-gray-200",
  "In-Progress": "bg-amber-50/80 text-amber-500 border-amber-200",
  Completed: "bg-emerald-50/80 text-emerald-500 border-emerald-200",
};

const TodoItems = ({ title, description, status, deleteTodo, updateTodo, id }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(title);
  const [editDescription, setEditDescription] = useState(description);
  const [editStatus, setEditStatus] = useState(status);

  const handleSave = () => {
    if (!editTitle.trim()) {
      toast.warning("Title cannot be empty");
      return;
    }
    updateTodo(id, {
      title: editTitle.trim(),
      description: editDescription.trim(),
      status: editStatus,
    });
    setIsEditing(false);
  };

  const isComplete = status === "Completed";

  return (
    <div className="backdrop-blur-md bg-white/50 border border-white/70 rounded-2xl p-4 shadow-sm hover:bg-white/65 hover:shadow-md transition-all">

      {isEditing ? (
        <div className="flex flex-col gap-3">
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            autoFocus
            className="w-full bg-white/80 border border-white/90 rounded-xl px-3 py-2.5 text-gray-700 text-sm outline-none focus:ring-2 focus:ring-purple-300 focus:border-purple-300 shadow-sm"
          />
          <textarea
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
            rows={2}
            placeholder="Description (optional)"
            className="w-full bg-white/80 border border-white/90 rounded-xl px-3 py-2.5 text-gray-700 text-sm outline-none focus:ring-2 focus:ring-purple-300 focus:border-purple-300 shadow-sm resize-none"
          />
          <select
            value={editStatus}
            onChange={(e) => setEditStatus(e.target.value)}
            className="bg-white/80 border border-white/90 rounded-xl px-3 py-2.5 text-gray-600 text-sm outline-none focus:ring-2 focus:ring-purple-300 shadow-sm"
          >
            <option value="Pending">Pending</option>
            <option value="In-Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white text-sm font-semibold rounded-xl shadow-md transition-all"
            >
              <Save size={13} /> Save
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="flex items-center gap-2 px-4 py-2 bg-white/70 border border-white/80 hover:bg-white/90 text-gray-500 text-sm rounded-xl shadow-sm transition-all"
            >
              <X size={13} /> Cancel
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <p className={`font-bold text-sm leading-snug mb-1 ${isComplete ? "line-through text-gray-300" : "text-gray-700"}`}>
                {title}
              </p>
              {description && (
                <p className={`text-xs leading-relaxed ${isComplete ? "line-through text-gray-300" : "text-gray-400"}`}>
                  {description}
                </p>
              )}
            </div>

            <select
              value={status}
              onChange={(e) => updateTodo(id, { status: e.target.value })}
              className={`text-xs font-semibold px-3 py-1.5 rounded-full border outline-none cursor-pointer shrink-0 ${STATUS_STYLES[status] || STATUS_STYLES.Pending}`}
            >
              <option value="Pending">Pending</option>
              <option value="In-Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/60">
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 text-purple-500 hover:text-purple-600 hover:bg-purple-50/60 rounded-lg text-xs font-semibold transition-all"
            >
              <Pencil size={12} /> Edit
            </button>
            <button
              onClick={() => { if (window.confirm("Delete this task?")) deleteTodo(id); }}
              className="flex items-center gap-1.5 px-3 py-1.5 text-red-400 hover:text-red-500 hover:bg-red-50/60 rounded-lg text-xs font-semibold transition-all"
            >
              <Trash2 size={12} /> Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default TodoItems;