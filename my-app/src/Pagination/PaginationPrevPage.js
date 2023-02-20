import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "./pagination.css";

function PaginationPrevPage({
 prevPage, currentPage,
}) { 
 

if (currentPage !==1) {
  return (
    
    <>
 <li className="page-item"><a className="page-link" href="#" onClick={prevPage}>&laquo;
       </a></li>
    
   

    </> 
  );   } else  return ( <li className="page-item disabled"><a className="page-link" >&laquo;
  </a></li>);
}

export default PaginationPrevPage;
