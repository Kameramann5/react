import React, { useContext } from "react";
import PropTypes from "prop-types";
import Context from "../context";
import Modalitem from "../modalitem/modalitem";
const styles = {
  li: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: ".5rem 1rem",
    border: "1px solid #ccc",
    borderRadius: "4px",
    marginBottom: ".5rem",
  },
  input: { marginRight: "1rem" },
  ul: { paddingbottom: "100px" },
};
function TodoItem({ todo, index, onChange,filteredTodos, onEdit = () => {} }) {
  
  const { removeTodo } = useContext(Context);
  const classes = [];
  const classes_p = [];

  if (todo.completed) {
    classes.push("Todoli done");
  } else {    classes.push("Todoli");}
  if (todo.completed) {
    classes_p.push("done_p");
  } 

  return (
    <li style={styles.li}  className={classes.join(" ")}>
      <Modalitem onEdit={onEdit} filteredTodos={filteredTodos} todo={todo} />
      <span >
      <strong>{index + 1}</strong>  <input
          type="checkbox"
          checked={todo.completed}
          style={styles.input}
          onChange={() => onChange(todo.id)}
        />
      
        <p className={classes_p.join(" ")}>
        {todo.title} </p>
      </span>
      <button className="rm" onClick={removeTodo.bind(null, todo.id)}>
        &times;
      </button>
    </li>
  );
}
TodoItem.propTypes = {
  todo: PropTypes.object.isRequired,
  index: PropTypes.number,
  onChange: PropTypes.func.isRequired,
};
export default TodoItem;
