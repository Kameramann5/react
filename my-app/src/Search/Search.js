import React, { useState } from "react";
import PropTypes from "prop-types";
import "./search.css";
import TodoItem from "../Todo/TodoItem";

function TodoSearch({
  filteredTodos,
  props,
  filter,
  todo,
  value,
  onFilterChange = () => {},
}) {
  const [isOpen, setIsOpen] = useState(true);
  const todoClickHandler = (e) => {
    onFilterChange(null, null, e.target.textContent);
    setIsOpen(!isOpen); //4 при клике на элемент списка скрыть остальные результаты поиска
  };
  const inputClickHandler = () => {
    setIsOpen(true); //2 поставили setIsOpen в true
  }; 
  return (  
    <>
      <form className="search_form">
        <div className="input-group mb-3">
          <input
            placeholder="Поиск..."
            className="form-control"
            value={value}
            onClick={inputClickHandler} //1 клик на инпут
            onChange={(event) => onFilterChange(null, event.target.value)}
          />
          <ul className="autocomplete">
            {value && isOpen //3 когда воодим текст, два условия совпадают и поле показываем
              ? filteredTodos.map((todo, index) => {
                  return (
                    <li
                      className="autocomplete_item"
                      onClick={todoClickHandler}
                    >
                      {todo.title}
                    </li>
                  );
                })
              : null}
          </ul>
        </div>
      </form>
    </>
  );
}

export default TodoSearch;
