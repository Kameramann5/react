import React, { useState } from "react";
import PropTypes from "prop-types";
import "./ProgressBar.css";

function TodoProgressBar({
  todoslength,completedTodoProgressBar
}) {



  return (  
    <>
    <progress id="file" max={todoslength} value={completedTodoProgressBar}>{completedTodoProgressBar}% </progress>
   <br></br>
    </>
  );
}

export default TodoProgressBar;
