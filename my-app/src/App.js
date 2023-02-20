import React, { useEffect } from "react";
import TodoList from "./Todo/TodoList";
import Context from "./context";
import "bootstrap/dist/css/bootstrap.min.css";
import { func } from "prop-types";
import Loader from "./loader";
import Modal from "./modal/modal";
import Search from "./Search/Search";
import useLocalStorage from "use-local-storage";
import Pagination from "./Pagination/Pagination";
/*динамический компонент */
const AddTodo = React.lazy(() => import("./Todo/AddTodo"));
function App() {
  // Достаем todos из LocalStorage
  const lsTodos = JSON.parse(localStorage.getItem("todos") || "[]");
  // Стейте todos
  const [todos, setTodos] = React.useState(lsTodos);
  //новый State для слежения за лоудингом
  //прелоадер
  const [loading, setLoading] = React.useState(false);
  // Активный фильтр
  const [activeFilter, setActiveFilter] = React.useState(null); // COMPLETED, UNCOMPLETED
  // темная тема
  const defaultDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const [theme, setTheme] = useLocalStorage(
    "theme",
    defaultDark ? "dark" : "light"
  );
  const switchTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
  };

  //пагинация
  const [currentPage, setCurrentPage] = React.useState(1);
  const [todosPerPage] = React.useState(3);
  const lastTodoIndex = currentPage * todosPerPage;
  const firstTodoIndex = lastTodoIndex - todosPerPage;
  const currentTodo = todos.slice(firstTodoIndex, lastTodoIndex);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const nextPage = () => setCurrentPage((prev) => prev + 1);
  const prevPage = () => setCurrentPage((prev) => prev - 1);


  //передать пять задач по ссылке
  // useEffect(() => {
  //   fetch("https://jsonplaceholder.typicode.com/todos?_limit=5")
  //     .then((response) => response.json())
  //     .then((todos) => {
  //       setTodos(todos);
  //       setLoading(false);
  //     });
  // }, []);

  function updateLsTodos(newTodos) {
    localStorage.setItem("todos", JSON.stringify(newTodos));
  }

  function toggleTodo(id) {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.completed = !todo.completed;
      }
      return todo;
    });

    // Добавление в LS
    updateLsTodos(newTodos);

    setTodos(newTodos);
  }








  function removeTodo(id) {
    const newTodos = todos.filter((todo) => todo.id !== id);

    // Добавление в LS
    updateLsTodos(newTodos);

    setTodos(newTodos);
  }

  function addTodo(title, title2) {
    const newTodo = {
      title,
      title2,
      id: Date.now(),
      completed: false,
    };
    const newTodos = todos.concat([newTodo]);

    // Добавление в LS
    updateLsTodos(newTodos);

    setTodos(newTodos);
  }

  function handleTodoEdit(value, value2, todo) {
    const editedTodo = { ...todo, title: value, title2: value2 };
    const newTodos = todos.map(t => t.id == todo.id ? editedTodo : t);

    // Добавление в LS
    updateLsTodos(newTodos);
    
    setTodos(newTodos);
  }

  const completedTodoProgressBar = todos.filter(todo => todo.completed).length




  return (
    <Context.Provider value={{ removeTodo: removeTodo }}>
      <div className="wrapper0" data-theme={theme}>
        <div className="wrapper">
          <div className="form-check form-switch">
            <input
              className="form-check-input"
              type="checkbox"
              id="flexSwitchCheckDefault0"
              onClick={() => switchTheme()}
              checked={theme === "dark"}
              onChange={() => ""}
            />
            <label
              className="form-check-label"
              htmlFor="flexSwitchCheckDefault0"
            >
              {theme === "light" ? " Темный режим" : " Светлый режим"}
            </label>
          </div>

          <Modal />

          <h1>react список задач</h1>
          <p>
            Что можно:<br></br>(добавлять название задачи, описание задачи,
            отметить их выполнение, удалять, открыть подробное описание,
            сортировать, искать, переключать страницы, редактирование задач, следить за полоской прогресса)
          </p>
          <React.Suspense fallback={<p>Загрузка формы добавления задач...</p>}>
            <AddTodo onCreate={addTodo} />
          </React.Suspense>

          {/*если лоадинг тру то показывать компонент лоадер*/}
          {loading && <Loader />}
          {todos.length ? (
            <React.Suspense fallback={<p>Загрузка задач...</p>}>
              {/* заменил todos={todos} (поиск по всем) на todos={currentTodo} для пагинации (поиск по страницам) */}
              
              <TodoList todos={currentTodo} onToggle={toggleTodo} onTodoEdit={handleTodoEdit} todoslength={todos.length} completedTodoProgressBar={completedTodoProgressBar}  />
              <Pagination
                currentPage={currentPage}
                prevPage={prevPage}
                nextPage={nextPage}
                paginate={paginate}
                todosPerPage={todosPerPage}
                totalTodos={todos.length}
              />
            </React.Suspense>
          ) : loading ? null : (
            <p>Текущих задач нет!</p>
          )}
        </div>
      </div>{" "}
    </Context.Provider>
  );
}

export default App;
