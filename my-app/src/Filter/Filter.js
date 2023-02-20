import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "./filter.css";

function TodoFilter({

  completed,
  todo,
  onFilterChange = () => {},

  activeFilter,
  value,
}) { 
 
  if (!value) {  
  return (

    <>
   
    
   
<div>    
      <div className="form-check form-switch">
        <input
          className="form-check-input"
          type="checkbox"
          id="flexSwitchCheckDefault"
          checked={activeFilter === "ALL"}
          onChange={() => onFilterChange("ALL")}
        />
        <label className="form-check-label" htmlFor="flexSwitchCheckDefault">
          Все{" "}
        </label>
      </div>
      <div className="form-check form-switch">
        <input
          className="form-check-input"
          type="checkbox"
          id="flexSwitchCheckChecked"
          checked={activeFilter === "UNCOMPLETED"}
          onChange={() => onFilterChange("UNCOMPLETED")}
        />
        <label className="form-check-label" htmlFor="flexSwitchCheckChecked">
        Открытые{" "}
        </label>
      </div>
      <div className="form-check form-switch">
        <input
          className="form-check-input"
          type="checkbox"
          id="flexSwitchCheckDisabled"
          checked={activeFilter === "COMPLETED"}
          onChange={() => onFilterChange("COMPLETED")}
        />
        <label className="form-check-label" htmlFor="flexSwitchCheckDisabled">
        Закрытые{" "}
        </label>
      </div>
      </div> 
    </> 
  );  } return (<div></div>);
}

export default TodoFilter;
