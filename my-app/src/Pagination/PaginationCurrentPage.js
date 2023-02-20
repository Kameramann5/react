import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "./pagination.css";

function PaginationCurrentPage({
 currentPage,pageNumbers,paginate,number,currentPage2
}) { 
 





  return (
    
    <>
 <li className={`page-item ${currentPage == number ? "active" : ""}`} key={number} >
        <a href="!#" className="page-link" onClick={() => paginate(number)}>{number}</a>
      </li>

    </> 
  );     
   
}

export default PaginationCurrentPage;
