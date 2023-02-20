import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import TodoItem from "./TodoItem";
import TodoFilter from "../Filter/Filter";
import TodoSearch from "../Search/Search";
import TodoProgressBar from "../ProgressBar/ProgressBar";

const styles = {
  ul: {
    listStyle: "none",
    margin: "10px 0 0 0",
    padding: 0,
  },
};

function TodoList(props) {
  const [activeFilter, setActiveFilter] = useState("ALL");
  const [filteredTodos, setFilteredTodos] = useState(props.todos);
  const [searchValue, setSearchValue] = useState("");

  //убрать фильтр после ввода фразы поиска

  //конец убрать фильтр после ввода фразы поиска
  //поиск

  // const filteredTodos = props.todos.filter(todo => {
  //   return todo.title.toLowerCase().includes(value.toLocaleLowerCase())
  // })

  useEffect(() => {
    handleFilterChange(activeFilter);
  }, [props.todos]);




  const handleFilterChange = (filter, value, clickedTip) => {
    if (clickedTip) {
      setFilteredTodos(props.todos.filter((todo) => todo.title === clickedTip));

      setActiveFilter("ALL");
      setSearchValue(clickedTip);
      return;
    }

    if (filter) setActiveFilter(filter);
    if (filter === "ALL") setFilteredTodos(props.todos);
    if (filter === "COMPLETED")
      setFilteredTodos(props.todos.filter((todo) => todo.completed === true));
    if (filter === "UNCOMPLETED")
      setFilteredTodos(props.todos.filter((todo) => todo.completed === false));

    // Если есть value и не передан filter
    if (!filter) {
      if (value) {
        setActiveFilter("ALL");
        setFilteredTodos(
          props.todos.filter((todo) => {
            return todo.title.toLowerCase().includes(value.toLowerCase());
          })
        );
      } else {
        //показать все дела
        setFilteredTodos(props.todos);
      }
    }

    if (typeof value === "string") setSearchValue(value);
  };


  return (
    <>
      <TodoSearch
        value={searchValue}
        filteredTodos={filteredTodos}
        onFilterChange={handleFilterChange}
      />
<TodoProgressBar  todoslength={props.todoslength}  completedTodoProgressBar={props.completedTodoProgressBar}  />

      <TodoFilter
        value={searchValue}
        activeFilter={activeFilter}
        onFilterChange={handleFilterChange}
      />
      <ul style={styles.ul}>
        {filteredTodos.length ? (
          filteredTodos.map((todo, index) => {
            return (
              <TodoItem
                filteredTodos={filteredTodos}
                todo={todo}
                key={todo.id}
                index={index}
                onChange={props.onToggle}
                onEdit={(value, value2) => props.onTodoEdit(value, value2, todo)}
              />
            );
          })
        ) : (
          <p>Нет найденных задач</p>
        )}
      </ul>{" "}
    </>
  );
}
TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object).isRequired,
  onToggle: PropTypes.func.isRequired,
};
export default TodoList;
