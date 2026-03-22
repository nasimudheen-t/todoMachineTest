import commonAPI from "./commonAPI";

// GET Todos (pagination)
export const getTodosAPI = (page = 1) => {
  return commonAPI("GET", `/todos?page=${page}`);
};

// CREATE Todo
export const addTodoAPI = (data) => {
  return commonAPI("POST", "/todos", data);
};

// UPDATE Todo
export const updateTodoAPI = (id, data) => {
  return commonAPI("PUT", `/todos/${id}`, data);
};

// DELETE Todo
export const deleteTodoAPI = (id) => {
  return commonAPI("DELETE", `/todos/${id}`);
};