import React, { useState } from "react";
import PropTypes from "prop-types";
import { useInputValue } from "../hooks/useInputValue";

function AddTodo({ onCreate }) {
  const inputTitle = useInputValue("");
  const inputDescription = useInputValue("");

  function submitHandler(event) {
    event.preventDefault();
    if (inputTitle.value().trim() && inputDescription.value().trim()) {
      //из формы добавить новую задачу
      onCreate(inputTitle.value(), inputDescription.value());
      //очистить форму после добавления
      inputTitle.clear();
      inputDescription.clear();
      //  setValue('')
    }
  }

  return (
    <form style={{ marginBottom: "1rem" }} onSubmit={submitHandler}>
      <div className="input-group mb-3">
        <button
          className="btn btn-success"
          type="submit"
          id="button-addon1"
        >
          Добавить задачу
        </button>
        <input placeholder="Название" {...inputTitle.bind} className="form-control" />
 
        <input placeholder="Описание" {...inputDescription.bind} className="form-control" />
        
      </div>
    </form>
  );
}
AddTodo.propTypes = {
  onCreate: PropTypes.func.isRequired,
};
export default AddTodo;
