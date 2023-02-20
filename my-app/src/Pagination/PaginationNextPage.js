import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "./pagination.css";

function PaginationNextPage({
 nextPage, currentPage,pageNumbers
}) { 
 
  const lastPage =pageNumbers.length; 
if (currentPage !==lastPage) {
  return (
    
    <>
  <li className="page-item"><a className="page-link" href="#"  onClick={nextPage}>&raquo;</a></li>
    
   

    </> 
  );   } else  return (   <li  className="page-item disabled"><a className="page-link">&raquo;</a></li>
  );
}

export default PaginationNextPage;
