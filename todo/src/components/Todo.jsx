import React, { useEffect, useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import todo_icon from "../assets/images/todo_icon.png";
import TodoItems from "./TodoItems";
import {
  getTodosAPI,
  addTodoAPI,
  updateTodoAPI,
  deleteTodoAPI,
} from "../service/api";

const Todo = () => {
  const [todoList, setTodoList] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [adding, setAdding] = useState(false);

  const inputRef = useRef();
  const descRef = useRef();

  const fetchTodos = async (pageNum = 1) => {
    setLoading(true);
    try {
      const res = await getTodosAPI(pageNum);
      setTodoList(res.todos);
      setTotalPages(res.pages);
      setPage(res.page);
      console.log("res",res)
    } catch (err) {
      toast.error("Failed to fetch todos");
    } finally {
      setLoading(false);
    }
  };

  const add = async () => {
    const title = inputRef.current.value.trim();
    const description = descRef.current.value.trim();
    if (!title) {
      toast.warning("Please enter a title");
      return;
    }
    setAdding(true);
    try {
      await addTodoAPI({ title, description });
      toast.success("Task added!");
      inputRef.current.value = "";
      descRef.current.value = "";
      fetchTodos(page);
    } catch (err) {
      toast.error("Failed to add task");
    } finally {
      setAdding(false);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await deleteTodoAPI(id);
      toast.success("Task deleted");
      fetchTodos(page);
    } catch (err) {
      toast.error("Failed to delete task");
    }
  };

  const updateTodo = async (id, updatedData) => {
    try {
      await updateTodoAPI(id, updatedData);
      toast.success("Task updated");
      fetchTodos(page);
    } catch (err) {
      toast.error("Failed to update task");
    }
  };

  const completedCount = todoList.filter((t) => t.status === "Completed").length;
  const progress = todoList.length ? Math.round((completedCount / todoList.length) * 100) : 0;

  useEffect(() => {
    fetchTodos(page);
  }, []);

  return (
    <>
      <ToastContainer position="top-right" autoClose={2500} hideProgressBar newestOnTop closeOnClick theme="light" />

      <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-50 to-pink-100 flex items-start justify-center py-12 px-4 relative overflow-hidden">

        {/* Background blobs */}
        <div className="absolute top-[-80px] left-[-80px] w-72 h-72 bg-purple-300 rounded-full opacity-30 blur-3xl pointer-events-none" />
        <div className="absolute bottom-[-60px] right-[-60px] w-80 h-80 bg-blue-300 rounded-full opacity-30 blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 left-1/3 w-60 h-60 bg-pink-200 rounded-full opacity-20 blur-2xl pointer-events-none" />

        <div className="w-full max-w-xl relative z-10">

          {/* Main Card */}
          <div className="backdrop-blur-xl bg-white/40 border border-white/60 rounded-3xl shadow-2xl shadow-purple-200/40 p-8">

            {/* Header */}
            <div className="flex items-center gap-4 mb-8">
              <div className="w-13 h-13 bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl p-3 shadow-lg shadow-purple-300/50">
                <img src={todo_icon} alt="Tasks" className="w-7 h-7 brightness-0 invert" />
              </div>
              <div>
                <h1 className="text-2xl font-extrabold text-gray-800 tracking-tight leading-tight">My Tasks</h1>
                <p className="text-sm text-gray-400 font-medium">Stay focused. Get it done.</p>
              </div>
            </div>

            {/* Progress */}
            <div className="backdrop-blur-md bg-white/50 border border-white/70 rounded-2xl p-4 mb-6 shadow-inner">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-widest">Completion</span>
                <span className="text-sm font-bold text-purple-600">{completedCount} / {todoList.length} done</span>
              </div>
              <div className="h-2 bg-white/60 rounded-full overflow-hidden border border-white/80">
                <div
                  className="h-full bg-gradient-to-r from-purple-400 to-blue-400 rounded-full transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              {[
                { label: "Total", value: todoList.length, color: "text-gray-700" },
                { label: "In Progress", value: todoList.filter((t) => t.status === "In-Progress").length, color: "text-amber-500" },
                { label: "Completed", value: completedCount, color: "text-emerald-500" },
              ].map(({ label, value, color }) => (
                <div key={label} className="backdrop-blur-md bg-white/50 border border-white/70 rounded-2xl p-3 text-center shadow-sm">
                  <p className={`text-2xl font-extrabold ${color}`}>{value}</p>
                  <p className="text-xs text-gray-400 font-medium mt-0.5">{label}</p>
                </div>
              ))}
            </div>

            {/* Input Section */}
            <div className="backdrop-blur-md bg-white/50 border border-white/70 rounded-2xl p-5 mb-6 shadow-inner flex flex-col gap-3">
              <input
                ref={inputRef}
                type="text"
                placeholder="What needs to be done?"
                onKeyDown={(e) => e.key === "Enter" && add()}
                className="w-full bg-white/70 border border-white/80 rounded-xl px-4 py-3 text-gray-700 placeholder-gray-300 text-sm outline-none focus:ring-2 focus:ring-purple-300 focus:border-purple-300 shadow-sm"
              />
              <input
                ref={descRef}
                type="text"
                placeholder="Add a description (optional)"
                className="w-full bg-white/70 border border-white/80 rounded-xl px-4 py-3 text-gray-700 placeholder-gray-300 text-sm outline-none focus:ring-2 focus:ring-purple-300 focus:border-purple-300 shadow-sm"
              />
              <button
                onClick={add}
                disabled={adding}
                className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold py-3 rounded-xl text-sm shadow-lg shadow-purple-200 transition-all"
              >
                {adding ? "Adding..." : "+ Add Task"}
              </button>
            </div>

            {/* Divider */}
            <div className="flex items-center gap-3 mb-5">
              <div className="flex-1 h-px bg-white/60" />
              <span className="text-xs text-gray-400 font-semibold uppercase tracking-widest">Tasks</span>
              <div className="flex-1 h-px bg-white/60" />
            </div>

            {/* Task List */}
            <div className="flex flex-col gap-3 max-h-[420px] overflow-y-auto pr-1">
              {loading ? (
                <div className="flex flex-col items-center justify-center py-16 gap-4">
                  <div className="w-9 h-9 border-2 border-purple-200 border-t-purple-500 rounded-full animate-spin" />
                  <p className="text-gray-400 text-sm">Loading tasks...</p>
                </div>
              ) : todoList.length === 0 ? (
                <div className="text-center py-16">
                  <div className="text-5xl mb-4">📋</div>
                  <p className="text-gray-500 font-semibold text-base">No tasks yet</p>
                  <p className="text-gray-400 text-sm mt-1">Add your first task above!</p>
                </div>
              ) : (
                todoList.map((item) => (
                  <TodoItems
                    key={item._id}
                    id={item._id}
                    title={item.title}
                    description={item.description}
                    status={item.status}
                    deleteTodo={deleteTodo}
                    updateTodo={updateTodo}
                  />
                ))
              )}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-6 pt-5 border-t border-white/50">
                <button
                  disabled={page === 1}
                  onClick={() => fetchTodos(page - 1)}
                  className="px-4 py-2 rounded-xl bg-white/60 border border-white/70 text-gray-500 text-sm font-semibold hover:bg-white/80 disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-sm"
                >
                  ← Prev
                </button>

                {[...Array(Math.min(5, totalPages))].map((_, idx) => {
                  let pageNum;
                  if (totalPages <= 5) pageNum = idx + 1;
                  else if (page <= 3) pageNum = idx + 1;
                  else if (page >= totalPages - 2) pageNum = totalPages - 4 + idx;
                  else pageNum = page - 2 + idx;

                  return (
                    <button
                      key={idx}
                      onClick={() => fetchTodos(pageNum)}
                      className={`w-9 h-9 rounded-xl text-sm font-bold transition-all shadow-sm ${
                        page === pageNum
                          ? "bg-gradient-to-br from-purple-500 to-blue-500 text-white shadow-purple-200"
                          : "bg-white/60 border border-white/70 text-gray-500 hover:bg-white/80"
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}

                <button
                  disabled={page === totalPages}
                  onClick={() => fetchTodos(page + 1)}
                  className="px-4 py-2 rounded-xl bg-white/60 border border-white/70 text-gray-500 text-sm font-semibold hover:bg-white/80 disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-sm"
                >
                  Next →
                </button>
              </div>
            )}

          </div>
        </div>
      </div>
    </>
  );
};

export default Todo;